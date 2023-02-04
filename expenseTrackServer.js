const fetch = require('node-fetch');
const http = require('http');
const express = require('express');
const templateEngine = require('express-es6-template-engine');
const { response } = require('express');
const app = express();
//app.use(express.json());
app.engine('html',templateEngine);
app.set('views','templates');
app.set('view engine','html');
const pgp = require('pg-promise');
const pgpromise = pgp(); 
const dbConnection = pgpromise("postgress://postgres:Szafranowa1998@@localhost:5432/postgres")

let expenses_count = 0;


//check dupes function
function found(item, arr){
    let result;
    let b = JSON.stringify(item);
    for(let i = 0; i<arr.length; i++){
        let a = JSON.stringify(arr[i]);
        console.log(a);
        console.log(b);
        if(a===b){
            result = true;
        }
        else{
            result = false;
        }
    }
    console.log(result);
    return result;
}

// //categories json object array
// const categories =[
//     {
//         "name": "fuel",
//         "desc": "food for your car",
//         "icon": "fuel icon"
//     }
//     ];

// //expenses json object array
// const expenses = [
// {
//     "category": "fuel",
//     "note": "Needed to get fuel for car",
//     "date": "1/5/2023",
//     "amount": 55.34

// }
// ];
// app.use((req,res,next)=>{
//     const ip_add = req.ip;
//     fetch('https://ipapi.co/${ip_add}/json')
//     .then((r) => r.json())  //convert d for data into json obj
//     .then((response)=>{ 
//         console.log(response)  //call show name function based on data
//     })

//     const api_data = response;
//     if(api_data.country != "US"){
//         res.status(401).send('not a us ip adress');
//     }
//     else{
//         next();
//     }

// })

//expenses count check
app.use((req,res,next)=>{
if(req.path == '/expenses' && expenses_count>5){
    console.log("Too many requests");
    res.status(429).json({ message: 'Too many requests' });
}
else if(req.path == '/categories' && category_count>10){
    console.log("Too many requests");
    res.status(429).json({ message: 'Too many requests' });
}
else{
    next();
}
})


app.use((req, res, next) => {
    if (req.method === 'POST' && req.headers['content-type'] !== 'application/json') {
      res.status(400).send('Content-Type must be application/json');
    } else {
      next();
    }
  });
//get function for categories
app.get('/categories',(req,res) =>{
    
    category_count++;
    res.setHeader('Content-Type','application/json');
    res.send(JSON.stringify(categories));
})
//post function for categories
app.post('/categories', (req,res)=>{
    const catData = req.body;

    let inData = found(catData, categories);
    console.log(inData);
    if(inData){
        res.status(400).json({ message: 'Already exists' });

    }
    else{
        categories.push(catData);
        res.send("added new category");

    }

})
//post function for expenses
app.post('/expenses', (req,res)=>{
    const expData = req.body;

    let inData = found(expData, expenses);
    console.log(inData);
    if(inData){
        res.status(400).json({ message: 'Already exists' });

    }
    else{
        expenses.push(expData);
        res.send("added new category");

    }

})
//get function for expenses
app.get('/expenses',(req,res) =>{
    console.log(req.path);
    expenses_count++;
    console.log(expenses_count);
    res.setHeader('Content-Type','application/json');
    res.send(JSON.stringify(expenses));
})






const server = http.createServer(app);

server.listen(3000,'127.0.0.1',()=>{
    console.log("Expense Test Server Started!");
})


