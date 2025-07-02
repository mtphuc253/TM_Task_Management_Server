/* eslint-disable no-console */

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let trelloDatabaseInstance = null //Tạo một biến để lưu trữ instance của cơ sở dữ liệu

const mongoClientInstance = new MongoClient(env.MONGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
  //Lưu ý: serverApi là một tùy chọn để xác định phiên bản API của MongoDB, có thể không cần dùng nó, còn nếu dùng nó là chúng ta đang chỉ định rõ ràng phiên bản API mà chúng ta muốn sử dụng.
  //strict: true có nghĩa là chúng ta muốn sử dụng các tính năng mới nhất của MongoDB và không muốn sử dụng các tính năng đã bị loại bỏ hoặc không còn được khuyến nghị sử dụng.
  //deprecationErrors: true có nghĩa là chúng ta muốn nhận thông báo lỗi nếu sử dụng các tính năng đã bị loại bỏ hoặc không còn được khuyến nghị sử dụng.
})

export const connectToDatabase = async () => {
  try {
    await mongoClientInstance.connect()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}

//Hàm này (không phải là async) để lấy instance của cơ sở dữ liệu MongoDB
//Nếu chưa kết nối thì sẽ ném ra lỗi để yêu cầu người dùng gọi connectToDatabase() trước
//Nếu đã kết nối thì sẽ trả về instance của cơ sở dữ liệu
//Lưu ý: phải đảm bảo getDatabase() được gọi sau khi connectToDatabase() đã được gọi thành công
export const getDatabase = () => {
  if (!trelloDatabaseInstance) {
    throw new Error('Database not connected. Please call connectToDatabase() first.')
  }
  return trelloDatabaseInstance //Trả về instance của cơ sở dữ liệu
}

export const closeDatabase = async () => {
  if (trelloDatabaseInstance) {
    try {
      await mongoClientInstance.close()
      console.log('Server is shutted down.')
    } catch (error) {
      console.error('Error closing MongoDB connection:', error)
    }
  } else {
    console.warn('MongoDB client instance does not exist.')
  }
}

