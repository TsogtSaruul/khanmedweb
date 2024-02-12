import React from "react";


const ScrollUp = () => {

    return (
        <div className="scrollUp">
            <a
                id="scrollUp"
                href="#top"
                style={{ position: "fixed", zIndex: 9 }}
                >
                <span>
                    <i className="fa fa-angle-up"></i>
                </span>
            </a>
        </div>
    );
};

export default ScrollUp;
