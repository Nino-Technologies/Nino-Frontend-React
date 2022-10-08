import React from "react";
import "./PasswordResetPage.scss";
import Nav from "../../components/Nav/Nav";
import PasswordResetForm from '../../components/PasswordResetForm/PasswordResetForm'

function PasswordResetPage() {
    return (
        <div className="reset">
            <Nav />
            <div className="container">
                <PasswordResetForm />
            </div>
        </div>
    )
}

export default PasswordResetPage;