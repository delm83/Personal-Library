/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

module.exports = function (app) {

  const mongoose = require('mongoose');
  mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

  let Schema = mongoose.Schema;

  let bookSchema = new Schema({
      title: {
      type: String,
      required: true,
      default: ''
    },
      comments: {
      type: Array,
      default: []
    },
      commentcount:{
      type: Number,
      default: 0
        }
 });

 let Book = mongoose.model("Book", bookSchema);

  app.route('/api/books')
    .get(async (req, res)=>{
      try{
        let book_list = await Book.find({}).select({__v: 0, comments: 0});
        return res.json(book_list);
    }catch(err){return res.json({error: err})}
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(async (req, res)=>{
      try{
        let title = req.body.title;

        if(!title){
          return res.type('txt').send('missing required field title');
        }

        let inputBook = new Book({
         title: title
 });
     await inputBook.save();
     res.json({title: inputBook.title, _id: inputBook._id});
    }catch(err){return res.json({error: err})}
      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
   .get(async (req, res)=>{
      try{
      let bookid = req.params.id;
      let inputBook = await Book.findById(bookid)
      if(inputBook){
        return res.json({title: inputBook.title, _id: inputBook._id, comments: inputBook.comments}); 
      }
      else return res.type('txt').send('no book exists');
    }catch(err){return res.json({error: err})}
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
