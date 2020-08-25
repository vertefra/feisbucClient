import React, { useContext, useState, useEffect } from 'react'


const Layout = (props) => {

  return (    
    <div id="wrapper">
        {props.children}
        
    </div>
  );
}

export default Layout
