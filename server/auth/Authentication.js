function userAuthenticated (req, res, next) {
    if (req.session.user) {
        return next()
    } else {
        return res.status(403).send({
            status: res.statusCode,
            message: "No user logged in."
        })
    }
}

export default userAuthenticated