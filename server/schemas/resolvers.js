const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

//only have 3 models, index, user and books (books is single - represent thoughts and reactions in 21.6)


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
     // if (context.user) {
        const userData = await User.find()
          .select('-__v -password')
          .populate('books');

       return userData;
    //  }

      //throw new AuthenticationError('Not logged in');
    },
    
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('books');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('books');
    },

    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params).sort({ createdAt: -1 });
    },
    book: async (parent, { _id }) => {
      return Book.findOne({ _id });
    }
  },



  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      //check return auth
      return { token, user };
    },

    //Check this especially args
    //addUser(username: String!, email: String!, password: String!): Auth
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
//check return auth
      return { token, user };
    },

    //The following will return user twice
//Major fixing required
  //  saveBook(authors: [String]!, description: String!, title: String!, bookId: String, image: String!, link: String!): User
  

    saveBook: async (parent, args, context) => {
      if (context.user) {
        const book = await Book.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { books: book._id } },
          { new: true }
        );
//this part needs fixing
        return { token, user, book };
      }

      throw new AuthenticationError('You need to be logged in!');
    },

//this part needs major checking    
 // removeBook(bookId: String!): User

removeBook: async (parent, args, context) => {
  if (context.user) {
    const book = await Book.update({ ...args, username: context.user.username });

    await User.findByIdAndUpdate(
      { _id: context.user._id },
      { $pull: { books: book._id } },
      { new: true }
    );
//this part needs fixing
    return { token, user, book };
  }

  throw new AuthenticationError('You need to be logged in!');
}
  }  
};

module.exports = resolvers;