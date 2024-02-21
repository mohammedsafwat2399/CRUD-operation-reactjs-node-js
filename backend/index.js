const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("user", schemaData);
//  mongodb
console.log(process.env.MONGODB_URL);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to databes"))
  .catch((error) => console.log(error));
// read api
// http://localhost:8000/
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});
// create data // save data in mongodb 
// http://localhost:8000/create
// name
// email
// mobile

app.post("/create", async (req, res) => {
  const data = new userModel(req.body);
  await data.save();
  console.log(req.body);
  res.json({ success: true, message: "data save successfuly", data: data });
});
// update data 
// http://localhost:8000/update
// {
//   name
// email
// mobile  
 //  _id
// }

app.put("/update", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;
  console.log(rest);
  const data = await userModel.updateOne({ _id: req.body._id }, rest);
  res.send({ success: true, message: "data upbdate successfuly", data: data });
});
// delete data 
// http://localhost:8000//delete/id
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await userModel.deleteOne({ _id: id });
  res.send({ success: true, message: "data delete successfuly", data: data });
});

app.listen(PORT, () => console.log("server side"));
