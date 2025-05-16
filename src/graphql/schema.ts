import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    role: String!
    createdAt: String!
    updatedAt: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User!]!
    posts: [Post!]!
    post(id: ID!): Post
    user(id: ID!): User
    me: User
  }

  type Mutation {
    register(email: String!, password: String!): User!
    login(email: String!, password: String!): String!
  }
`;
