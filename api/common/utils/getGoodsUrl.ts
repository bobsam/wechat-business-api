/**
 * @Author: 小贤
 * @Date: 2020-03-01 21:31:28
 * @LastEditTime: 2020-03-02 21:00:13
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

    const newUserMsg = Object.assign({}, userMsg);

    delete newUserMsg.chn_name;
    delete newUserMsg.medium_name;

    urlSuffix = qs.stringify(newUserMsg);

    return url && urlSuffix ? `${url}${urlSuffix}` : '';
}