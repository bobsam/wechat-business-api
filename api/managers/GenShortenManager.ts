import { ManagerError } from '../errors/ManagerError';
import {websiteHost} from '../common/constants/genWebsiteHost';

export class GenShortenManager {
    async getUserInfo (key = 0) {
        const result = await app.services.RequestService.request({
            method: 'GET',
            url: `http://${websiteHost[key]}/user/info`
        }, {
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
        });

        return result;
    }

    async genRequestUrl (type: 'weibo' | 'qq', originUrl: string, config: any) {
        let reqUrl = '';

        if (type === 'weibo') {
            reqUrl = 'http://pay.jump-api.cn/tcn/web/test';
        } else if (type === 'qq') {
            reqUrl = 'http://pay.jump-api.cn/urlcn/web/test';
        }

        if (!reqUrl) {
            throw new ManagerError('no request url!');
        }

        const result = await app.services.RequestService.request({
            method: 'POST',
            url: reqUrl,
            paramObj: {
                url_long: originUrl,
                uid: config.uid,
                username: config.username,
                role: config.role,
                fid: config.fid,
                token: config.token,
                site_id: config.site_id
            }
        }, {
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
            others: {
                Origin: 'http://knurl.cn',
                Referer: 'http://knurl.cn/urlcn'
            }
        });

        return result;
    }

    async shortenUrlFromThirdPaty (reqUrl: string, config: any, headers?: any) {
        const method = config.method.toUpperCase() || 'GET';

        delete config.method;

        return await app.services.RequestService.request({
            method,
            url: reqUrl,
            paramObj: {
                ...config
            },
            bForm: (method as string).toUpperCase() === 'POST'
        }, {
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
            ...headers
        });
    }
}