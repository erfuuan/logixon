export default {
  error(response, status, error, message) {
    const res = {
      status: status.toString(),
      error: error ? error : undefined,
      message: message ? message : undefined
    };
    return response.status(status).send(res);
  },

  success(response, data, message) {
    const res = {
      status: '200',
      message: message ? message : undefined,
      data: data ? data : undefined,
    };
    return response.status(200).send(res );
  },

  created(response, data, message) {
    const res = {
      status: '201',
      message: message ? message : undefined,
      data: data ? data : undefined,
    };
    return response.status(200).send(res );

  },

  conflict(response, data, message) {
    const res = {
      status: '409',
      error: "conflict",
      message: message ? message : undefined,
      data: data ? data : undefined,
    };
    return response.status(409).send(res );
  },

  internal(response, error) {
    const res = {
      status: '500',
      error: 'internal',
      message: process.env.NODE_ENV === 'production' ? 'unknown_internal_error' : error,
    };
    return response.status(500).send(res);
  },

  internalErr(response, message) {
    const res = {
      status: '500',
      error: 'internal_server_error',
      message: message ? message : "Sorry!, Something went wrong",
    };
    return response.status(500).send(res);
  },

  notFound(response, data, message) {
    const res = {
      status: '404',
      error: 'not_found',
      message: message ? message : undefined,
      data: data ? data : undefined
    };
    return response.status(404).send(res);
  },

  badRequest(response, data, message) {
    const res = {
      status: '400',
      error: 'bad_request',
      message: message ? message : undefined,
      data: data ? data : undefined,
    };
    return response.status(400).send(res);
  },

  queued(response) {
    const res = {
      status: 'queued',
    };
    return response.status(200).send(res );
  },


  unauthorized(response, data, message) {
    const res = {
      status: '401',
      error: 'unauthorized',
      message: message ? message : undefined,
      data: data ? data : undefined
    };
    return response.status(401).send(res);
  },

  forbidden(response, data, message) {
    const res = {
      status: '403',
      error: 'forbidden',
      message: message ? message : undefined,
      data: data ? data : undefined,
    };
    return response.status(403).send(res);
  },

  notAcceptable(response, error) {
    const res = {
      status: '406',
      error: 'not_acceptable',
      message: error,
    };
    return response.status(406).send(res);
  },

  canceled(response, error) {
    const res = {
      status: '499',
      error: 'canceled',
      message: error
    }
    return response.status(499).send(res)
  }
};