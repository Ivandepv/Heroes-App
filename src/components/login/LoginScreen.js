import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({history}) => {
    const {dispatch} = useContext(AuthContext);

    const handleClick = ()=>{
        
        const lastPath = localStorage.getItem('lastPath') || '/';


        const action = {
            type: types.login,
            payload: {
                name: 'Ivan'
            }
        }
        
        dispatch(action);

        history.replace(lastPath)
        
        
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />

            

            <button onClick={handleClick} className="btn btn-primary"  >
                Login
            </button>

        </div>
    )
}
