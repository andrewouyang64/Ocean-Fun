import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      ads {
        _id
        adText
        createdAt
      }
    }
  }
`;

export const QUERY_SPORTS = gql`
  query getSports {
    sports {
      _id
      name
      ads {
        _id
        sportName
        title
        adText
        adAuthor
        email
        createdAt
      }
    }
  }
`;


export const QUERY_SINGLE_SPORT = gql`
  query getSingleSport ($sportName: String!){
    sport (sportName: $sportName) {
      _id
      name
      ads {
        _id
        sportName
        title
        adText
        adAuthor
        email
        createdAt
      }
    }
  }
`;

export const QUERY_ADS = gql`
  query getAds ($sportName: String!) {
      ads (sportName: $sportName){
        _id
        title
        adText
        adAuthor
        email
        createdAt
      }
    }
  
`;


export const QUERY_SINGLE_AD = gql`
  query getSingleAd($adId: ID!) {
    ad(adId: $adId) {
      _id
      title
      adText
      adAuthor
      email
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;




export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      ads {
        _id
        adText
        adAuthor
        createdAt
      }
    }
  }
`;