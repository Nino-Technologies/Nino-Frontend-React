import React from "react";
import "./VerifyCodePage.scss";
import Nav from "../../components/Nav/Nav";
import VerifyCodeSearch from "../../components/VerifyCodeSearch/VerifyCodeSearch";
// import { Link } from "react-router-dom";

function VerifyCodePage() {
    return (
        <div className="verify-section">
            <Nav />
            <div className="search-text">
                <h1 className="verify-name">Verification Code</h1>
                <p className="sub">Enter Four digit verification code sent to your number or e-mail</p>
                <VerifyCodeSearch />
            </div>
        </div>
    );
}

export default VerifyCodePage;