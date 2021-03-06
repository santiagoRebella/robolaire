import request from 'superagent';

const defaultParams = {
  header: {},
  query: {}
};

function get(url, params = defaultParams) {
  let finalRequest = request
    .get(url)
    .query(params.query);

  if (params.header.responseType) {
    finalRequest = finalRequest.responseType('arraybuffer');
    delete params.header.responseType;
  }

  return finalRequest
    .set(params.header);
}

function post(url, params = defaultParams, contentType = 'application/json') {
  return request
    .post(url)
    .send(params.query)
    .set(params.header)
    .set('Accept', 'application/json')
    .type(contentType);
}

export default {
  get,
  post
};
