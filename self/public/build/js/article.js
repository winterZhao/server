'use strict';

class Article {
    constructor() {

    }
    render() {
        var s = $('#content').text();
        $('#content').html(s);
        this.getNav();
    }
    GetQueryString(name) {
        var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if(r != null){
            return  decodeURI(r[2]);
        }
        return null;
    }
    getNav() {
        $.ajax({
            url : 'http://api.zhaoleilei.cn/self/nav',
            type : 'get'
        }).done((data)=>{
            this.navTemplate(data);
        });
    }
    navTemplate(data) {
        var str ='';
        str+='<li><a href="/" target=\'_blank\'>首页</a></li>';
        for (let i = 0,r = data.length;i < r;i ++){
            var cur = data[i];
            str+=`<li><a href='/?id=${cur.id}' target='_blank' data-id="${cur.id}">${cur.nav}</a></li>`;
        }
        $('#nav').html(str);
        var curNav = this.GetQueryString('nav');
        $('#nav li').each(function(index){
            var navTitle = $(this).find('a').html();
            if (navTitle == curNav){
                $('#nav').find('li').eq(index).addClass('active');
            }
        });
    }
}

new Article().render();
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
