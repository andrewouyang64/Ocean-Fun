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

export const QUERY_ADS = gql`
  query getAds {
    ads() {
      _id
      adText
      adAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_AD = gql`
  query getSingleAd($adId: ID!) {
    ad(adId: $adId) {
      _id
      adText
      adAuthor
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
