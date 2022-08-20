export const LogMiddleware = (req, res, next) => {

    const method = req.method
    console.log(`LOG ${Date.now()} - ${method} ${req.originalUrl}`)
    return next()
}