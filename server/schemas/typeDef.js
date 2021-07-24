const { gql } = require('apollo-server-express');

//only have 3 models, index, user and books (books is single - represent thoughts and reactions in 21.6)
//typeDefs.js: Define the necessary Query and Mutation types:
//check authors: [String], and need of _id in presence of bookId

const typeDefs = gql`

type Book {
  bookId: ID!
  authors: [String]
  description: String
  title: String!
  image: String
  link: String
}


  type User {
_id: ID
username: String
email: String
savedBooks: [Book]
bookCount: Int
}

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(_id: ID!): Book
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String]!, description: String!, title: String!, bookId: ID!, image: String!, link: String!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
