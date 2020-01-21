export class ManagerError extends Error{
    _error:string
    constructor(msg){
        super(`manager Error ${require("util").inspect(msg)}`);
        this._error = msg;
    }
}