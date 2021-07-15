import * as express from 'express';
import { dogImage, getDogImages } from '../controllers/image.controller';

const router = express.Router();

router.route('/upload/dog/image').post(dogImage);
router.route(' /list/dog/images').get(getDogImages);

module.exports = router;
