import { authService } from "../services/authService.js"

const loginWithTwitter = async (req, res) => {
  try {
    const user = req.user

    if (user) {
      console.log('>>>>>>>>>> controler', user)
      const result = await authService.loginWithTwitter(user)
      return res.status(200).json(result)
    }
    // Nếu không xác thực được
    return res.status(401).json({ message: 'Authentication failed' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie('connect.sid')
    res.session.destroy()
    res.redirect('/')
  }
  catch (error) {
    throw error
  }
}

export const authController = {
  loginWithTwitter,
  logout
}