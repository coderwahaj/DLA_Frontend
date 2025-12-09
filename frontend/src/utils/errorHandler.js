export const getErrorMessage = (error) => {
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