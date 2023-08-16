import s from './Header.module.css';
import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/auth-reducer"
import {AppStateType} from "../../redux/redux-store";

type StateType = {}
class HeaderContainer extends React.Component<PropsType, StateType> {

    render() {
        return (<Header {...this.props}/>)
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        login: state.auth.login,
        isAuthorized: state.auth.isAuthorized
    }
};

type MapStatePropsType = {
    login: string | null
    isAuthorized: boolean
}
type MapDispatchPropsType = {
    logout: () => void
}
type OwnPropsType = {}
export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);