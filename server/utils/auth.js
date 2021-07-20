const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req, res, next) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }
    //In module 21.6, the code is written as such-
//return token after login -make sure

    // send to next endpoint
    next();

  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
//John from Ask BCS mentioned that Mongo Atlas is connected, your client deployment is fine because Heroku
//will look for server anyways and when errors are fixed it will run perfect. 


//Neil: npm run watch for running backend server and nodemon, front is npm run start, once errors are fixed, follow
//the link bottom of server.js for graphql use testing data for typedef and resolvers, no seeder, adjustments
//need to be made to front end code wherever mentioned to match new change, Mongo should be running 

//Reminder, don't deploy anything until backend works perfect with graphql and localhost, push only once or twice



//POA: MON- 21.3, 21.4. 21.5 career
//4 front end files: save and search and login, sign up, and get all done by Wed night. Deploy Heroku


//Go through notes now and make changes, DEPLOY HEROKU FIRST and submit assignment
//Everything else has been verified, add missing front-end files, work resolvers, test small data, seed and test big data 
//follow acceptance criteria and submit -deploy Heroku-mongoatlas database-only once or atleast backend 100% done.



//On Client and server installed graphql, apollo-server-express@2.12.0, apollo/client, react-router-dom, concurrently
//json webtopken, jwt decode, 
//MongoDB is running (seed and check roboT), server.js and connection.js has been altered for mongoose

//given to me by Joshi AskBCS https://blog.logrocket.com/complete-guide-to-graphql-playground/

/*

You can look at models and routes for extra info

Modify the existing authentication middleware so that it works in the context of a GraphQL API.



Make sure that if you need to write an additional query for front end connecting to query in type-def/resolvers
Mostly it is created already, needs to connect to alternative source channel only
Your login/signup is not working because of missing login user route (as commented), will be replaced by resolver
saving book, viewing saved list, deleting the book from saved search has to be checked after login is working, 
this may require additional typef queries and resolvers as this was done by routes first, front end is there
backend needs to be added  



Acceptance Criteria

WHEN I am logged in to the site
THEN the menu options change to Search for Books, an option to see my saved books, and Logout
WHEN I am logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site and a button to save a book to my account
WHEN I click on the Save button on a book
THEN that book’s information is saved to my account
WHEN I click on the option to see my saved books
THEN I am presented with all of the books I have saved to my account, each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account
WHEN I click on the Remove button on a book
THEN that book is deleted from my saved books list
WHEN I click on the Logout button
THEN I am logged out of the site and presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button  



A user can view their saved books on a separate page, as shown in the following animation:

The Viewing Lernantino's Books page shows the books that the user Lernaninto has saved.

you will add some functionality to the front end

The best way to find working knowledge is look gif on assignment page and dowloand code on desktop and run

*/

