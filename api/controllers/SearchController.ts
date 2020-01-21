import { Controller, Get, Use, Param, Body, Delete, Put, Post, QueryParam, View, Ctx, Response } from "koa-cola/client";
import Ok from '../responses/ok';
import {SearchManager} from '../managers/SearchManager';

@Controller("/api")
export default class {
    searchManager: SearchManager;

    constructor () {
        this.searchManager = new SearchManager();
    }

    @Get("/search")
    @Response(Ok)
    async searchCoolbuyGoods(@Ctx() ctx, @QueryParam() query) {
        const result = await this.searchManager.searchCoolbuyGoods(decodeURIComponent(query.g || ''));

        return result;
    }
}
