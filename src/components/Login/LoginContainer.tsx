import {connect} from "react-redux";
import Login from "./Login";
import {actions, login} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuthorized,
        errorMessage: state.auth.errorMessage,
        captcha: state.auth.captchaUrl,
    }
};

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {login, setError: actions.setError})(Login)

type MapStatePropsType = {
    isAuth: boolean
    errorMessage: string
    captcha: string | null
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    setError: (errorMessage: string) => void
}
type OwnPropsType = {}