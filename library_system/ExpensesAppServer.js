const fetch = require('node-fetch');
const http = require('http');
const express = require('express');
const templateEngine = require('express-es6-template-engine');
const { response } = require('express');
const app = express();
app.use(express.json());
app.engine('html',templateEngine);
app.set('views','templates');
app.set('view engine','html');
const pgp = require('pg-promise');
const pgpromise = pgp(); 
const dbConnection = pgpromise("postgress://postgres:Szafranowa1998@@localhost:5432/postgres")

app.get('/categories',(req,res)=>{
    dbConnection.any("select * from dc_cost_app.categories").then((categories)=>{
        res.send(categories);
        console.log(categories);
    })

})

app.post('/categories', (req,res)=>{
    const catData = req.body;
    console.log(catData);
    dbConnection.none("Insert into dc_cost_app.categories (category_name, description, icon) values ($1,$2,$3)",
    [catData.catName, catData.description, catData.icon]);

    res.status(201).send("Expenses added succesfully!");
})

app.put('/categories/:id', (req,res)=>{
    const id = req.params['id'];
    const catData = req.body;
    dbConnection.none("Update dc_cost_app.categories set category_name = $1, description =$2, icon=$3 where categories_id=$4",
    [catData.catName, catData.description, catData.icon, id])
    res.status(200).send("book updated");

})

app.delete('/categories/:id', (req,res)=>{
    const id = req.params['id'];
    dbConnection.oneOrNone("select * from dc_cost_app.categories where categories_id =$1",[id]).then((categories)=>{
        if(categories){
            dbConnection.none("Delete from dc_cost_app.categories where categories_id =$1",
            [id])
            res.status(200).send("category deleted");
        }else{
            res.status(404).send("category not found")
        }
    });
})


const server = http.createServer(app);
server.listen(3000, '127.0.0.1', ()=>{
    console.log("Expense App Server Started");
})