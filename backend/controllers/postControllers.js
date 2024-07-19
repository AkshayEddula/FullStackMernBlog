import Post from "../models/post.model.js";
import { v2 as cloudinary } from 'cloudinary';
import User from "../models/user.model.js";

export const createPost = async (req, res) => {
    try {
        const { title, body, coverImg, tags } = req.body;
        const { authorId} = req.body;

        const author = await User.findById(authorId);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }


        if (!title || !body || !coverImg) {
            return res.status(400).json({ error: "Post must have title, coverImg, and body" });
        }

        let uploadedImageUrl;
        if (coverImg) {
            const uploadResponse = await cloudinary.uploader.upload(coverImg, {
                folder: "posts", // optional: you can specify a folder in your cloudinary account
            });
            uploadedImageUrl = uploadResponse.secure_url;
            console.log(uploadedImageUrl);
        }

        // if (!mongoose.Types.ObjectId.isValid(authorId)) {
        //     return res.status(400).json({ message: 'Invalid author ID format' });
        // }

        
        const newPost = new Post({
            title,
            coverImg: uploadedImageUrl,
            body,
            tags,
            author: author._id,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        console.log(`error creating post: ${error}`);
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const displayPost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Server error" });
    }
};

export const updatePost = async (req, res) => {
    const postId = req.params.postId;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const updatePost2 = async (req, res) => {
    const { title, body, coverImg, tags } = req.body;
    const postId = req.params.postId;

    try {
        await Post.findByIdAndUpdate(postId, {
            title,
            body,
            coverImg,
            tags,
        })
        res.status(200).json({message: 'success'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
}

export const updateCategory = async (req, res) => {
    const tags = req.params.tags;

    try {
        const posts = await Post.find({ tags: tags}).select("title coverImg");

        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error})
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};