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
    }
 });

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(async (req, res)=>{
      try{
        let Book = mongoose.model("Book", bookSchema);
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
    .get(function (req, res){
      let bookid = req.params.id;
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
