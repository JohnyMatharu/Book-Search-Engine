import React, {useEffect, useState} from 'react';
import { REMOVE_BOOK } from '../utils/mutations';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useParams } from "react-router-dom";

//Check the above save book and get me
//Instead, use the useQuery() Hook to execute the GET_ME query on load and save it to a variable named userData.
//above Needs to be checked
//Use the useMutation() Hook to execute the REMOVE_BOOK mutation in the handleDeleteBook() function instead of the deleteBook() function that's imported from API file. (Make sure you keep the removeBookId() function in place!)
//import { getMe, deleteBook } from '../utils/API';


const SavedBooks = () => {
  //this part may need revision, as userData was used here in useState which is not deleted for error)
  const [setUserData] = useState({});
// use this to determine if `useEffect()` hook needs to run
//check syntax 
const{ id: bookId  } = useParams();
//here, We may not need data back in a case like this

const [removeBook, {error}] = useMutation(REMOVE_BOOK); 


const { loading, data } = useQuery(GET_ME);

const userData = data?.me || {};
console.log(userData)

const userDataLength = Object.keys(userData).length;
//Instead, use the useQuery() Hook to execute the GET_ME query on load and save it to a variable named userData.



 //this whole section was commented and has to be checked 
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
          return false;
        }

        //this line was modified needs checking
        const response = await userData(token);
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
        const user = await response.json();
        setUserData(user)
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

//Use the useMutation() Hook to execute the REMOVE_BOOK mutation in the handleDeleteBook() function instead of the deleteBook() function that's imported from API file. (Make sure you keep the removeBookId() function in place!)
//reminder to check login and signup arguments 
    try {

      const {data} = await removeBook ({ variables
        : { id: bookId }});

//this part may need revision as are calling mutation here which will return us user info, we need to render
//this info as updated info, current rederring is userData and specifically we need userData.saveBooks 


//an updated userData should be rederred by GET_ME
//check if we need to assign this data to userData here to update the userData with new data, or do we need this
//userData = data? || {};

//check following response

if (data.error) {
        throw new Error('something went wrong!');
      }
     
      //setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };
  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

//need to check rendering data through front end check and assignment sample gif

  return (
<>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};


export default SavedBooks;