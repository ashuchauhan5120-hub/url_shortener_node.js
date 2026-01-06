
function requireRole(role) {
    return (req, res, next) => {
        if (!req.session.userId) {
            return res.redirect("/login");
        }
        if (req.session.role !== role) {
            return res.status(403).send("Access denied.")
        }
        next();

    }
}

module.exports = { requireRole }