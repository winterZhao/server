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
            url : 'http://localhost:202/nav',
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