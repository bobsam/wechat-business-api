import { Controller, Get, Use, Param, Body, Delete, Put, Post, QueryParam, View, Ctx, Response } from "koa-cola/client";
import Ok from '../responses/ok';
import {GenShortenManager} from '../managers/GenShortenManager';
import {ShortenType} from '../common/enums/alapiShortenType';
import {getGoodsUrl} from '../common/utils/getGoodsUrl';
import {AccountConfig} from '../common/accountConfig';

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

    /**
     * 从https://www.mynb8.com/生成短链接
     *
     * @param {*} ctx
     * @param {*} query
     * @returns
     */
    @Get('/genUrlByMynb8')
    @Response(Ok)
    async genUrlFromMynb8 (@Ctx() ctx, @QueryParam() query) {
        const baseUrl = 'https://www.mynb8.com'
        const reqUrl = baseUrl + '/api3/urlcn.html';

        return await this.genShortenManager.shortenUrlFromThirdPaty(reqUrl, {
            method: 'GET',
            long_url: decodeURIComponent(query.url || ''),
            appkey: '7a429a09ceaa0e3ace92e7c0e03a6a22'
        });
    }

    /**
     * 从https://api.tool.dute.me/生成短链接
     *
     * @param {*} ctx
     * @param {*} query
     * @returns
     */
    @Get('/genUrlByDute')
    @Response(Ok)
    async genUrlFromDute (@Ctx() ctx, @QueryParam() query) {
        const baseUrl = 'https://api.tool.dute.me'
        const reqUrl = baseUrl + '/tool/urlShorten';

        return await this.genShortenManager.shortenUrlFromThirdPaty(reqUrl, {
            method: 'GET',
            url: decodeURIComponent(query.url || ''),
            action: 'shorten',
            strategy: 'QqUrlShorten'
        });
    }

    /**
     * 从alapi生成短链接
     *
     * @param {*} ctx
     * @param {*} query
     * @returns
     */
    @Get('/genUrlByAlapi')
    @Response(Ok)
    async genUrlFromAlapi (@Ctx() ctx, @QueryParam() query) {
        const baseUrl = 'https://v1.alapi.cn'
        const reqUrl = baseUrl + '/api/url';

        return await this.genShortenManager.shortenUrlFromThirdPaty(reqUrl, {
            method: 'POST',
            url: decodeURIComponent(query.url || ''),
            type: ShortenType[decodeURIComponent(query.type || 't.cn')],
            format: 'json'
        });
    }

    /**
     * 从Sojson生成短链接
     *
     * @param {*} ctx
     * @param {*} query
     * @returns
     */
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
    getCoolbuyWebUrl (@Ctx() ctx, @QueryParam() query) {
        const type = decodeURIComponent(query.type || '');
        const user = decodeURIComponent(query.user || '');
        const id = decodeURIComponent(query.id || '');

        let url = getGoodsUrl(type, user, id);

        return url;
    }

    @Get('/getCoolbuyAccount')
    @Response(Ok)
    getAccountConfig (@Ctx() ctx, @QueryParam() query) {
        return AccountConfig;
    }
}
