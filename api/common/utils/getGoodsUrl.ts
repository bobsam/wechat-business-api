/**
 * @Author: 小贤
 * @Date: 2020-03-01 21:31:28
 * @LastEditTime: 2020-03-01 23:41:45
 * @LastEditors: 小贤
 * @Description: 
 * @Email: gzyuboxian@corp.netease.com
 */

import {URLS} from '../constants/url';
import {AccountConfig} from '../accountConfig';
import * as qs from 'querystring';

/**
 * 生成对应端的详情页链接
 *
 * @export
 * @param {('web' | 'mp')} type
 * @returns {string}
 */
export function getGoodsUrl (type: string, user: string, id: string): string {
    let url: string = '';
    let userMsg: any = {};
    let urlSuffix: string = '';

    if (type === 'web') {
        url = id ? `${URLS.CoolbuyWebUrl}${id}/?` : '';
    } else if (type === 'mp') {
        url = id ? `${URLS.CoolbuyMpUrl}?id=${id}&` : '';
    }

    userMsg = AccountConfig[user];

    delete userMsg.chn_name;
    delete userMsg.medium_name;

    urlSuffix = qs.stringify(userMsg);

    return url && urlSuffix ? `${url}${urlSuffix}` : '';
}