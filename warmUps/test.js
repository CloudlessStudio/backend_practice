//below is creating the backend server, putting the pieces together to create server
const http = require('http');
const express = require('express');
const app = express();
app.use(express.json()); //when you do a post, you will use json format 
const {check,validationResult} = require('express-validator');
const axios = require('axios');

//this is all dummy data to start the api for expenses
const categories = [
    {
        "name": "grocery",
        "description": "grocery category"
    },
    {
        "name": "takeout",
        "description": "takeout category"
    }
];

//creating a new array for the expenses page
const expenses = [
    {
        "category": "grocery",
        "note": "Needed to restock fridge",
        "date": "1/5/2023",
        "amount": 55.34
    }
    ];
//creating middleware function to check if post is using json
app.use((req, res, next) => {
    console.log(req.method);
    if (req.method == 'POST' && req.headers['content-type'] != 'application/json') {
      return res.status(400).send({ error: 'Content-Type must be set to application/json' });
    }
    next();
  });



  //declaring the function with proper naming before using it in app.use middleware or calling it on the app.get call
// const checkGeo = (req,res,next)=> {
//     const userIp = req.ip; 
//     axios.get(`https://ipapi.co/${userIp}/json`)
//     .then(response => {
//         const countryCode = response.data.country_code;
//         if(countryCode !== "US"){
//             return res.status(401).send({ error: 'You must be in the US to see this.'})
//         }
//         next();
//     })
// }

let categoriesReq = 0;
let expensesReq = 0;

const totalCallCount = (req,res,next)=> {
    let reqPath = req.path;
    if(reqPath == '/categories' && categoriesReq>10){
        return res.status(429).send({error:'You have called this path too many times, time to pay!'})
    } else if(reqPath == '/expenses' && expensesReq>5){
        return res.status(429).send({error:'You have called this path too many times, time to pay!'})
    }
    next();
}
//this below is calling the function to a specific page on server for middleware
// app.use('/categories',checkGeo);


//middleware function to check for location
// app.use((req,res,next)=>{
    // const userIp = req.ip; 
    // axios.get(`https://ipapi.co/${userIp}/json`)
    // .then(response => {
    //     const countryCode = response.data.country_code;
    //     if(countryCode !== "US"){
    //         return res.status(401).send({ error: 'You must be in the US to see this.'})
    //     }
    //     next();
    // })
// })


//below is calling the API we created above and defining data type 
//defines API, with method GET and returns list of categories 
//calling the middleware function below
// app.get('/categories', checkGeo, (req,res) =>{
//     res.setHeader('Content-Type','application/json');
//     res.send(JSON.stringify(categories));

// })

app.get('/categories', totalCallCount, (req,res) =>{
    res.setHeader('Content-Type','application/json');
    res.send(JSON.stringify(categories));

})

app.get('/expenses',totalCallCount, (req,res) =>{
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(expenses));
})

//below is for a get request for the category name, 
//if the category exists, itll show if not, they get an error
app.get('/categories/:categoriesName',(req,res) =>{
    const categoriesNameId = req.params['categoriesName'];
    console.log(categoriesNameId);
    res.setHeader('Content-Type','application/json');
    const categoryToLookFor = categories.find(c=> c.name==categoriesNameId);
    if(categoryToLookFor){
        res.send(JSON.stringify(categoryToLookFor));
    }else{
        res.status(404).send('Category not found');
    }
})

//this is allowing people to create a new category 
//and requiring something to be entered in order to run
app.post("/categories", 
    [
        check('name','Name cannot be empty').isLength({min:1}),
        check('description', 'Description cannot be empty and be less than 500 characters.').isLength({min:1, max:500})
    ],
    (req, res) => {
        const newCategoryData = req.body;
        console.log(newCategoryData);
        const existingCategoryName = categories.find((c) => c.name == newCategoryData.name);
        if (existingCategoryName) {
            res.status(400).send("Category already exists");
        } else {
            cats.push(newCategoryData);
            res.send("The Category was added successfully");
        }
    }
  
);

//this line actually creates the server
const server = http.createServer(app);

server.listen(3000,'127.0.0.1',()=>{
    console.log("Server started successfully");
})