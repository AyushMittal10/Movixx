// search ke time initial search vli image ke liye in searchresults

import React from "react";

import "./style.scss";

const Spinner = ({ initial }) => {
    return (
        // loading ke liye -- initial hai (jo main initial class meh jayega -- uss meh spinner ka svg file hai)
        <div className={`loadingSpinner ${initial ? "initial" : ""}`}>
            <svg className="spinner" viewBox="0 0 50 50">
                <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                ></circle>
            </svg>
        </div>
    );
};

export default Spinner;