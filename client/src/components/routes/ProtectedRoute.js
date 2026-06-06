import React ,{ useEffect} from 'react'
import {useDispatch} from 'react-redux'
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

export default ProtectedRoute
