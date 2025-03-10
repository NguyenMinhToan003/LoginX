import { uploadFilesToCloudinary } from '~/configs/cloudinary';
import { userModel } from '~/models/userModel';
import { postModel } from '~/models/postModel';

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

const getPostByAuthorId = async (authorId) => {
  try {
    const result = await postModel.findPostsByAuthorId({authorId})
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
    const friends = user.friends
    const result = await postModel.findPostsByAuthorId(
      { authorId: { $in: friends } })
    return result
  }
  catch (error) {
    throw error
  }
}

export const postService = {
  createPost,
  getPostByAuthorId,
  getPostsFriend
}