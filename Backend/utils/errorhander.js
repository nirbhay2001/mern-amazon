class ErrorHandler extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode = statuscode;

        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = ErrorHandler



/*

    1. The Error.captureStackTrace method in the ErrorHandler constructor captures the stack trace, excluding the ErrorHandler constructor itself.
    2. When you create an instance of ErrorHandler, the stack trace will reflect the point in your code where the instance was created, making it easier to trace the origin of the error.



*/