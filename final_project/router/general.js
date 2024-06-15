const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
// const axios = require ('axios')

const public_users = express.Router();

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}


public_users.post("/register", (req,res) => {
    const username = req.query.username;
    const password = req.query.password;
  
    if (username && password) {
      if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        // console.log(users)
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        // console.log(users)
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    // console.log(users)
    return res.status(404).json({message: "Unable to register user check username and password." +username + password+ users});
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   res.send(JSON.stringify(books,null,4));
// //   return res.status(300).json({message: "Yet to be implemented"});
// });

// axios.get('/')
//     .then(response => {
//         // Handle response
//         axios.send(books)
//     })
//     .catch(err => {
//         // Handle errors
//         console.error(err);
//     });
const getData= ()=> {return books}

// public_users.get("/", async function(req, res){  
//   var data = await getData();
//   res.json(data);
// })

const asyncWrap = fn => (req, res, next) =>
	Promise
		.resolve(fn(req, res, next))
		.catch(err => next(err));

const handler = async (req, res) => {
	res.send(books);
};

public_users.get('/', asyncWrap(handler));




// Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   let isbn = req.params.isbn;
//   res.send(books[isbn])
// //   return res.status(300).json({message: "Yet to be implemented"});
//  });


 const asyncWrapISBN = fn => (req, res, next) =>
	Promise
		.resolve(fn(req, res, next))
		.catch(err => next(err));

const handlerISBN = async (req, res) => {
  let isbn = req.params.isbn;
	res.send(books[isbn]);
};

public_users.get('/isbn/:isbn', asyncWrapISBN(handlerISBN));


 
  
// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//     let author = req.params.author;
//     let bookID=0
//     // console.log(author)
//     for (const key in books)
//         {
//             if (books[key].author == author)
//                 { bookID = key} 
//         }

// res.send(books[bookID])

// // return res.status(300).json({message: "Yet to be implemented"});
// });


const asyncWrapAuthor = fn => (req, res, next) =>
	Promise
		.resolve(fn(req, res, next))
		.catch(err => next(err));

const handlerAuthor = async (req, res) => {
  let author = req.params.author;
    let bookID=0
    // console.log(author)
    for (const key in books)
        {
            if (books[key].author == author)
                { bookID = key} 
        }
	res.send(books[bookID]);
};

public_users.get('/author/:author', asyncWrapAuthor(handlerAuthor));


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title;
    let bookID=0
    // console.log(title)
    for (const key in books)
        {
            if (books[key].title == title)
                { bookID = key} 
        }

res.send(books[bookID])

//   return res.status(300).json({message: "Yet to be implemented"});
});


const asyncWrapTitle = fn => (req, res, next) =>
	Promise
		.resolve(fn(req, res, next))
		.catch(err => next(err));

const handlerTitlev = async (req, res) => {
  let title = req.params.title;
  let bookID=0
  // console.log(title)
  for (const key in books)
      {
          if (books[key].title == title)
              { bookID = key} 
      }
res.send(books[bookID])
};

public_users.get('/author/:author', asyncWrapTitle(handlerTitlev));


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  res.send(books[isbn].reviews)
//   return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
