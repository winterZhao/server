'use strict';

class Edit {
    constructor() {
        this.first = true;        //是否第一次加载该栏目下的频道;
        this.count = 0;          //当前类目下一共有多少条数据。
    }
    render() {
        this.getList();
        $('#search').on('click',()=>{this.clickSearch();});
        $('#pagination').on('click','li',(e)=>{this.clickPage(e);});

    }
    GetQueryString(name) {
        var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if(r != null){
            return  decodeURI(r[2]);
        }
        return null;
    }
    clickSearch() {
        this.first = true;
        $('#breadcrumb').html('<li><a href="/">首页</a></li><li class="active">搜索</li>');
        this.getList();
    }

    getList() {

        var searchText= $('#search-text').val();
        var page = $('#pagination .current a').html() || 1;
        if (this.first)page = 1;
        var url = 'http://localhost:202/list?first=' + this.first + '&page='+page;
        if (searchText){
            url += '&search=' + searchText;
        } else {
            url += '&category=首页';
        }


        $.ajax({
            url : url,
            type : 'get'
        }).done((json)=>{
            $('#list-group').html('');
            $('#pagination').html('');
            if (json.data.length >0){
                this.listTemplate(json.data);
                if (this.first){
                    this.count = json.count;
                }
                this.paginationTemplate(page);
                this.first = false;
            }

        });
    }
    listTemplate(data) {
        var str ='';
        str += '<tr class=\'success\'><th>ID</th><th>标题</th><th>浏览量</th><th>编辑</th></tr>';

        for (let i = 0,r = data.length;i < r;i ++){
            var cur = data[i];

            str += '<tr>';
            str += `<td>${cur.id}</td>`;
            str += `<td>${cur.title}</td>`;
            str += `<td>${cur.view}</td>`;
            str += `<td><a href='/admin/increase?id=${cur.id}'>编辑</a></td>`;
            str += '</tr>';

        }
        $('#list-group').html(str);
    }
    paginationTemplate(page) {
        var data = this.count;
        var num = Math.ceil(data/10);
        page = Number(page);

        var str = '';
        str += `<ul class="pagination" data-num=${page}>`;
        str += '<li id="prev"><a href="javascript:;">&laquo;</a></li>';
        if (num <= 12) {
            for (let i = 1,r = num;i <= r;i ++) {
                if (i === page){
                    str += `<li class="current"><a href="javascript:;">${i}</a></li>`;
                } else {
                    str += `<li><a href="javascript:;">${i}</a></li>`;
                }

            }
        } else if (num > 12) {
            if (page < 7){
                for (let i = 1;i < 10;i ++) {
                    if (i === page){
                        str += `<li class="current"><a href="javascript:;">${i}</a></li>`;
                    } else {
                        str += `<li><a href="javascript:;">${i}</a></li>`;
                    }

                }
                str += `<li><a href="javascript:;">…</a></li><li><a href="javascript:;">${num}</a></li>`;
            } else if (page >= 7 && page <= num - 6 ) {
                str += '<li><a href="javascript:;">1</a></li><li><a href="javascript:;">…</a></li>';

                for (let i = page - 3; i < page + 4; i ++){
                    if (i === page){
                        str += `<li class="current"><a href="javascript:;">${i}</a></li>`;
                    } else {
                        str += `<li><a href="javascript:;">${i}</a></li>`;
                    }
                }
                str += `<li><a href="javascript:;">…</a></li><li><a href="javascript:;">${num}</a></li>`;
            } else if (page > num - 6 && page <= num ){
                str += '<li><a href="javascript:;">1</a></li><li><a href="javascript:;">…</a></li>';
                for (let i = page - 3; i <= num; i ++){
                    if (i === page){
                        str += `<li class="current"><a href="javascript:;">${i}</a></li>`;
                    } else {
                        str += `<li><a href="javascript:;">${i}</a></li>`;
                    }
                }
            }
        }

        str += '<li id = \'next\'><a href="javascript:;">&raquo;</a></li>';
        str += '</ul>';
        $('#pagination').html(str);

    }
    clickPage(e) {
        var $target = $(e.target);
        if (e.target.nodeName.toLowerCase() === 'a'){
            $target = $(e.target).parent('li');
        }
        var oLis = $('#pagination li');
        var index;
        if ($target.attr('id') === 'prev'){
            index = $('#pagination .current').index();
            if (index < 2)index = 2;
            oLis.eq(index-1).addClass('current').siblings('li').removeClass('current');

        } else if ($target.attr('id') === 'next'){
            index = $('#pagination .current').index();
            var length = oLis.length;
            if (index > length - 3)index = length - 3;
            oLis.eq(index+1).addClass('current').siblings('li').removeClass('current');
        } else {
            $target.addClass('current').siblings('li').removeClass('current');
        }

        this.getList();
    }
}

new Edit().render();
