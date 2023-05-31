
function isAuthenticated(req, res, next) {
    const token = req.cookies.token;
  
    if (token) {
      try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY);
        
        // User is authenticated, proceed to the next middleware
        return next();
      } catch (err) {
        // Invalid token, redirect to the login page
        return res.redirect('/login');
      }
    }
  
    // Token not found, redirect to the login page
    res.redirect('/login');
  }
  

// Exports
module.exports = isAuthenticated