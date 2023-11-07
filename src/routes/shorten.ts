import { Router } from 'express'
import { getUrl, postUrl } from '../controllers/shorten'
import validadeUrl from '../middlewares/validateUrl'

const router = Router()

router.post('/', validadeUrl, postUrl)

router.get('/', getUrl)

export default router
