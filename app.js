const http = require('http');
const express = require('express');
const templateEngine = require('express-es6-template-engine');
const app = express();
app.engine('html',templateEngine);
app.set('views','templates');
app.set('view engine','html');

const apiCode = ["digitalcrafts"];

//middleware func
app.use((req,res,next)=>{
    console.log("request received.","type: "+req.method, "protocol: "+req.protocol, "path: "+req.path,"ip: "+ req.ip);
    next();
})

app.use((req, res ,next)=>{
    const apiKey = req.headers['api-key'];
    if (!apiKey) {
        return res.status(401).send('API key is missing');
      }
      if (apiKey !== 'digitalcrafts') {
        return res.status(401).send('Invalid API key');
      }
      next();
})

const cats = [
    {
        "id":"abys",
        "name":"absynian"
    },
    {
        "id":"abys1",
        "name":"absynian one"
    }
]




app.get('/',(req,res)=>{
    console.log(req.headers);

    res.render('home',{
        partials:{
            header: "partials/header",
            footer: "partials/footer"
        }
    });
})


app.get('/cats',(req,res) =>{

    res.render('catlist',{
        locals:{
            cats
        },
        partials:{
            header: "partials/header"
        }
    });
})

app.get('/cats/:catId',(req,res) =>{
    const catId = req.params['catId'];
    const cat = cats.find(c => c.id == catId);
    res.render('catinfo',{
        locals:{
            cat
        }
    });
})

const server = http.createServer(app);
server.listen(3000,'127.0.0.1',()=>{
    console.log('Server started');
});