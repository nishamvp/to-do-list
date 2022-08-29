const express = require("express");
const bodyParser = require("body-parser");
const { workerData } = require("worker_threads");

const app = express();

let items=[];
let workItems=[];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));



app.get("/",(req,res)=>{
    const today = new Date();
    const options = {
        weekday : "long",
        year : "numeric",
        month : "long",
        day  : "numeric"
    };
   const day= today.toLocaleDateString("en-US",options);


    res.render("list",{listTitle:day,newListItems:items});
})

app.post("/",(req,res)=>{
    let item=req.body.newItem;
    if(req.body.button==="Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
   

    
})

app.get("/work",(req,res)=>{
    res.render("list",{listTitle:"Work List",newListItems:workItems});
})

app.get("/about",(req,res)=>{
    res.render("about");
})



app.listen(3000,()=>console.log("port started at 3000")
)
