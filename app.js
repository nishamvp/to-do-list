const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));

mongoose.connect("mongodb://localhost:27017/todolistDB")

const itemsSchema= new mongoose.Schema({
    name:String
});

const Item=mongoose.model("Item",itemsSchema);

const item1= new Item({
    name:"Welcome to your todolist!"
});

const item2= new Item({
    name:"Hit the + button to add a new item"
});
const item3= new Item({
    name:"<-- Hit this to delete item"
});

const defaultItem=[item1,item2,item3];

Item.insertMany(defaultItem,function(err,item){
    if(err){
        console.log(err);
    }else{
        console.log("successfully inserted docs");
    }
});

app.get("/",(req,res)=>{

   Item.find({},function(err,foundItems){
    console.log(foundItems);
    res.render("list",{listTitle:"Today",newListItems:foundItems});

   })
    
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



app.listen(process.env.PORT || 3000,()=>console.log("port started at 3000")
)
