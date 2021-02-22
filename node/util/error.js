// 自定义请求错误对象，带有code

class RequestError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

exports.RequestError = RequestError;
