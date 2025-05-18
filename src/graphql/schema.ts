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
  }

  input RegisterInput {
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
  }

  input CreatePostInput {
    title: String!
    content: String!
  }

  type Mutation {
    register(input: RegisterInput!): User!
    login(input: LoginInput!): AuthPayload!
    createPost(input: CreatePostInput!): Post!
    deletePost(id: ID!): Boolean!
  }
`;
