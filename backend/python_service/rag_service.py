"""
RAG Service Wrapper - CPU Optimized
"""

import sys
import os
import time
import torch
from typing import Dict, List
import json

# Add your training scripts to Python path
SCRIPTS_PATH = r"E:\Digital Legal Advisor AI\DLA-Scripts-Model-Training\DLA-Scripts-Model-Training\Models\Training scripts\dla_env"
sys.path.insert(0, SCRIPTS_PATH)

# Import your RAG components
try:
    from rag_pipeline import LegalRAG
    HAS_IMPROVED_RAG = False
except ImportError:
    try:
        from rag_pipeline_improved import ImprovedLegalRAG as LegalRAG
        HAS_IMPROVED_RAG = True
    except ImportError:
        raise ImportError("Could not import RAG pipeline from training scripts")

# Optional:  Hallucination detector (can be slow on CPU)
try:
    from hallucination_detector import HallucinationDetector
    HAS_HALLUCINATION_DETECTOR = True
except ImportError: 
    HAS_HALLUCINATION_DETECTOR = False
    print("⚠️  Hallucination detector not available")


class LegalRAGService: 
    def __init__(
        self,
        model_path: str,
        vector_store_dir: str,
        use_gpu: bool = False,
        use_hybrid_retrieval: bool = True
    ):
        """
        Initialize the Legal RAG service
        """
        print("🔄 Initializing Legal RAG Service (CPU mode)...")
        
        self.use_gpu = use_gpu
        self.model_path = model_path
        self.vector_store_dir = vector_store_dir
        
        # Verify paths exist
        if not os.path. exists(model_path):
            raise FileNotFoundError(f"Model path not found: {model_path}")
        
        if not os.path.exists(vector_store_dir):
            raise FileNotFoundError(f"Vector store not found: {vector_store_dir}")
        
        # Check for required files
        required_files = ['legal_docs.index', 'chunks_metadata.json']
        for file in required_files:
            file_path = os.path.join(vector_store_dir, file)
            if not os.path.exists(file_path):
                raise FileNotFoundError(f"Required file not found: {file_path}")
        
        print(f"   Model:  {model_path}")
        print(f"   Vector Store: {vector_store_dir}")
        print(f"   GPU: {'Enabled' if use_gpu else 'Disabled (CPU mode)'}")
        
        # Initialize RAG Pipeline
        if HAS_IMPROVED_RAG and use_hybrid_retrieval:
            print("   Using:  ImprovedLegalRAG with Hybrid Retrieval")
            self.rag = LegalRAG(
                vector_store_dir=vector_store_dir,
                model_path=model_path,
                use_gpu=use_gpu,
                use_hybrid_retrieval=True,
                hybrid_alpha=0.6
            )
        else:
            print("   Using: Standard LegalRAG")
            self.rag = LegalRAG(
                vector_store_dir=vector_store_dir,
                model_path=model_path,
                use_gpu=use_gpu
            )
        
        # Initialize Hallucination Detector (optional)
        self.hallucination_detector = None
        if HAS_HALLUCINATION_DETECTOR:
            try:
                print("   Loading hallucination detector...")
                self.hallucination_detector = HallucinationDetector(use_gpu=use_gpu)
                print("   ✅ Hallucination detector loaded")
            except Exception as e: 
                print(f"   ⚠️  Could not load hallucination detector: {e}")
        
        print("✅ Legal RAG Service initialized!")
    
    def answer_query(
        self,
        query: str,
        top_k: int = 5,
        detect_hallucinations: bool = False
    ) -> Dict:
        """
        Answer a legal query
        """
        start_time = time.time()
        
        # Get RAG answer
        result = self.rag.answer_query(query, top_k=top_k, verbose=False)
        
        # Format citations
        citations = []
        for i, citation_str in enumerate(result. get('citations', [])):
            # Parse citation string
            # Format: "[1] Act Title, Section X:  Section Title"
            parts = citation_str.split(',', 1)
            if len(parts) >= 2:
                title = parts[0].replace(f'[{i+1}]', '').strip()
                section_info = parts[1].strip()
                
                # Extract section number and title
                section_num = "N/A"
                section_title = ""
                if ': ' in section_info:
                    section_part, section_title = section_info.split(':', 1)
                    section_num = section_part.replace('Section', '').strip()
                    section_title = section_title. strip()
                else:
                    section_num = section_info.replace('Section', '').strip()
                
                citations.append({
                    'title': title,
                    'section_number': section_num,
                    'section_title': section_title,
                    'relevance': max(0.5, 0.9 - (i * 0.1))  # Decreasing relevance
                })
        
        # Detect hallucinations if requested and available
        hallucination_report = None
        if detect_hallucinations and self.hallucination_detector:
            try:
                # Get retrieved chunks for context
                chunks = self.rag.retrieve(query, top_k=top_k)
                
                # Detect hallucinations
                hallucination_results = self.hallucination_detector.detect_hallucinations(
                    result['answer'],
                    chunks,
                    threshold=0.5
                )
                
                hallucination_report = self.hallucination_detector.get_hallucination_report(
                    hallucination_results
                )
            except Exception as e:
                print(f"⚠️  Hallucination detection failed: {e}")
        
        processing_time = time.time() - start_time
        
        return {
            'query': query,
            'answer': result['answer'],
            'citations': citations,
            'confidence': result. get('confidence', 0.0),
            'hallucination_report': hallucination_report,
            'processing_time': processing_time,
            'model_info': {
                'name': 'Mistral-7B-Instruct-v0.2 (Fine-tuned)',
                'device': 'CPU',
                'retrieval':  'Hybrid' if HAS_IMPROVED_RAG else 'Vector Only'
            }
        }
    
    def is_gpu_available(self) -> bool:
        """Check if GPU is available"""
        return self.use_gpu and torch.cuda.is_available()
    
    def get_document_count(self) -> int:
        """Get total number of documents in vector store"""
        try:
            metadata_file = os.path.join(self.vector_store_dir, 'chunks_metadata.json')
            with open(metadata_file, 'r', encoding='utf-8') as f:
                chunks = json.load(f)
            return len(chunks)
        except: 
            return 0
    
    def get_stats(self) -> Dict:
        """Get service statistics"""
        return {
            'device': 'CPU',
            'gpu_available': False,
            'total_documents':  self.get_document_count(),
            'model_type': 'Mistral-7B-Instruct-v0.2 (Fine-tuned)',
            'retrieval_method': 'Hybrid (Vector + BM25)' if HAS_IMPROVED_RAG else 'Vector Only',
            'hallucination_detection': 'Available' if self.hallucination_detector else 'Disabled',
            'model_path': self.model_path,
            'vector_store':  self.vector_store_dir
        }