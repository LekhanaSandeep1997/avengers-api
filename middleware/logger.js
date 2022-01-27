log = (req, res, next) => {
    console.log("Login User Details.....");
    next();
}

module.exports = log;