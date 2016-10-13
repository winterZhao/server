### 0908
1. 布置基本框架;
2. 增加icon
```
//layout
<!--显示在窗口中-->
<link rel="Shortcut Icon" href="/images/favicon.ico"/>
<!--显示在收藏夹中-->
<link rel="Bookmark" href="/images/favicon.ico"/>
```
3. dust的 {>}引入{+}{<}用法;


### 0910
1. 问题: 如何在双重for循环中使用yield ???  co?
2. 必须加bodyparser,否则this.request.body为undefined;
3. 字符串模板引擎和dust冲突;

### 0912
1. 状态码204;
2. jsonp koa跨域 : 要求前后端保持callback的名称一致,即'jQuery22404633884190616875_1473668518189';这里前端传一个?，jquery会自动将?转换为某个随机值，后端获取这个随机值作为返回的json名称;里头的值用`JSON.stringify()处理`;

3. koa-cors  【几个options的意思】;
```js
//引入koa-cors;

// app.use(cors());
---
router.get('/data3',cors({origin:'http://localhost:63342'}),function*(){
    this.body = {"result":false,"hello":'world'};
})
```
4. markdown
代码块
第一种：简单文字出现一个代码框。使用`<blockquote>`。（`不是单引号而是左上角的ESC下面~中的`）
第二种：大片文字需要实现代码框。使用Tab和四个空格。


### 0914
1. node生成图片验证码  png-word

### 0918
1. markdown =>html;
html = > markdown；
2. 明天 search部分和分页;