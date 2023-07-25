import React from "react";

import "./style.scss";

// ye content ko humare center m laaegi
const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;