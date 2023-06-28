import {connect} from "react-redux";
import Login from "./Login";
import {login, setError} from "../../redux/auth-reducer";

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuthorized,
        errorMessage: state.auth.errorMessage,
        captcha: state.auth.captchaUrl,
    }
};

export default connect(mapStateToProps, {login, setError})(Login)