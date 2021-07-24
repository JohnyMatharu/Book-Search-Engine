//to be tested

import { gql } from '@apollo/client';

export const QUERY_BOOKS = gql`
  query books($username: String) {
    books(username: $username) {
      
      bookId
      authors
      description
      title
      image
      link
    
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
        bookId
      authors
      description
      title
      image
      link
      }
      bookCount
    }
  }
`;

//this has to be checked
export const GET_ME = gql`
  {
    me {
    _id
      username
      email
      savedBooks
      {
        bookId
      authors
      description
      title
      image
      link
      }
      bookCount
    }
    }
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

