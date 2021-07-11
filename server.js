const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

require('dotenv').config();



let KEY=process.env.KEY;

let CONNECTION_URL=`mongodb+srv://Istvan2nd:${KEY}@cluster0.tu1pu.mongodb.net/JSwikiDB?retryWrites=true&w=majority`;

mongoose.connect(CONNECTION_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useFindAndModify", false);

const itemsSchema = new mongoose.Schema({
    newText: String,
    newPara:String
  });

var Item=mongoose.model("Item",itemsSchema)

var doc1 = new Item({ newText: "newTexts",
newPara:"newPara" });

app.get("/", (req, res) => {
 
 Item.find({},function(err,foundItems){
  // bug here !!! last element was not possible 
  // to delete training operated with preset elements
if (foundItems.length===0 && !"/delete"){
doc1.save(function(err, doc) {
    if (err) return console.error(err);
    console.log("Document inserted succussfully!");
  });
}else{ res.render("wiki", { newText: foundItems, newPara: foundItems});
}

});

});



app.post("/", function (req, res) {
  newText = req.body.newText;
  newPara = req.body.newPara;
 
  const item= new Item({
    newText:newText,
    newPara:newPara
  });
  item.save()   


  res.redirect("/");
});
// delete block
app.post("/delete",function (req,res){
  const deleteItemId=req.body.delete;
  console.log(deleteItemId)
  Item.findByIdAndDelete(deleteItemId,function(err){
    if(!err){
      console.log("Delete functionality is working");
            res.redirect("/"); 
    }
  });  
}); 


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
