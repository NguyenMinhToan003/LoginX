import { genarateToken } from "~/middleware/jwt/token.js";
import { authService } from "../services/authService.js"

const loginWithTwitter = async (req, res) => {
  try {
    const user = req.user

    if (user) {
      const result = await authService.loginWithTwitter(user)

      if (result?.insertedId) {
        const token = await genarateToken({_id:result.insertedId})
        return res.redirect(`${process.env.FRONTEND_ENDPOINT}/login?token=${token}`);
      }
      const token = await genarateToken({_id:result._id})
      return res.redirect(`${process.env.FRONTEND_ENDPOINT}/login?token=${token}`);
    }
    // Nếu không xác thực được
    return res.status(401).json({ message: 'Authentication failed' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const loginWithGithub = async (req, res) => {
   try {
     const user = req.user
    if (user) {
      const result = await authService.loginWithGithub(user)
      
      if (result?.insertedId) {
        const token = await genarateToken({_id:result.insertedId})
        return res.redirect(`${process.env.FRONTEND_ENDPOINT}/login?token=${token}`);
      }
      const token = await genarateToken({_id:result._id})
      return res.redirect(`${process.env.FRONTEND_ENDPOINT}/login?token=${token}`);
    }
    // Nếu không xác thực được
    return res.status(401).json({ message: 'Authentication failed' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const decodeTokenLogin = async (req, res) => {
  try {
    const { token } = req.query
    const user = await authService.decodeTokenLogin(token)
    if (user) {
      return res.status(200).json(user)
    }
    return res.status(404).json({ message: 'not user' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const authController = {
  loginWithTwitter,
  loginWithGithub,
  decodeTokenLogin
}