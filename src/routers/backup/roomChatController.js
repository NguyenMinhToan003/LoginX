// import { roomChatService } from "./roomChatService.js"

// const createRoom = async (req, res) => {
//   try {
//     const { type, name, admins, members } = req.body
//     const files = req.files ? req.files : null
//     let file = files?.length > 0 
//       ? {
//         url: files[0]?.path,
//         type: files[0]?.mimetype
//       }
//       : {
//         url: 'empty',
//         public_id: 'empty',
//         type: 'empty'
//       }

//     const result = await roomChatService.createRoom(type, name, file, admins, members)
//     return res.status(200).json(result)
//   }
//   catch (error) {
//     return res.status(400).json({ message: error.message })
//   }
// }
// const findOrCreateRoomPrivate = async (req, res) => {
//   try {
//     const { userSearchId,userOrtherId } = req.body
//     const result = await roomChatService.findOrCreateRoomPrivate(userSearchId,userOrtherId)
//     return res.status(200).json(result)
//   }
//   catch (error) {
//     return res.status(400).json({ message: error.message })
//   } 
// }
// const joinRoom = async (req, res) => {
//   try {
//     const { roomId, members } = req.body
//     const result = await roomChatService.joinRoom(roomId, members)
//     return res.status(200).json(result)
//   }
//   catch (error) {
//     return res.status(400).json({ message: error.message })
//   }
// }
// const getRoom = async (req, res) => {
//   try {
//     const { roomId } = req.query
//     const result = await roomChatService.getRoom(roomId)
//     return res.status(200).json(result)
//   }
//   catch (error) {
//     return res.status(400).json({ message: error.message })
//   }
// }
// const getRoomChatByUserId = async (req, res) => {
//   try {
//     const { userId } = req.query
//     const type = req.query.type ? req.query.type : null
//     const result = await roomChatService.getRoomChatByUserId(userId, type)
//     return res.status(200).json(result)
//   }
//   catch (error) {
//     return res.status(400).json({ message: error.message })
//   }
// }

// const deleteRoom = async (req, res) => {
//   try {
//     const { roomId, userId } = req.body
//     const result = await roomChatService.deleteRoom(roomId,userId)
//     return res.status(200).json(result)
//   }
//   catch (error) {
//     return res.status(400).json({ message: error.message })
//   }
// }

// const leaveRoom = async (req, res) => {
//   try {
//     const { roomId, userId } = req.body
//     const result = await roomChatService.leaveRoom(roomId,userId)
//     return res.status(200).json(result)
//   }
//   catch (error) {
//     return res.status(400).json({ message: error.message })
//   }
// }

// const updateInfoRoom = async (req, res) => {
//   try {
//     const { roomId, name, admins, userAction } = req.body
//     const files = req.files ? req.files : null
//     let file = files?.length > 0 
//       ? {
//         url: files[0]?.path,
//         type: files[0]?.mimetype
//       }
//       : {
//         url: 'empty',
//         public_id: 'empty',
//         type: 'empty'
//       }
//     const result = await roomChatService.updateInfoRoom(
//       roomId,
//       name,
//       file,
//       admins,
//       userAction
//     )
//     return res.status(200).json(result)
//   }
//   catch (error) {
//     return res.status(400).json({ message: error.message })
//   }
// }

// export const roomChatController = {
//   createRoom,
//   findOrCreateRoomPrivate,
//   joinRoom,
//   getRoom,
//   deleteRoom,
//   getRoomChatByUserId,
//   leaveRoom,
//   updateInfoRoom
// }