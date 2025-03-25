import { postService } from '../services/postService.js';

const createPost = async (req, res) => {
  try {
    const { content, authorId } = req.body;
    const files = req.files;
    let assets = files.map(file => ({
      url: file.path,
      public_id: file.filename
    }));
    if (files.length === 0) assets = [];
    const result = await postService.createPost(
      {content, authorId, assets });
    return res.status(201).json(result);
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}


const getPostByAuthorId = async (req, res) => {
  try {
    const { authorId, userId } = req.query
    const result = await postService.getPostByAuthorId({ authorId, userId });
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

const deletePost = async (req, res) => {
  try {
    const { postId, authorId } = req.body;
    const result = await postService.deletePost(postId, authorId);
    return res.status(200).json(result);
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const commentPost = async (req, res) => {
  try {
    const { postId, authorId, content,followCommentId } = req.body;
    const result = await postService.commentPost({ postId, authorId, content,followCommentId });
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const getComments = async (req, res) => {
  try {
    const { postId } = req.query
    const result = await postService.getComments(postId);
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const getCommentFollowCommentId = async (req, res) => {
  try {
    const { commentId } = req.query
    const result = await postService.getCommentFollowCommentId(commentId);
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const deleteComment = async (req, res) => {
  try {
    const { commentId, authorId } = req.body;
    const result = await postService.deleteComment(commentId, authorId);
    return res.status(200).json(result);
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const searchPost = async (req, res) => {
  try {
    const { title } = req.query
    const result = await postService.searchPost({ title });
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const interactionPost = async (req, res) => {
  try {
    const { postId, userId, type } = req.body;
    const result = await postService.interactionPost({ postId, userId, type });
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const uninteractionPost = async (req, res) => {
  try {
    const { postId, userId, type } = req.body;
    const result = await postService.uninteractionPost({ postId, userId, type });
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const getPostById = async (req, res) => {
  try {
    const { postId, userId } = req.query
    const result = await postService.getPostById({ postId, userId });
    return res.status(200).json(result);
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const editPost = async (req, res) => {
  try {
    const { postId, content, authorId, deleteFiles=[] } = req.body
    const files = req.files ? req.files : null
    let assets = files ? files.map(file => ({
      url: file.path,
      public_id: file.filename
    })) : []
    const result = await postService.editPost(
      { postId, content, authorId, assets, deleteFiles });
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export const postController = {
  createPost,
  getPostByAuthorId,
  getPostsFriend,
  deletePost,
  commentPost,
  getComments,
  getCommentFollowCommentId,
  deleteComment,
  searchPost,
  interactionPost,
  uninteractionPost,
  getPostById,
  editPost
}