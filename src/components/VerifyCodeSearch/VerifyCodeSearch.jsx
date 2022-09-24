import React from "react";
import "./VerifyCodeSearch.scss";

function VerifyCodeSearch() {
    return (
        <div className="verify">
            <form className="container">
                <div className="form">
                    <input type="text" className="form-control mx-3 py-3"/>
                    <input type="text" className="form-control mx-3 py-3"/>
                    <input type="text" className="form-control mx-3 py-3"/>
                    <input type="text" className="form-control mx-3 py-3"/>          
                </div>   
                <button type="submit">Verify</button>    
            </form> 
          
        </div>

    );
}

export default VerifyCodeSearch;