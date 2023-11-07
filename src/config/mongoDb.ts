import mongoose from 'mongoose'

export const connect = async (): Promise<void> => {
  try {
    const url = process.env.DB_URL
    if (!url) {
      throw new Error('DB url is not defined')
    }
    await mongoose.connect(url)
    console.log('Connected to DB')
  } catch (error) {
    console.log(error)
    throw new Error('Failed to connect to DB')
  }
}
