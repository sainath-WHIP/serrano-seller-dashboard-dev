import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../assets/serrano.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { ApiPost } from "../../networking/apiCalls";
import { resetPasswordUrl } from "../../networking/apiEndPoints";

const ResetPassword = () => {
    const navigate = useNavigate();
    const { activation_token } = useParams();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [visibleeye, setVisibleEye] = useState(false);

    console.log("newPassword", newPassword);
    console.log("token", activation_token);
    console.log("confirmpassword", confirmPassword);
    console.log("useparams", useParams());

    useEffect(() => {
        if (activation_token) {
            console.log("activation_token:", activation_token);
        }
    }, [activation_token]);

    const sendRequest = async (e) => {
        e.preventDefault();

        try {
            if (activation_token) {
                const response = await ApiPost(resetPasswordUrl, {
                    token: activation_token,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword,
                })
                const result = await response.json();
                console.log("data", result);
                console.log("status code ", response.status);
                
                toast(result?.message);
                if (response.status === 200) {
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                }
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#CCCCCC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-3 justify-center flex">
                <img src={Logo} alt="logo" className="w-16 h-16 rounded-lg" />
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-0 text-center text-3xl font-extrabold text-gray-900">
                    Reset Password
                </h2>
            </div>
            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-[#fff] py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" method="post">
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                New Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type={visible ? "text" : "password"}
                                    name="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 outline-none text-sm"
                                />
                                {visible ? (
                                    <AiOutlineEye
                                        className="absolute right-2 top-2 cursor-pointer"
                                        size={25}
                                        onClick={() => setVisible(false)}
                                    />
                                ) : (
                                    <AiOutlineEyeInvisible
                                        className="absolute right-2 top-2 cursor-pointer"
                                        size={25}
                                        onClick={() => setVisible(true)}
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="cpassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type={visibleeye ? "text" : "password"}
                                    name="cpassword"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 outline-none text-sm"
                                />
                                {visibleeye ? (
                                    <AiOutlineEye
                                        className="absolute right-2 top-2 cursor-pointer"
                                        size={25}
                                        onClick={() => setVisibleEye(false)}
                                    />
                                ) : (
                                    <AiOutlineEyeInvisible
                                        className="absolute right-2 top-2 cursor-pointer"
                                        size={25}
                                        onClick={() => setVisibleEye(true)}
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                onClick={sendRequest}
                                className=" w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:shadow-md"
                            >
                                Reset password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;