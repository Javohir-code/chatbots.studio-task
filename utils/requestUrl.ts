import request from 'request';

const callApi = (callback) => {
  request({ url: process.env.URL, json: true }, (error, response, body) => {
    if (error) {
      return callback(error);
    }
    return callback(JSON.stringify(body, undefined, 4));
  });
};

export default callApi;
