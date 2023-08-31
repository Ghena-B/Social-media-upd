import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import LoginForm from "../Forms/LoginForm";

type PropsType = {
    isAuth: boolean;
    errorMessage: string;
    captcha: string | null;
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
};

const Login: React.FC<PropsType> = ({isAuth, login, errorMessage, captcha}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate('/profile');
        }
    }, [isAuth, navigate]);

    return (
        <div>
            <h1>Login</h1>
            <LoginForm login={login} errorMessage={errorMessage} captcha={captcha}/>
        </div>
    );
};

export default Login;

