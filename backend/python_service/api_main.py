"""
FastAPI Service for Legal RAG Pipeline - CPU Optimized
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import logging
import os
from dotenv import load_dotenv

from rag_service import LegalRAGService

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(
    level=os.getenv('LOG_LEVEL', 'INFO'),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI
app = FastAPI(
    title="Digital Legal Advisor - RAG API",
    description="Legal Question Answering using Fine-tuned LLM (CPU)",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5000",  # Node.js backend
        "http://localhost:3000",  # React frontend (Vite default)
        "http://localhost:5173",  # React frontend (alternative Vite port)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global RAG service
rag_service = None

@app.on_event("startup")
async def startup_event():
    """Load model on server start"""
    global rag_service
    
    logger.info("="*70)
    logger.info("🚀 Starting Digital Legal Advisor - Python RAG Service")
    logger.info("="*70)
    
    model_path = os.getenv('MODEL_PATH')
    vector_store_path = os.getenv('VECTOR_STORE_PATH')
    
    if not model_path or not os.path.exists(model_path):
        logger.error(f"❌ Model path not found: {model_path}")
        raise RuntimeError("Model path not configured or doesn't exist")
    
    if not vector_store_path or not os.path.exists(vector_store_path):
        logger.error(f"❌ Vector store path not found: {vector_store_path}")
        raise RuntimeError("Vector store path not configured or doesn't exist")
    
    logger.info(f"📁 Model path: {model_path}")
    logger.info(f"📁 Vector store:  {vector_store_path}")
    logger.info(f"💻 Running on: CPU (GPU disabled)")
    
    try:
        rag_service = LegalRAGService(
            model_path=model_path,
            vector_store_dir=vector_store_path,
            use_gpu=False,  # CPU only
            use_hybrid_retrieval=os.getenv('USE_HYBRID_RETRIEVAL', 'true').lower() == 'true'
        )
        logger.info("✅ RAG system loaded successfully!")
        logger.info("="*70)
    except Exception as e:
        logger.error(f"❌ Failed to load RAG system: {e}")
        import traceback
        traceback.print_exc()
        raise


# Request/Response Models
class QueryRequest(BaseModel):
    query: str
    user_id: Optional[str] = None
    conversation_id: Optional[str] = None
    top_k: int = 5
    detect_hallucinations: bool = False  # Disabled for CPU performance

class Citation(BaseModel):
    title: str
    section_number: str
    section_title: str
    relevance: float

class QueryResponse(BaseModel):
    query: str
    answer: str
    citations: List[Citation]
    confidence: float
    hallucination_report: Optional[dict] = None
    processing_time: float
    model_info: dict


# API Endpoints
@app.get("/")
async def root():
    """Health check"""
    return {
        "status": "online",
        "service": "Digital Legal Advisor - RAG API",
        "version":  "1.0.0",
        "model_loaded": rag_service is not None,
        "device": "CPU"
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    if rag_service is None: 
        raise HTTPException(status_code=503, detail="RAG service not initialized")
    
    stats = rag_service.get_stats()
    
    return {
        "status":  "healthy",
        "model":  "Mistral-7B-Instruct (Fine-tuned)",
        "device": "CPU",
        "vector_store":  "FAISS + Hybrid Retrieval",
        "total_documents": stats.get('total_documents', 0),
        "retrieval_method": stats.get('retrieval_method', 'Hybrid')
    }

@app.post("/api/query", response_model=QueryResponse)
async def query_legal_rag(request: QueryRequest):
    """
    Main endpoint:  Answer legal questions using RAG
    """
    if rag_service is None:
        raise HTTPException(status_code=503, detail="RAG service not initialized")
    
    if not request.query or len(request.query. strip()) < 5:
        raise HTTPException(status_code=400, detail="Query too short (min 5 characters)")
    
    try:
        logger.info(f"📥 Query:  {request.query[: 100]}...")
        
        # Get answer from RAG
        result = rag_service.answer_query(
            query=request.query,
            top_k=request.top_k,
            detect_hallucinations=request.detect_hallucinations
        )
        
        logger.info(f"✅ Response generated in {result['processing_time']:.2f}s (confidence: {result['confidence']:. 2%})")
        
        return QueryResponse(**result)
        
    except Exception as e: 
        logger.error(f"❌ Error processing query: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/stats")
async def get_statistics():
    """Get system statistics"""
    if rag_service is None:
        raise HTTPException(status_code=503, detail="RAG service not initialized")
    
    return rag_service.get_stats()


# Run server
if __name__ == "__main__":
    port = int(os.getenv("PYTHON_API_PORT", 8000))
    
    logger.info(f"\n🌐 Starting server on http://0.0.0.0:{port}")
    
    uvicorn.run(
        "api_main:app",
        host="0.0.0.0",
        port=port,
        reload=False,
        log_level="info"
    )