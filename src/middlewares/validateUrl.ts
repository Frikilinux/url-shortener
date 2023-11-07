import { NextFunction, Request, Response } from 'express'
import { URL } from 'url'

const validateUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { url }: { url: string } = req.body
  try {
    new URL(url)
    next()
  } catch (error) {
    res.status(400).json({
      message: 'Invalid Url',
      code: '400',
    })
  }
}
export default validateUrl
