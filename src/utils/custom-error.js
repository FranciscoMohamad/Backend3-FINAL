export default class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

//throw new CustomError("Error message", 400);