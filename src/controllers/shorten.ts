import { Response, Request } from 'express'
import { genId } from '../helpers/genId'
import { ShortUrl } from '../models/shortenUrl'

const postUrl = async (req: Request, res: Response): Promise<void> => {
  const { url } = req.body

  try {
    const urlInDB = await ShortUrl.findOne({ urlLong: url })

    if (urlInDB) {
      res.status(400).json({
        message: 'Url exist',
        url: `${process.env.API_URL}/${urlInDB.codeID}`,
        urlLong: urlInDB.urlLong,
      })
      return
    }

    const codeID = await genId()

    const newUrl = new ShortUrl({
      urlLong: url,
      codeID,
      created: new Date(),
    })

    await newUrl.save()

    res.status(201).json({
      url: `${process.env.API_URL}/${codeID}`,
      urlLong: newUrl.urlLong,
    })
  } catch (error) {
    console.log(error)
    return
  }
}

const getUrl = async (req: Request, res: Response): Promise<void> => {
  const { url } = req.body
  res.send({ url })
}

export { postUrl, getUrl }
