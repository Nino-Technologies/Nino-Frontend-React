import React from "react";
import "./VerifyCodeSearch.scss";
import VerifyCodeFail from "../../components/VerifyCodeFail/VerifyCodeFail";
import VerifyCodeSuccess from "../../components/VerifyCodeSuccess/VerifyCodeSuccess";

function VerifyCodeSearch() {
    return (
        <>
            <div className="verify">
                <form className="container">
                    <div className="form">
                        <input type="text" className="form-control search mx-3 py-3"/>
                        <input type="text" className="form-control search mx-3 py-3"/>
                        <input type="text" className="form-control search mx-3 py-3"/>
                        <input type="text" className="form-control search mx-3 py-3"/>          
                    </div>   
                    <VerifyCodeFail />
                    <VerifyCodeSuccess />
                    <button type="submit">Verify</button>    
                </form> 
            </div>
        </>
    );
}

export default VerifyCodeSearch;