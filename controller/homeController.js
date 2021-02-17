
const homeRender = (req, res) => {
    
    res.render('home.ejs', {user: req.user.user});
    
}

module.exports = {homeRender};