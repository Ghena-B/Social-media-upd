import {useNavigate} from "react-router-dom";
import LoginForm from "../Forms/LoginForm";

const Login = ({isAuth, login, errorMessage, captcha}) => {
    const navigate = useNavigate();
    if (isAuth) {
        return navigate('/profile');
    }
    return (<div>
        <h1>Login</h1>
        <LoginForm login={login} errorMessage={errorMessage} captcha={captcha}/>
    </div>)
};
export default Login;

