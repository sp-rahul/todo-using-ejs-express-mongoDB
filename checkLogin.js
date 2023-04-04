//const jwt = require('jsonwebtoken');

const checkLogin = async (res, req, next) => {
    //const { authorization } = req.headers;


    try{
        console.log( req.headers);
       
        next();

    }catch{
        next('Authentication faliure!');

    }
};

module.exports = checkLogin;