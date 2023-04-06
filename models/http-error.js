class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    //The message property is available in the Error class, which is inherited here. With super(message), we give the Error the needed argument and thus that property is now available in the HttpError too.
    this.code = errorCode;
  }
}

module.exports = HttpError;
