import React from 'react';
import {useNavigate} from "react-router-dom";

const Error: React.FC = (props) => {
    const navigate = useNavigate()

    return (
        <div>
            Error<br/>
            <button onClick={() => navigate('/')}>
                Back
            </button>
        </div>
    );
};

export default Error;