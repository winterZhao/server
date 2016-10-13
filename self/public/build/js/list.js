'use strict';

class List {
    constructor() {
        this.first = true;        //是否第一次加载该栏目下的频道;
        this.count = 0;          //当前类目下一共有多少条数据。
    }
    render() {
        this.getNav();
        $('#nav').on('click','a',(e)=>{this.clickNav(e);});
        $('#category').on('click','li',(e)=>{this.clickMenu(e);});
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
    clickNav(e) {
        $('#search-text').val('');
        this.first = true;
        var $target = $(e.target);
        if (e.target.nodeName.toLowerCase() ==='li'){
            $target = $target.find('a');
        }
        var name = $target.html();
        $target.parents('li').addClass('active').siblings('li').removeClass('active');
        this.getMenu();
        this.crumbTemplate(name);
        this.getList();
    }
    clickMenu(e) {
        $('#search-text').val('');
        this.first = true;
        var $target = $(e.target);
        if (e.target.nodeName.toLowerCase() === 'span' || e.target.nodeName.toLowerCase() === 'a'){
            $target = $(e.target).parents('li');
        }
        $target.addClass('list-group-item-info').siblings().removeClass('list-group-item-info');
        this.getList();
    }

    getNav() {
        $.ajax({
            url : 'http://localhost:202/nav',
            type : 'get'
        }).done((data)=>{
            this.navTemplate(data);
        });
    }
    navTemplate(data) {
        var str ='';
        str+='<li><a href="javascript:;"">首页</a></li>';
        for (let i = 0,r = data.length;i < r;i ++){
            var cur = data[i];
            str+=`<li><a href="javascript:;" data-id="${cur.id}">${cur.nav}</a></li>`;
        }
        $('#nav').html(str);

        var index = this.GetQueryString('id');
        if (!index) {
            index = 0;
        }
        $('#nav').find('li').eq(index).addClass('active');
        $('#nav .active a').click();

    }
    crumbTemplate(name) {
        var str = '';
        str = '<li class="active">首页</li>';
        if (name && name !=='首页') {
            str = `<li><a href="/">首页</a></li><li class="active">${name}</li>`;
        }
        $('#breadcrumb').html(str);
    }
    getMenu() {
        var nav = $('#nav .active a').html();
        $.ajax({
            url : 'http://localhost:202/menu?nav=' + nav,
            type : 'get'
        }).done((data)=>{
            this.menuTemplate(data);
        });
    }
    menuTemplate(data) {
        var str = '';
        if (data.length > 0) {
            str += '<h4>文章分类</h4>';
            str += '<ul class="list-group form-wrapper" style=\'margin-bottom:5px;\'>';
            for (let i = 0,r = data.length;i < r;i ++) {
                var cur = data[i];
                str += '<li class=\'list-group-item\'>';
                str += '<span class=\'glyphicon glyphicon-fire\'></span>&nbsp;';
                str += `<a href='javascript:;'>${cur.menu}</a>`;
                str += '</li>';
            }
            str += '</ul>';
        }

        $('#category').html(str);
    }

    getList() {
        var nav = $('#nav .active a').html();
        var menu = $('#category .list-group-item-info a').html();
        var searchText= $('#search-text').val();
        var page = $('#pagination .current a').html() || 1;
        var url = 'http://localhost:202/list?first=' + this.first + '&page='+page;
        if (searchText){
            url += '&search=' + searchText;
        } else if (menu){
            url +='&menu=' + menu;
        } else {
            url +='&category=' + nav;
        }

        $.ajax({
            url : url,
            type : 'get'
        }).done((json)=>{
            if (json.data.length >0){
                this.listTemplate(json.data);
                if (this.first){
                    this.count = json.count;
                }
                this.paginationTemplate(page);
                this.first = false;
            }
            url = window.location.origin +'?'+url.split('?')[1];
            history.pushState({},'',url);

        });
    }
    listTemplate(data) {
        var str ='';
        var nav = $('#nav li.active a').html();
        for (let i = 0,r = data.length;i < r;i ++){
            var cur = data[i];
            var date = new Date(cur.gmt_modified);
            cur.gmt_modified = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

            str += '<div class=\'list-item\'>';
            str += `<a href="/article/${cur.id}?nav=${nav}" target="_blank">`;
            str += `<h2 class="list-group-item-heading">${cur.title}</h2>`;
            str += '</a>';
            str += '<p>';
            str += '<span class=\'glyphicon glyphicon-time title=\'发布时间\'></span>&nbsp;';
            str += `<span>${cur.gmt_modified}</span>&nbsp;&nbsp;`;
            str += '<span class=\'glyphicon glyphicon-eye-open\' title=\'阅读\'></span>&nbsp;';
            str += `<span>${cur.view}</span>`;
            str += '</p>';
            str += `<p class="list-group-item-text">${cur.description}</p>`;
            str += `<a href='/article/${cur.id}?nav=${nav}'>阅读全文</a>`;
            str += '</div>';

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

new List().render();

'use strict';

const pagination = {
    init(container,obj,fn){
        this.container = container;        //jquery对象;
        this.page = obj.page;                  //当前页码;
        this.data = obj.data;
        this.fn = fn;                      //点击后触发;
        this.container.on('click','li',(e)=>{this._clickPagination(e);});
        var num = Math.ceil(obj.data/10);
        this.render(this.container,num,this.page);
    },
    render(container,num,page = 1){

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
        container.html(str);
    },
    _clickPagination(e){
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
        this.fn();
    }
};
