import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
  if(localStorage.getItem('token')){
    return <Navigate to='/'/>
  }else{
    return children;
  }
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PublicRoute