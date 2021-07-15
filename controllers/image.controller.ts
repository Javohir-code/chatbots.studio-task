import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import callApi from '../utils/requestUrl';
import { UrlPhoto } from '../models/ImageUrl';

// @desc Get info from url and save it to DB
// @route POST /upload/dog/image
// @access Pulic
const dogImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    callApi(async (response) => {
      response = JSON.parse(response);
      const ext = response.url.split('.').pop();
      if (ext === 'mp4' || ext === 'gif') {
        console.log('returned');
        res.redirect(307, '/upload/dog/image');
        return;
      } else {
        const newDog = new UrlPhoto({
          fileSizeBytes: response.fileSizeBytes,
          url: response.url,
        });
        await newDog.save();
        res.status(201).json({ success: true, newDog });
        return;
      }
    });
  } catch (error) {
    res.status(400).send('Bad Request');
    return;
  }
};

// @desc Get list of the Dog images
// @route GET /list/dog/images
// @access Public
const getDogImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const count = await UrlPhoto.countDocuments();
    const images = await UrlPhoto.find({});
    const result = [];
    images.forEach((image) => {
      result.push(_.pick(image, ['_id', 'url']));
    });
    return res.status(200).json({ count: count, images: result });
  } catch (error) {
    return res
      .status(400)
      .send('Error occured while sending information from DB');
  }
};

export { dogImage, getDogImages };
