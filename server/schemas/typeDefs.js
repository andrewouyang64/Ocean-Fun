const { gql } = require('apollo-server-express');

const typeDefs = gql`
 
 type User {
    _id: ID
    username: String
    email: String
    password: String
    ads: [Ad]!
  }

  type Sport {
    _id: ID
    name: String
    ads: [Ad]
  }
  type Ad {
    _id: ID
    sportName: String
    title: String
    adText: String
    adAuthor: String
    email: String
    createdAt:String
    comments: [Comment]!
  }


  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    ads(sportName: String!): [Ad]
    ad(adId: ID!): Ad
    sports: [Sport]
    sport(name: String!): Sport
    comments(adId: ID!):[Comment]
    me: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addAd(sportName:String!, title:String!, adText: String!, adAuthor: String! email: String!): Ad
    addComment(adId: ID!, commentText: String!): Ad
    # removeAd(adId: ID!): Ad
    # removeComment(adId: ID!, adId: ID!): Ad
  }


`;
module.exports = typeDefs;
