import React, { useContext, useState, useEffect } from 'react'
import { requestUserInfo } from '../../services/requests'
import { Context } from '../../services/store'

const Layout = (props) => {

  return (    
    <div id="wrapper">    
        {props.children}
    </div>
  );
}

export default Layout
