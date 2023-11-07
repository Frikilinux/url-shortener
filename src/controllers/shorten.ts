import { Response, Request } from 'express'
import { genId } from '../helpers/genId'
import { ShortUrl } from '../models/shortenUrl'

const postUrl = async (req: Request, res: Response): Promise<void> => {
  const { url } = req.body
  const host = req.headers.host || process.env.API_HOST

  try {
    const urlInDB = await ShortUrl.findOne({ urlLong: url })

    if (urlInDB) {
      res.status(400).json({
        message: 'Url already exists',
        url: `${process.env.API_URL}/${urlInDB.codeID}`,
        urlLong: urlInDB.urlLong,
      })
      return
    }

    // Generate a base64 code and check if it already exists
    const codeID = await genId()

    const newUrl = new ShortUrl({
      urlLong: url,
      codeID,
      created: new Date(),
    })

    await newUrl.save()

    res.status(201).json({
      url: `${host}/${codeID}`,
      urlLong: newUrl.urlLong,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error',
      code: '500',
    })
  }
}

const getUrl = async (req: Request, res: Response): Promise<void> => {
  const { codeID } = req.params

  try {
    const url = await ShortUrl.findOne({ codeID })

    if (!url) {
      res.status(404).json({
        message: 'Url not found',
        code: '404',
      })
      return
    }

    // res.status(200).json({
    //   logUrl: url.urlLong,
    //   shortUrl: `${process.env.API_URL}/${url.codeID}`,
    // })

    res.redirect(url.urlLong)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Internal server error',
      code: '500',
    })
  }
}

export { postUrl, getUrl }
