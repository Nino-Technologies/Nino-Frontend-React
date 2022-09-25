import React from "react";
import "./VerifyCodeFail.scss";

function VerifyCodeFail() {
    return (
        <div className="verify">
            <form className="container">
                <div className="form">
                    <input type="text" className="form-control fail mx-3 py-3"/>
                    <input type="text" className="form-control fail mx-3 py-3"/>
                    <input type="text" className="form-control fail mx-3 py-3"/>
                    <input type="text" className="form-control fail mx-3 py-3"/>          
                </div>      
            </form> 
          
        </div>

    );
}

export default VerifyCodeFail;