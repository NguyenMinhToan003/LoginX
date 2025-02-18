import { MongoClient, ServerApiVersion } from 'mongodb'
import 'dotenv/config'

let getData = null

const clientInstance = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
// ket noi database
export const CONNECT_DB = async () => {
  // goi ket noi database voi MONGO_URI
  await clientInstance.connect()
  // ket noi thanh cong thi truy cap database voi MONGO_NAME
  getData = clientInstance.db(process.env.DB_NAME)
  console.log('Connected to database >>>>')

}
export const GET_DB = () => {
  if (!getData) console.error('Missing connect database!!!')
  return getData
}
export const CLOSE_DB = async () => {
  await clientInstance.close()
}