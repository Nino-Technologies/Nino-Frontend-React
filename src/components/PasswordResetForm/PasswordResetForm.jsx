import React from "react";
import "./PasswordResetForm.scss";


function PasswordResetForm() {
    return (
        <div className="reset">
            <div className="container house-div">
                <form className="py-5 px-5 shadow">
                    <h3 className="pb-4">Reset Password</h3>
                    <input type="password" className="form-control mb-3" placeholder="Enter Password"/>
                    <input type="password" class="form-control mb-4" placeholder="Confirm Password"/>
                    <button className="rounded btn btn-primary">Change</button>
                </form>
            </div>
        </div>
    )
}

export default PasswordResetForm;