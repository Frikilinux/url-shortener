import crypto from 'crypto'
import { ShortUrl } from '../models/shortenUrl'

const genId = async (): Promise<string> => {
  let newCodeID: string = ''
  while (!newCodeID) {
    newCodeID = crypto.randomBytes(8).toString('base64url')
    const codeID = await ShortUrl.findOne({ codeID: newCodeID })

    if (codeID) {
      newCodeID = ''
    }
  }
  return newCodeID
}

export { genId }
