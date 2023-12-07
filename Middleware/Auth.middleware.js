const jwt = require('jsonwebtoken');

const authenticateAdmin = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if(err) return res.sendStatus(401);
        if (user.role != 'admin') return res.sendStatus(403);
        
        req.user = user;
        next();
    });
};

const authenticateUser = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if(err) return res.sendStatus(401);
        if (user.role != 'user') return res.sendStatus(403);
        
        req.user = user;
        next();
    });
};


const authenticateRefresh = (req,res,next) => {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    const token = req.cookies.refreshToken;
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err,user) => {
        if(err) return res.sendStatus(403);
        
        req.user = user;
        next();
    });
};

module.exports = { authenticateAdmin, authenticateUser, authenticateRefresh };