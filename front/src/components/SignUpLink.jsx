import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from './userContext';
import '../asset/style/MyAccountButton.css';

export function SignUpLink() {
    const { user, logout } = useContext(UserContext);

    return (
        <div>
            {user ? null : (
                <div className="signup">
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                </div>
            )}
        </div>
    );
}