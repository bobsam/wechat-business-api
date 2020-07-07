const requestP = require("request-promise-native");

export default {
    request: async (requestParam: { url: string, paramObj?: object, method: string, bForm?: boolean }, requestHeader?: { userAgent?: string, contentType?: string, others?: any}) => {
        let result = null;
        let method = requestParam.method || 'GET';

        try {
            let options = {
                url: requestParam.url,
                method,
                timeout: 10000,
                json: true
            }
    
            if (requestParam.paramObj && !requestParam.method) {
                method = 'POST';
            }
    
            if (requestParam.bForm) {
                options["headers"] = { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" };
    
                if (method === "POST") {
                    options["form"] = requestParam.paramObj;
                }

                delete options.json;
            } else {
                if (method === "POST") {
                    options["body"] = requestParam.paramObj;
                } else {
                    options['qs'] = requestParam.paramObj;
                }
            }
    
            options.method = method;

            if (requestHeader && requestHeader.userAgent) {
                options["headers"] = {
                    ...options["headers"],
                    'User-Agent': requestHeader.userAgent
                }
            }

            if (requestHeader.contentType && requestHeader.contentType === 'text/html') {
                options["headers"] = {
                    ...options["headers"],
                    'Content-Type': requestHeader.contentType
                }

                delete options.json;
            }

            if (requestHeader.others) {
                options["headers"] = {
                    ...options["headers"],
                    ...requestHeader.others
                }
            }
    
            result = await requestP(options);
    
            app.logger.info('[request success info:]' + requestParam.url, { paramObj: requestParam.paramObj, method, result, requestHeader });
    
            return typeof result === 'string' && result !== '' ? JSON.parse(result) : result;
        } catch (error) {
            console.error(error);
            app.logger.error("[request error info:]" + requestParam.url, { paramObj: requestParam.paramObj, method: method, error, requestHeader });
            throw error.error;
        }
    }
};