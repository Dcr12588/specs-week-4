module.exports = {
    getAllPosts: (req,res) => {
        console.log('get all posts')
    },

    getCurrentUserPosts: (req,res) => {
        console.log('current users posts')
    },

    addPost: (req,res) => {
        console.log(' add a post')
    },

    editPost: (req,res) => {
        console.log('edit a post')
    },

    deletePost: (req,res) => {
        console.log('delete a post')
    }
}