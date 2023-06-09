import s from './Header.module.css';
import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
    componentDidMount() {

    }

    render() {
        return (<Header {...this.props}/>)
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        isAuthorized: state.auth.isAuthorized
    }
};

export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);