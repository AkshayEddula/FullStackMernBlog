import mongoose from "mongoose";

const authScheme = new mongoose.Schema(
    {
        title: {
            type: 'string',
            required: true,
        },
        coverImg: {
            type: 'string',
            required: true
        },
        body: {
            type: 'string',
            required: true
        },
        tags: {
            type: [String], // Array of strings to store tags
            required: false,
        },
        author: { 
            type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
        },

    },
    {timestamps: true}
)

const Post = mongoose.model('Post', authScheme);

export default Post;