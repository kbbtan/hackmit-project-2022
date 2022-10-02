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
            {!predicting && <p>results here</p>}

            <input type="submit" value="<< Run Another Prediction"/>
        </form>
    )
}

export default Results