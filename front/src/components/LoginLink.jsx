import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from './userContext';
import { MyAccountButton } from './MyAccountButton';
import '../asset/style/MyAccountButton.css';

export function LoginLink() {
    const { user, logout } = useContext(UserContext);

    return (
        <div className="login">
            {user ? (
                <>
                    <MyAccountButton />
                    <button onClick={logout} className="btn btn-primary">Logout</button>
                </>
            ) : (
                <Link to="/login" className="btn btn-primary">Login</Link>
            )}
        </div>
    );
}