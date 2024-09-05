import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connect } from './db.js';  // Assuming this connects to MongoDB
import { createUser, deleteUser, findUserById, getUsers, updateUser } from './user/services.js';

// Define GraphQL schema
const typeDefs = `#graphql
  type User {
    _id: String
    id: ID
    name: String
    email: String
    address: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, address: String!): User
    updateUser(id: ID!, name: String, email: String, address: String): User
    deleteUser(id: ID!): Boolean
  }
`;

// Resolvers to interact with the database
const resolvers = {
    Query: {
        // Get all users
        users: getUsers,
        // Get a single user by ID
        user: findUserById
    },
    Mutation: {
        // Create a new user
        createUser: createUser,
        // Update an existing user
        updateUser: updateUser,
        // Delete a user by ID
        deleteUser: deleteUser
    }
};

// Create ApolloServer instance with schema and resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Start the standalone server
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

// Initialize the MongoDB connection and start the server
const initDB = async () => {
    try {
        await connect;
        console.log(`Connected to DB`);
        console.log(`🚀 Server ready at: ${url}`);
    } catch (error) {
        console.error(error);
    }
};

initDB();
