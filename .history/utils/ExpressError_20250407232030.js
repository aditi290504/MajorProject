class ExpressError extends Error
super{
    constructor(statusCode,  message){
        this.statusCode = statusCode;
        this.message= message;
    }
}