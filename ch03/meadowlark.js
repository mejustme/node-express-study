var express = require('express');  // 引入express模块

var app = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars') //  映入handlebar
	.create({ defaultLayout:'main' });  //默认布局view/layout中 main, 必须在layout中
app.engine('handlebars', handlebars.engine);  //添加引擎
app.set('view engine', 'handlebars');  // 设置引擎

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));  // express 管理静态资源分发  __dirname 正在执行的脚本目录

var fortuneCookies = [
	"苹果",
	"书包",
	"mac",
	"100元",
	"滴滴打车券20元"
];

app.get('/', function(req, res) {
	res.charset =  'utf-8'; //默认编码 可html代替 <meta http-equiv="content-type" content="text/html;charset=gb2312">
	res.render('home'); // render表示传送视图home.handlebars , 原生写法 res.end('读取文件返回的数据data')
});
app.get('/prize', function(req,res){
	var randomFortune = 
		fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
	res.render('prize', { fortune: randomFortune });
});
app.get('/505', function(req,res){
	res.render('nothing');  //故意产生内部错误，返回505页面
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);  // 必须要自己写  等价原生 res.writeHead(200, {'content-Type': 'text/html'})
	res.render('404');
});


// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});
