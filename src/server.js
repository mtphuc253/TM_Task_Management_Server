/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { connectToDatabase, getDatabase, closeDatabase } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const startServer = () => {
  const app = express()

  const hostname = env.APP_HOST
  const port = env.APP_PORT

  app.use(express.json()) //Enable req.body json data

  app.use('/v1', APIs_V1)

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  app.listen(port, hostname, () => {
    console.log(`3. Hello ${env.AUTHOR}, I am running at http://${hostname}:${port}/`)
  })

  //Thực hiện cleanup trước khi ứng dụng thoát
  //Ví dụ: đóng kết nối đến MongoDB, ghi log, v.v.
  exitHook(() => {
    closeDatabase()
  })
}

(async () => {
  try {
    console.log('1. Connecting to MongoDB...')
    await connectToDatabase()
    console.log('2. Connected to MongoDB successfully!')

    startServer()
  } catch (error) {
    console.error('2. Error connecting to MongoDB:', error)
    process.exit(0) // Exit the process with a failure code.error('1. Error connecting to MongoDB:', error)
  }
})()

// connectToDatabase()
//   .then(() => {
//     console.log('2. Connected to MongoDB successfully!')
//   })
//   .then(() => {
//     startServer()
//   })
//   .catch((error) => {
//   })
