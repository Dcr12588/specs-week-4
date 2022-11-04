require('dotenv').config()


const express = require('express')
const cors = require('cors')

const {sequelize} = require('./util/database')
const {SERVER_PORT} = process.env
const {User} = require('./models/user')
const {Post} = require('./models/post')
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')
const {register, login} = require('./controllers/auth')
const {isAuthenticated} = require('./middleware/isAuthenticated')

const app = express()

app.use(express.json())
app.use(cors())

User.hasMany(Post)
Post.belongsTo(User)

//authorization
app.post('/register', register)
app.post('/login', login)

//auth not required
app.get('/posts', getAllPosts)

//auth required
app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)

sequelize.sync()
.then(() => {
    app.listen (SERVER_PORT, () => console.log(`we are live in dimension ${SERVER_PORT}`))
})
.catch(err => console.log(err))