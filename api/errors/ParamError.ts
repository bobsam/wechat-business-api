class ParamError extends Error{
    _error:string
    constructor(errorObj){
        super();
        this.message = "参数错误";
        this._error = errorObj;
        this.name = "ParamError";
    }
}
export default ParamError;