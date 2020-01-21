import * as Koa from "koa";
import { ManagerError } from "../errors/ManagerError";
import { SystemError } from "../errors/SystemError";
import ParamError from "../errors/ParamError";

export default function() {
    return async (ctx : Koa.Context, next) => {
        try{
            await next();
        }catch(data){
            if(data instanceof ManagerError){
                app.logger.error(data);
                ctx.body = {
                    code : -999,
                    errorMsg : data._error 
                };
            }else if(data instanceof SystemError){
                app.logger.error(data);
                ctx.body = {
                    code : data["code"],
                    errorMsg : data._error 
                };
            }else if(data instanceof ParamError){
                app.logger.error(data);
                ctx.body = {
                    code : -777,
                    errorMsg : data._error 
                };
            }else{
                app.logger.error(data);
                ctx.body = {
                    code : -1,
                    errorMsg : data 
                };
            }
        }
    }
};