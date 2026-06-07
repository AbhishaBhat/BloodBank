import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({children}) => {
  return (
    <>

    <div className='header'>
        <Header/>
    </div>
    <div className="row g-0">
      <div className="col-md-2">
        <Sidebar/>
      </div>
      <div className='col-md-10'>{children}</div>
    </div>

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout