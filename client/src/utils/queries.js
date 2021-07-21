//to be tested

import { gql } from '@apollo/client';

export const QUERY_BOOKS = gql`
  query books($username: String) {
    books(username: $username) {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
  }
`;


export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
   
      _id
      username
      email
      savedBooks
      {
        _id
        authors
        description
        bookId        
        image 
        link
        title
      }
      bookCount
    }
  }
`;

//this has to be checked
export const QUERY_ME = gql`
  {
   
    _id
      username
      email
      savedBooks
      {
        _id
        authors
        description
        bookId        
        image 
        link
        title
      }
      bookCount
    };
`;
//this part needs to be checked, may be needed, if yes make adjustments 
/*
export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;
*/

