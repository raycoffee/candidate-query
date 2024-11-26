export function errorHandler(err, req, res, next) {
  console.error(err);
  
  if (err.response?.status === 429) {
    return res.status(429).json({
      error: 'Search quota exceeded. Please try again later.'
    });
  }
  
  res.status(500).json({
    error: err.message || 'Internal server error'
  });
}