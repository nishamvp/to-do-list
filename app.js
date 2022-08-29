const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items=[];
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


    res.render("list",{kindOfDay:day,newListItems:items});
})

app.post("/",(req,res)=>{
    let item=req.body.listItem;
    items.push(item);
    res.redirect("/");

    
})




app.listen(3000,()=>console.log("port started at 3000")
)
