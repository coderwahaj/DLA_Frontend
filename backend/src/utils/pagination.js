/**
 * Calculate pagination metadata
 * @param {number} page - Current page number (1-based)
 * @param {number} limit - Items per page
 * @param {number} totalItems - Total number of items
 * @returns {object} Pagination metadata
 */
const getPagination = (page = 1, limit = 10, totalItems = 0) => {
  const currentPage = Math.max(1, parseInt(page));
  const itemsPerPage = Math.max(1, parseInt(limit));
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    offset,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage:  currentPage > 1
  };
};

/**
 * Format pagination response
 * @param {Array} data - Array of items
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} totalItems - Total items count
 * @returns {object} Formatted response
 */
const paginateResponse = (data, page, limit, totalItems) => {
  const pagination = getPagination(page, limit, totalItems);

  return {
    success: true,
    data,
    pagination:  {
      page:  pagination.currentPage,
      limit: pagination.itemsPerPage,
      totalPages: pagination.totalPages,
      totalItems: pagination.totalItems,
      hasNext: pagination.hasNextPage,
      hasPrevious: pagination. hasPreviousPage
    }
  };
};

module.exports = {
  getPagination,
  paginateResponse
};