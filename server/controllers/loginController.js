const registerView = (req, res) => {
    res.render("register", {
    } );
}

const loginView = (req, res) => {
    res.render("login", {
    } );
}
module.exports =  {
    registerView,
    loginView
};