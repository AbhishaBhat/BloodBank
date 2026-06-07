import React ,{ useEffect} from 'react'
import PropTypes from 'prop-types'
import {useDispatch}from 'react-redux'
import {Navigate} from 'react-router-dom'
import { getCurrentUser } from '../../redux/features/auth/authActions';

const ProtectedRoute = ({children}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            dispatch(getCurrentUser());
        }
    }, [dispatch])

    if(localStorage.getItem('token')){
        return children
    }else{
        return <Navigate to='/login'/>
    }
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProtectedRoute
