import React from "react";
import "./VerifyCodeSuccess.scss";

function VerifyCodeSuccess() {
    return (
        <div className="verify">
            <form className="container">
                <div className="form">
                    <input type="text" className="form-control success mx-3 py-3"/>
                    <input type="text" className="form-control success mx-3 py-3"/>
                    <input type="text" className="form-control success mx-3 py-3"/>
                    <input type="text" className="form-control success mx-3 py-3"/>          
                </div>      
            </form> 
          
        </div>

    );
}

export default VerifyCodeSuccess;