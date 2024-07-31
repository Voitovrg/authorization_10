// src/components/Me.tsx
import React from 'react';
import {Link} from "react-router-dom";
import '../style/App.css'

const Me: React.FC = () => {
    return (
        <div className={'App'}>
            <div className={'container-MeBtn'}>
                <h1>Welcome to your profile page!</h1>
                <Link to="/" className={'MeBtn'}>Exit</Link>
            </div>
        </div>
    );
};

export default Me;
