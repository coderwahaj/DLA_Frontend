/*export const getErrorMessage = (error) => {
  if (error.response) {
    // Server responded with error
    return error.response.data?. message || 'An error occurred';
  } else if (error.request) {
    // Request made but no response
    return 'No response from server.  Please check your connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};

export const handleApiError = (error, toast) => {
  const message = getErrorMessage(error);
  
  if (toast) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: message,
    });
  }
  
  console.error('API Error:', error);
  return message;
};
*/

/**
 * Extracts the primary error message from the error object.
 */
export const getErrorMessage = (error) => {
  if (error.response) {
    // Server responded with error (e.g., Axios/Fetch error)
    return error.response.data?.message || "An error occurred";
  } else if (error.request) {
    // Request made but no response (Network error)
    return "No response from server. Please check your connection.";
  } else {
    // Something else happened (e.g., code error)
    return error.message || "An unexpected error occurred";
  }
};

/**
 * NEW: Extracts the HTTP status code from the error object.
 */
export const getErrorStatus = (error) => {
  // Check if the error object has a response property and a status code
  return error.response?.status || null;
};

/**
 * General function to handle API errors (logging and optional toast).
 */
export const handleApiError = (error, toast) => {
  const message = getErrorMessage(error);
  if (toast) {
    toast({
      variant: "destructive",
      title: "Error",
      description: message,
    });
  }
  console.error("API Error:", error);
  return message;
};