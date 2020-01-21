export class SystemError extends Error{
    _error:string
    code:string
    constructor(msg,code){
        super(`system Error:${require("util").inspect(msg)}`);
        this._error = msg;
        this.code = code;
    }
}