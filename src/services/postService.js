import { deleteFilesFromCloudinary, uploadFilesToCloudinary } from '~/configs/cloudinary';
import { userModel } from '~/models/userModel';
import { postModel } from '~/models/postModel';
import { postCommentModel } from '~/models/post_commentModel';
import { postInteractionModel } from '~/models/post_interactionsModel';
import { ObjectId } from 'mongodb';
import { friendModel } from '~/models/friendModel';

const createPost = async ({ title, content, authorId, assets }) => {
  try {
    const author = await userModel.findUserById(authorId)
    if (!author) return { message: 'Author not found' }

    const uploadCloudinary = await uploadFilesToCloudinary(assets)

    const data = {
      title,
      content,
      authorId,
      assets: uploadCloudinary,
    }
    const result = await postModel.createPost(data)
    return {
      ...result,
      message: 'Post created'
    }
  }
  catch (error) {
    throw error
  }
}

const getPostByAuthorId = async ({authorId, userId}) => {
  try {
    const result = await postModel.findPostsByAuthorId({ authorId })
    // add interaction
    for (let i = 0; i < result.length; i++) {
      const post = result[i]
      const interactions = await postInteractionModel.getInteractionByPostId(
        {postId: post._id, userId}
      )
      const comments = await postCommentModel.findCommentsByPostId(post._id)
      result[i].coundComment = comments.length
      result[i].interactions = interactions
    }

    return result
  }
  catch (error) {
    throw error
  }
}

const getPostsFriend = async (userId) => {
  try {
    const user = await userModel.findUserById(userId)
    if (!user) return { message: 'User not found' }
    const friends =await friendModel.findFriendsByUserId(userId)
    const friendsId = friends.map(friend => friend._id)
    let result = await postModel.findPostsByAuthorId(
      { authorId: { $in: friendsId } })
    
    // add interaction 
    for (let i = 0; i < result.length; i++) {
      const post = result[i]
      const interactions = await postInteractionModel.getInteractionByPostId(
        {postId: post._id, userId}
      )
      const comments = await postCommentModel.findCommentsByPostId(post._id)
      result[i].coundComment = comments.length
      result[i].interactions = interactions

    }
    return result
  }
  catch (error) {
    throw error
  }
}

const deletePost = async (postId, authorId) => {
  try {
    const post = await postModel.findPostById(postId)
    if (!post) return { message: 'Post not found' }
    if (post.authorId !== authorId) return { message: 'Unauthorized' }
    const result = await postModel.deletePost(postId)
    const deleteInCloundinary = await deleteFilesFromCloudinary(post.assets)
    return {
      ...result,
      message: 'action delete post'
    }
  }
  catch (error) {
    throw error
  }
}

const commentPost = async ({ postId, authorId, content, followCommentId }) => {
  try {
    const post = await postModel.findPostById(postId)
    if (!post) return { message: 'Post not found' }
    const author = await userModel.findUserById(authorId)
    if (!author) return { message: 'user not found' }
    if (followCommentId) {
      const followComment = await postCommentModel.findCommentById(followCommentId)
      if(!followComment) followCommentId = null
    }
    const data = {
      postId,
      authorId,
      content,
      followCommentId
    }
    const result = await postCommentModel.createComment(data)
    return {
      ...result,
      message: 'action comment post'
    }
  }
  catch (error) {
    throw error
  }
}

const getComments = async (postId) => {
  try {
    const post = await postModel.findPostById(postId)
    if (!post) return { message: 'Post not found' }
    const result = await postCommentModel.findCommentsByPostId(postId)
    return result
  }
  catch (error) {
    throw error
  }
}

const getCommentFollowCommentId = async (commentId) => {
  try {
    console.log(commentId)
    const comment = await postCommentModel.findCommentById(commentId)
    if (!comment) return { message: 'Comment not found' }
    const result = await postCommentModel.findCommentFollowCommentId(commentId)
    return result
  }
  catch (error) {
    throw error
  }
}

const deleteComment = async (commentId, authorId) => {
  try {
    const comment = await postCommentModel.findCommentById(commentId)
    if (!comment) return { message: 'Comment not found' }
    if (comment.authorId !== authorId) return { message: 'Unauthorized' }
    const result = await postCommentModel.deleteComment(commentId)
    return {
      ...result,
      message: 'action delete comment'
    }
    
  }
  catch (error) {
    throw error
  }
}

const searchPost = async ({ title }) => {
  try {
    const result = await postModel.findPostByQuery({ title }) 
    for(let i = 0; i < result.length; i++) {
      const post = result[i]
      const interactions = await postInteractionModel.getInteractionByPostId(
        {postId: post._id, userId: post.authorId}
      )
      const comments = await postCommentModel.findCommentsByPostId(post._id)
      result[i].coundComment = comments.length
      result[i].interactions = interactions
    }
    return result
  }
  catch (error) {
    throw error
  }
}

const interactionPost = async ({ postId, userId, type }) => {
  try {
    const post = await postModel.findPostById(postId)
    if (!post) return { message: 'Post not found' }
    const user = await userModel.findUserById(userId)
    if (!user) return { message: 'User not found' }
    const findInteraction = await postInteractionModel.findInteractionByQuery({
      postId: new ObjectId(postId),
      userId
    })
    console.log('findInteraction',findInteraction)
    let result = {}
    if (findInteraction.length === 0 ){
      result = postInteractionModel.createPostInteraction({
        postId,
        userId,
        type
      })
    }
    else {
      result = postInteractionModel.updatePostInteraction({
        _id: findInteraction[0]._id,
        type
      })
    }

    return result
  }
  catch (error) {
    throw error
  }
}

const uninteractionPost = async ({ postId, userId, type }) => {
  try {
    const post = await postModel.findPostById(postId)
    if (!post) return { message: 'Post not found' }
    const user = await userModel.findUserById(userId)
    if (!user) return { message: 'User not found' }
    const findInteraction = await postInteractionModel.findInteractionByQuery({
      postId: new ObjectId(postId),
      userId,
      type
    })
    if (findInteraction.length === 0) return { message: 'Interaction not found' }
    const result = postInteractionModel.deletePostInteraction({
      postId,
      userId,
      type
    })
    return result
  }
  catch (error) {
    throw error
  }
}
const getPostById = async ({ postId, userId }) => {
  try {
    const post = await postModel.findPostById(postId)
    if (!post) return { message: 'Post not found' }
    const result = post
    const interactions = await postInteractionModel.getInteractionByPostId(
      {postId: post._id, userId}
    )
    result.interactions = interactions
    const comments = await postCommentModel.findCommentsByPostId(postId)
    result.comments = comments
    return result
  }
  catch (error) {
    throw error
  }
}
export const postService = {
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
  getPostById
}
