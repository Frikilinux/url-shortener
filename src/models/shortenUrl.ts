import { Model, Schema, model } from 'mongoose'

interface IUrl {
  urlLong?: string
  codeID?: string
  created?: Date
}

const ShortUrlSchema = new Schema({
  urlLong: {
    type: String,
    required: true,
  },
  codeID: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

ShortUrlSchema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...url } = this.toObject()
  return url
}

const ShortUrl: Model<IUrl> = model<IUrl>('ShortUrl', ShortUrlSchema)

export { ShortUrl, IUrl }
