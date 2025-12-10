exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'You are not logged in'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to perform this action'
      });
    }

    next();
  };
};

exports.isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not logged in'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied.  Admin only.'
    });
  }

  next();
};

exports.isLawyerOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not logged in'
    });
  }

  if (! ['lawyer', 'admin'].includes(req.user.role)) {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. Lawyers and admins only.'
    });
  }

  next();
};