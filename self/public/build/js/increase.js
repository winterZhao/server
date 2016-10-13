'use strict';

class Article {
    render() {
        var id = this.GetQueryString('id');
        if (id){
            this.getContent();
        } else {
            this.changeNav();
        }


        $('#transfer').on('click',()=>{this.transfer();});
        $('#send').on('click',()=>{this.sendArticle();});
    }
    GetQueryString(name) {
        var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if(r != null){
            return  decodeURI(r[2]);
        }
        return null;
    }
    getContent() {
        var id = this.GetQueryString('id');
        if (id){
            $.ajax({
                url : 'http://localhost:202/content?id='+id,
                type : 'get'
            }).then((json)=>{
                if (json.id){
                    $('#title').val(json.title).data('menu',json.menu);
                    $('#description').val(json.description);
                    $('#content').val(toMarkdown(json.content));
                    $('#nav option').each(function(index,item){
                        if ($(this).html() === json.nav){
                            $(this).attr('selected',true);
                            return;
                        }
                    });
                    this.changeNav();
                }
            });
        }

    }
    transfer() {
        var text = $('#content').val();
        text = markdown.toHTML(text);
        $('#html-content').html(text);
    }
    changeNav() {
        this.getMenu();
        $('#nav').change(()=>{
            this.getMenu();
        });
    }
    getMenu() {
        var nav = $('#nav').val();
        $.ajax({
            url : '/admin/increase/menu?nav='+nav,
            type : 'get'
        }).then((json)=>{
            if (json.success){
                var str;
                for (let i = 0,r = json.data.length; i < r; i++) {
                    let cur = json.data[i];
                    str += '<option data-id=\''+ cur.id +'\'>' + cur.menu +'</option>';
                }
                $('#menu').html(str);
                var s = $('#title').data('menu');
                if (s){
                    $('#menu option').each(function(){
                        if ($(this).html() === s){
                            $(this).attr('selected',true);
                            return;
                        }
                    });
                }
            }
        });
    }
    sendArticle() {
        var obj = {};
        obj.title = $('#title').val();
        obj.content = $('#html-content').html();
        obj.description = $('#description').val();
        obj.view = 0;
        obj.nav = $('#nav').val();
        obj.nav_url = $('#nav option:selected').data('url');
        obj.menu = $('#menu').val();
        obj.menu_id = $('#menu option:selected').data('id');
        $.ajax({
            url : '/admin/increase',
            type : 'POST',
            data : obj
        }).done((json)=>{
            if (json.success){
                alert('发布成功');
                location.reload();
            } else {
                alert(json.msg);
            }
        }).fail(()=>{
            alert('网络错误,请重试!');
        });
    }
}
new Article().render();