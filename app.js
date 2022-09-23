const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash")
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

const listSchema={
    name: String,
    items:[itemsSchema]
};
const List=mongoose.model("List",listSchema);


app.get("/",(req,res)=>{
   Item.find({},function(err,foundItems){
    if(foundItems.length===0){
        Item.insertMany(defaultItem,function(err,item){
            if(err){
                console.log(err);
            }else{
                console.log("successfully inserted docs");
            }
        });
        res.redirect("/")
    }else{
        res.render("list",{listTitle:"Today",newListItems:foundItems});
    }

   })  
})

app.get("/:customListName",function(req,res){
   const customListName= _.capitalize(req.params.customListName);

   List.findOne({name:customListName},function(err,foundList){
    if(!err){
        if(!foundList){
            // create a new list
            const list=new List({
                name:customListName,
                items:defaultItem
               });
               list.save();
               res.redirect("/"+customListName)
            
        }else{
            // show existing list
            res.render("list",{listTitle:foundList.name,newListItems:foundList.items});
        }
        
    }
    
   });

  
});


app.post("/",(req,res)=>{
    const itemName=req.body.newItem;
    const listName=req.body.list; 

    const item = new Item({
        name:itemName
    });

    if(listName === "Today"){
        item.save();
        res.redirect("/");
    }else{
        List.findOne({name:listName},(err,foundList)=>{
           foundList.items.push(item);
           foundList.save();
           res.redirect("/"+listName);
        });
    }

    
    
});

app.post("/delete",(req,res)=>{
    const checkboxId= req.body.checkbox;
    const listName= (req.body.listName);

    if(listName==="Today"){
        Item.findByIdAndRemove(checkboxId,(err)=>{
            if(!err){
                console.log("Successfully removed item with id:"+checkboxId);
            }
            res.redirect("/")
        })
    }else{
        List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkboxId}}},function(err,foundList){
            if(!err){
                res.redirect("/"+listName);
            }
        })
    }
   
   
})



app.listen(process.env.PORT || 3000,()=>console.log("port started at 3000")
)
