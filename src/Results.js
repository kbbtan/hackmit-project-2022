import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

import "./Results.css";

const Results = ({setFormMode, predicting, results}) => {
    const returnToForm = (e) => {
        e.preventDefault();

        setFormMode(true);
    }
    return (
        <form className="results-container" onSubmit={returnToForm}>
            {predicting && <InfinitySpin color="#2E385C"/>}
            {!predicting && <div>
                <h1>Your estimated number of entries is:</h1>
                <h3>{results}</h3>
            </div>}

            <input type="submit" value="<< Run Another Prediction"/>
        </form>
    )
}

export default Results