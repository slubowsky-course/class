export class AppError extends Error {
  constructor(code, message, { retryable = false, retryAfterSec = null } = {}) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.retryable = retryable;
    this.retryAfterSec = retryAfterSec;
  }
}
