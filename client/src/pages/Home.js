import React from 'react';
import { useQuery } from '@apollo/client';
import SportList from '../components/SportList';
// import surfing from '../Images/surfing.jpg'
// import Kitesurfing from '../Images/Kitesurfing.jpeg'
// import Scubadiving from '../Images/Scubadiving.jpg'

import { QUERY_SPORTS } from '../utils/queries';

export default function Home() {

  const { data } = useQuery(QUERY_SPORTS);
  const sports = data?.sports || [];

  return (

    <main>
      <SportList
        sports={sports}
      // sportImg={sportImg} 
      />;
    </main>
  )
};


