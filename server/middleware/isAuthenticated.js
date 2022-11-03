require('dotenv').config()
const jwt = require('jsonwebtoken')
//pullling SECRET variable from .env 
const {SECRET} = process.env

module.exports = {

    //isAuthenticated variable requests data, responds with that data, then executes the following data with the third argument 'next'
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')


        //if the header token is falsey then console log the error and send 401 status
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        //checking if token is authorized
        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }
        //if token is not authorized then print error message
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}