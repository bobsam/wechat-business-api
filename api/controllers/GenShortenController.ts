import { Controller, Get, Use, Param, Body, Delete, Put, Post, QueryParam, View, Ctx, Response } from "koa-cola/client";
import Ok from '../responses/ok';
import {GenShortenManager} from '../managers/GenShortenManager';
import {ShortenType} from '../common/enums/alapiShortenType';
import {URLS, URLS_QUERY_KEYS} from '../common/constants/url';

import * as qs from 'querystring';

@Controller("/api")
export default class {
    genShortenManager: GenShortenManager;

    constructor () {
        this.genShortenManager = new GenShortenManager();
    }

    @Get("/genUrl")
    @Response(Ok)
    async generateThirdPartyUrl(@Ctx() ctx, @QueryParam() query) {
        const urlType = query.type || 'qq';
        // 用户信息
        const userInfo = await this.genShortenManager.getUserInfo(0);

        // 生成短链接
        const getReqestUrlContent = await this.genShortenManager.genRequestUrl(urlType, decodeURIComponent(query.url || ''), userInfo);

        return {
            userInfo,
            reqestUrlContent: getReqestUrlContent
        };
    }

    @Get('/genUrlByAlapi')
    @Response(Ok)
    async genUrlFromAlapi (@Ctx() ctx, @QueryParam() query) {
        const baseUrl = 'https://v1.alapi.cn'
        const reqUrl = baseUrl + '/api/url';

        return await this.genShortenManager.shortenUrlFromThirdPaty(reqUrl, {
            method: 'POST',
            url: decodeURIComponent(query.url || ''),
            type: ShortenType[decodeURIComponent(query.type || 't.cn')]
        });
    }

    @Get('/genUrlBySojson')
    @Response(Ok)
    async genUrlFromSojson (@Ctx() ctx, @QueryParam() query) {
        const baseUrl = 'http://shorturl.8446666.sojson.com';
        let reqUrl = baseUrl + '/sina/shorturl';

        if (decodeURIComponent(query.type) === 'url.cn') {
            reqUrl = baseUrl + '/qq/shorturl';
        }

        return await this.genShortenManager.shortenUrlFromThirdPaty(reqUrl, {
            method: 'GET',
            url: decodeURIComponent(query.url || '')
        });
    }

    @Get('/getCoolbuyWebUrl')
    @Response(Ok)
    async getCoolbuyWebUrl (@Ctx() ctx, @QueryParam() query) {
        const type = decodeURIComponent(query.type || '');
        let url = '';
        let urlQuery: unknown = {};

        if (type === 'web') {
            url = URLS.CoolbuyWebUrl;
        } else if (type === 'mp') {
            url = URLS.CoolbuyMpUrl;
        }

        // URLS_QUERY_KEYS.forEach(item => {
        //     urlQuery[item]
        // })
    }
}
