const mongoose = require("mongoose");
const NewItems = require("../models/NewItems");

module.exports = (app) => {
  app.post("/api/newitems/add", (req, res) => {
    const addnewItem = async () => {
      try {
        const document = new NewItems({
          _id: new mongoose.Types.ObjectId(),
          title: req.body.title,
          description: req.body.description,
          content: req.body.content,
          postedBy: req.body.postedBy,
        });
        await document.save();
        res.send("News added successfully");
      } catch (error) {
        res.status(400).send(error);
      }
    };
    addnewItem();
  });
  app.get("/api/getallnewitems", (req, res) => {
    const getAllNewItems = async () => {
      try {
        const items = await NewItems.find().sort({ createdAt: -1 });
        res.send(items);
      } catch (error) {
        res.status(400).send(error);
      }
    };
    getAllNewItems();
  });
  app.get("/api/newdescription/:id", (req, res) => {
    const descriptionById = async () => {
      try {
        const data = await NewItems.findById({ _id: req.params.id });
        console.log(data);
        res.send(data);
      } catch (error) {
        res.status(400).send(error);
      }
    };
    descriptionById();
  });
  app.get("/api/getItemByUser/:id", (req, res) => {
    const getItemByUser = async () => {
      try {
        const items = await NewItems.find({ "postedBy.userid": req.params.id });
        res.send(items);
      } catch (error) {
        res.status(404).send(error);
      }
    };
    getItemByUser();
  });
  app.post("/api/news/edit", (req, res) => {
    const updateById = async () => {
      const itemUpdated = new NewItems({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        postedBy: req.body.postedBy,
      });
      try {
        await NewItems.updateOne({ _id: req.body.id }, itemUpdated);
        res.send("Update successed");
      } catch (error) {
        res.status(400).send(error);
      }
    };
    updateById();
  });
  app.post("/api/news/delete", (req, res) => {
    const deleteById = async () => {
      try {
        await NewItems.deleteOne({ _id: req.body.id });
        res.send("news has been deleted with success");
      } catch (error) {
        res.status(400).send(error);
      }
    };
    deleteById();
  });
};
