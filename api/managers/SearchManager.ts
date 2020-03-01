import * as qs from 'querystring';
import { ManagerError } from '../errors/ManagerError';

export class SearchManager {
    async searchCoolbuyGoods (text: string) {
        // 先假定搜索结果只有1页
        let requestParams = {
            query: text,
            hitsPerPage: 2000,
            page: 0,
            attributesToHighlight: ["title"],
            facets: '*',
            facetFilters: ["status: -off_shelf","status: -deleted"],
            numericFilters: ["mchid=1"]
        };

        const result = await app.services.RequestService.request({
            method: 'POST',
            url: 'https://7tn0u2fl3q-dsn.algolia.net/1/indexes/prod_canton_product/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.29.0&x-algolia-application-id=7TN0U2FL3Q&x-algolia-api-key=a65c81d3dc71fd11eb7a1d6fbc57f9f9',
            paramObj: {
                params: qs.stringify(requestParams)
            }
        }, {
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
        });
        
        return result;
    }

    async getCoolbuyGoodsDetail (id: string) {
        if (!id) {
            throw new ManagerError('没有商品id！');
        }

        let requestParams = {
            img_size: 'large'
        };

        const result = await app.services.RequestService.request({
            method: 'GET',
            url: `https://coolbuy.com/api/v1.4/product/${id}/`,
            paramObj: {
                params: qs.stringify(requestParams)
            }
        }, {
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
            referer: 'https://coolbuy.com/product/detail/7452/?utm_source=xiaojj&utm_medium=pengyouquan&affid=NfIthH',
            pragma: 'no-cache',
            'cache-control': 'no-cache'
        });
        
        return result;
    }
}