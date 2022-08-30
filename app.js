const express = require("express");
const bodyParser = require("body-parser");
const date =require(__dirname+"/date.js")
const app = express();

const items=[];
const workItems=[];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));



app.get("/",(req,res)=>{
    
    const day=date.getDate();
    res.render("list",{listTitle:day,newListItems:items});
})

app.post("/",(req,res)=>{
    const item=req.body.newItem;
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



app.listen(3000,()=>console.log("port started at 3000")
)
