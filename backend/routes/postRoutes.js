import express from 'express';
import { createPost, deletePost, displayPost, getAllPosts, updateCategory, updatePost, updatePost2 } from '../controllers/postControllers.js';
import authenticateToken from '../middleWare/authenticateToken.js';

const router = express.Router();

router.post('/posts/createpost', authenticateToken,  createPost)
router.get('/posts', getAllPosts)
router.get('/posts/:id', displayPost)
router.get('/posts/editpost/:postId', authenticateToken, updatePost)
router.put('/posts/editpost/:postId', authenticateToken, updatePost2)
router.post('/categories/:tags', updateCategory)
router.delete('/posts/deletepost/:postId', authenticateToken, deletePost)

export default router;