import { postService } from '../services/postService.js';

const createPost = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const files = req.files;
    let assets = files.map(file => ({
      url: file.path,
      public_id: file.filename
    }));
    if (files.length === 0) assets = [];
    const result = await postService.createPost({ title, content, authorId, assets });
    return res.status(201).json(result);
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}


const getPostByAuthorId = async (req, res) => {
  try {
    const { authorId } = req.query
    const result = await postService.getPostByAuthorId(authorId);
    return res.status(200).json(result);
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const getPostsFriend = async (req, res) => {
  try {
    const { userId } = req.query
    const result = await postService.getPostsFriend(userId);
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}


export const postController = {
  createPost,
  getPostByAuthorId,
  getPostsFriend
}