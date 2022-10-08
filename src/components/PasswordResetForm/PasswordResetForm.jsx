import React from "react";
import "./PasswordResetForm.scss";


function PasswordResetForm() {
    return (
        <div className="reset">
            <form className="container">
                <div className="form bg-dark">
                    <input type="password" className="form-control w-100 w-md-50" placeholder="Enter Password"/>
                    <input type="password" class="form-control" placeholder="Confirm Password"/>
                </div>
            </form>
        </div>
    )
}

export default PasswordResetForm;