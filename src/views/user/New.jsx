import React from 'react';
import Layout from '../components/Layout.jsx'
import Access from '../components/Access.jsx'

const New = (props) => {
  return (
    <Layout>
        <header id='access-title'>
          <h1 >Feisbuck <span id="tagline">Just another (of many) work in progress</span></h1>
        </header>
        <Access/>
    </Layout>
  );
}

export default New
