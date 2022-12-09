function userAuthenticated (req, res, next) {
    if (req.session.user) {
        console.log(`'${req.session.user.username}' authentication request for '${req.method} ${req.url}'.`)
        return next()
    } else {
        console.log(`No login authentication request for '${req.method} ${req.url}'.`)
        return res.status(401).send({
            status: res.statusCode,
            message: "No user logged in."
        })
    }
}

export default userAuthenticated