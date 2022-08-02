import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_AD = gql`
  mutation addAd($sportName:String!, $title:String!, $adText: String!,$adAuthor:String! $email: String!) {
    addAd(sportName: $sportName, setTitle: $title, adText: $adText, adAuthor:$adAuthor, email: $email) {
      _id
      sportName
      title
      adText
      adAuthor
      createdAt
      email
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($adId: ID!, $commentText: String!) {
    addComment(adId: $adId, commentText: $commentText) {
      _id
      adText
      adAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
