import React from 'react';
import HeaderOwn from "./HeaderOwn";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/auth-reducer"
import {AppStateType} from "../../redux/redux-store";

type StateType = {}

class HeaderContainer extends React.Component<PropsType, StateType> {

    render() {
        return (<HeaderOwn {...this.props}/>)
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        login: state.auth.login,
        isAuthorized: state.auth.isAuthorized,
    }
};

type MapStatePropsType = {
    login: string | null
    isAuthorized: boolean
}
type MapDispatchPropsType = {
    logout: () => void
}
type OwnPropsType = {
    collapsed: boolean,
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
    colorBgContainer: string
}
export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);