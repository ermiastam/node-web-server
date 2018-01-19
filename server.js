const express = require('express');
const hbs = require('hbs'); // express.js view engine called handlebars.js is required
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); //used to register partials

app.set('view engine', 'hbs'); //""set" sets express related configuration,(key,value)
/*
app.set('views', './views') This defaults to the views directory in the application root directory,
so no need to write it explicitly.
*/
//app.use(express.static(__dirname + '/public')); //__dirname takes us to the project folder
                                                //is a middle ware
 app.use((req,res,next)=>{//unless next is clalled, the handlers(get,post) will not be fired
 var now = new Date().toString();
 var log = `${now} ${req.method} ${req.url} `
 console.log(log);
 fs.appendFile('server.log',log+'\n',(err)=>{
if(err){
console.log('Unable to append to Server.log');
}
 });
    next();
 });  
 
 /*
 app.use((req,res,next)=>{
res.render('maintenance');
 });
 */
app.use(express.static(__dirname + '/public'));//__dirname takes us to the project folder
                                            //is a middle ware
app.use(express.static(__dirname));
                                            
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('toUpperCase',(text)=>{//toUpperCase is used in welcome page
return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name:"Ermias",
    //     likes:["movie","football"]
    // });
    res.render('welcome', {
        welComeMsg: "Wel Come to my web site",
        pageTitle: 'Home Page',
       // currentYear: new Date().getFullYear()

    });
});


app.get('/about', (req, res) => {
    //res.send('<h1>Hello Express</h1>');// renders html tag
    //  res.send('About Page'); //renders text to html page
    // res.render('about');//having the 'hbs' extension is optional here(about.hbs)
    res.render('about.hbs', {
        pageTitle: 'About Page',
       // currentYear: new Date().getFullYear()
    })
    res
});

app.get('/projects',(req,res)=>{
res.render('projects',{
    pageTitle: 'Projects Page', 
});
});

app.get('/bad', (req, res) => {
    //res.send('<h1>Hello Express</h1>');
    res.send({
        error: "unable reach the site."
    });
});
//app.listen(3000);

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});