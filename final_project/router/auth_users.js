const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
      });
      if(validusers.length > 0){
        return true;
      } else {
        return false;
      }}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.query.username;
    const password = req.query.password;
  
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
  
    if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 });
  
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
let isbn = req.params.isbn;
let dataToModifi = books[isbn]
        
        if (dataToModifi) { //Check is book exists
            let author = req.body.author
            let title = req.body.title
            let reviews = req.body.reviews
            // console.log(author)
            // console.log(title)
            // console.log(reviews)

            if(author) {
                dataToModifi["author"] = author
            }
            if(title) {
                dataToModifi["title"] = title
            }
            if(reviews) {
                // dataToModifi["reviews"] = {...dataToModifi["reviews"] , reviews }
                dataToModifi["reviews"] = reviews
            }
            
            books[isbn]=dataToModifi;
            res.status(200).send("book with the isbn (" +  isbn +") updated successfully.");
        }
        else{
            res.send("Unable to find book!");
        }




    //   return res.status(300).json({message: "Yet to be implemented"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    let isbn = req.params.isbn;
    delete books[isbn]
    res.send("the book with isbn :" + isbn + " deleted successfully")
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
