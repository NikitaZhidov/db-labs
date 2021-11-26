export class ApiResponse {
  constructor(status = 200, body = null, errors = []) {
    this.status = status;
    this.body = body;
    this.errors = errors;
  }

  static InternalError() {
    return new ApiResponse(500, null, ['Технические неполадки']);
  }

  static BadRequest(error) {
    return new ApiResponse(400, null, [error]);
  }
}
