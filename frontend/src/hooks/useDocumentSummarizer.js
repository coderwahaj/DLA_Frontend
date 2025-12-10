import { useState, useCallback } from 'react';
// import { summarizerApi } from '@/api/summarizerApi'; // TODO: Create when backend is ready

export const useDocumentSummarizer = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);

  const uploadDocument = useCallback(async (file) => {
    try {
      setIsProcessing(true);
      setError(null);
      setUploadedFile(file);

      // TODO: Replace with actual API call
      // const formData = new FormData();
      // formData.append('document', file);
      // const response = await summarizerApi. uploadDocument(formData);

      // Mock response for now
      setTimeout(() => {
        const mockSummary = {
          type: 'Annual Financial Report — Individual Taxpayer (Pakistan)',
          year: '2024–2025',
          source: 'Federal Board of Revenue (FBR) Submission',
          content: `AI-Generated Summary: The financial document represents the annual income and expenditure details of Mr. Ahmed Khan, a registered taxpayer and salaried employee based in Karachi, Pakistan. The report outlines his gross annual income of PKR 4,800,000, derived primarily from employment at a private technology firm.  After standard deductions and tax adjustments, his net taxable income stands at PKR 4,200,000, with total tax paid amounting to PKR 315,000 during the fiscal year. 

Expenditure records indicate consistent monthly spending on essential utilities, rent, and transportation, averaging PKR 180,000 per month. Additionally, investments were made in National Savings Certificates and mutual funds, reflecting a moderate-risk financial profile. The document highlights no record of outstanding liabilities, loan defaults, or tax penalties. 

The taxpayer's Wealth Statement shows gradual asset growth compared to the previous year, primarily through savings and small-scale investments. Overall, the financial summary portrays stable income, responsible financial management, and full tax compliance with FBR regulations.  The document has been digitally verified and meets the filing requirements for the 2024–2025 tax year.`
        };

        setSummary(mockSummary);
        setIsProcessing(false);
      }, 3000);

    } catch (err) {
      setError(err.message);
      console.error('Document processing error:', err);
      setIsProcessing(false);
    }
  }, []);

  const clearSummary = useCallback(() => {
    setSummary(null);
    setUploadedFile(null);
    setError(null);
  }, []);

  return {
    isProcessing,
    summary,
    uploadedFile,
    error,
    uploadDocument,
    clearSummary
  };
};

export default useDocumentSummarizer;