import {Component, OnInit} from '@angular/core';
import {Data} from '../components/common-table/data';
import {Article} from '../../../class/Article';
import {RequestObj} from '../../../class/HttpReqAndResp';

@Component({
    selector: 'app-test-common-table',
    templateUrl: './test-common-table.component.html',
    styleUrls: ['./test-common-table.component.less']
})
export class TestCommonTableComponent implements OnInit {

    /*
    * author: {id: 1, email: "a@celess.cn", displayName: "禾几海",…}
category: "前端"
dislikeCount: 0
id: 1293
likeCount: 0
open: true
original: true
publishDateFormat: "2020-03-17 01:22:35"
readingNumber: 234
summary:    a
tags: [{id: 26, name: "脚本"}, {id: 27, name: "网课"}]
title: "教你动手写一个刷课脚本"
updateDateFormat: "2020-05-27 00:55:05"*/

    // @ViewChild('tag') tagTemp: TemplateRef<any>;

    data: Data<Article>[];
    req: RequestObj;

    constructor() {
        this.data = [
            {title: '主键', fieldValue: 'id', show: false, primaryKey: true},
            {title: '标题', fieldValue: 'title', show: true},
            {title: '发布日期', fieldValue: 'publishDateFormat', show: true},
            {title: '更新日期', fieldValue: 'updateDateFormat', show: true},
            {title: '文章类型', fieldValue: 'original', show: true},
            {title: '阅读量', fieldValue: 'readingNumber', show: true},
            {title: '分类', fieldValue: 'category', show: true},
            {title: '👎数', fieldValue: 'dislikeCount', show: true},
            {title: '👍数', fieldValue: 'likeCount', show: true},
            {title: '状态', fieldValue: 'open', show: true},
            {title: '简介', fieldValue: 'summary', show: false},
            {title: '作者', fieldValue: 'author.displayName', show: true},
            {title: '标签数', fieldValue: 'tags.length', show: true},
            {
                title: '操作', fieldValue: '', show: true, isActionColumns: true,
                action: [
                    {
                        name: '新增',
                        click: (d) => console.log('新增', d)
                    }, {
                        name: '删除',
                        color: '#ff0000',
                        click: (d) => console.log('删除', d)
                    }, {
                        name: '编辑',
                        color: 'blue',
                        click: (d) => console.log('编辑', d)
                    },
                ]
            }
        ]
    }

    ngOnInit(): void {
        this.req = {
            path: '/admin/articles',
            method: 'GET',
            queryParam: {
                page: 1,
                count: 10
            }
        }
    }

}
