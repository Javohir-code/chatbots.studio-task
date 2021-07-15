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
    const images = await UrlPhoto.find({});
    const result = [];
    const queryData = req.query.search;
    images.forEach((date) => {
      const dateObj = date.createdAt;

      let month: any = dateObj.getUTCMonth() + 1;
      let day: any = dateObj.getUTCDate();
      const year: any = dateObj.getUTCFullYear();
      day = day < 10 ? `0${day}` : day;
      month = month < 10 ? `0${month}` : month;
      const newdate = `${day}.${month}.${year}`;
      console.log(newdate);
      if (newdate === queryData) {
        result.push(_.pick(date, ['_id', 'url', 'createdAt']));
      }
    });
    res.status(200).json({ count: result.length, images: result });
    return;
  } catch (error) {
    res.status(400).send('Error occured while sending information from DB');
    return;
  }
};

export { dogImage, getDogImages };
