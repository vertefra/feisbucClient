import React from 'react';
import Layout from '../components/Layout.jsx'
import Access from '../components/Access.jsx'

const New = (props) => {
  return (
    <Layout>
        <header id='access-title'>
          <h1 >Feisbuck <span id="tagline">where the food met the dreamers</span></h1>
        </header>
        <Access/>
    </Layout>
  );
}

export default New
