module.exports =  (options) => (req , res , next ) => {
    var today = new Date();
    req.requestTime = today;
    console.log("myLogger | Time : ", today.toLocaleString());
    console.log(options);
    next();
};