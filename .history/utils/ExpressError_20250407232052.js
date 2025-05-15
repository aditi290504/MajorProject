class ExpressError extends Error{
    sup

    constructor(statusCode,  message){
        this.statusCode = statusCode;
        this.message= message;
    }
}