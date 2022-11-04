require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {

    //isAuthenticated variable requests data, responds with that data, then executes the following data with the third argument 'next'
          // accessing the authentication token from the request headers that should be sent along with each request
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')


               // if a token wasn't sent along with the request we know they're not ===>//
               //authorized and we immediately send back an error (401 not authorized)//
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        //checking if token is authorized through set variable
        // using the jwt library along with our secret to verify the user's token. ===>
        //If that doesn't work the error in the catch below will trigger
        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }
        //if token is not authorized then throw error message
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }
        // next with move the request along to the appropriate handler function in the appropriate controller
        next()
    }
}