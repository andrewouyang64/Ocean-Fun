import React from 'react';
import { useQuery } from '@apollo/client';
import SportList from '../components/SportList';
import '../components/styles/home.css';


import { QUERY_SPORTS } from '../utils/queries';

export default function Home() {

  const { data } = useQuery(QUERY_SPORTS);
  const sports = data?.sports || [];

  return (

    <main>
      <SportList
        sports={sports}
      />;
    </main>
  )
};


