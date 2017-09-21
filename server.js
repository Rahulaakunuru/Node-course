const fs = require('fs');

var express = require('express');
var hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (welcomeMessage) => {
	return welcomeMessage.toUpperCase();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = now+':'+req.method+' '+req.url;
    fs.appendFile('server.log', log+'\n', (err) => {
        if(err)
        console.log('Unable to append to log sever');
    });
    console.log(log);
    next();
});
app.use((req, res, next) => {
    res.render('maintainance');
});

app.get('/', (req, res) => {
	res.send({name: 'Rahul'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs',{
		pageTitle: 'About',
		aboutContent: 'Content of the page'
	})
})

app.get('/home',(req, res) => {
	res.render('home.hbs',{
		pageTitle: 'Home',
		welcomeMessage: 'Welcome to my Website!!'
	})
});
app.listen(3000);