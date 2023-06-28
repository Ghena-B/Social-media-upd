import logo from './logo.svg';
import './App.css';

import Menu from "./components/Menu/Menu";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import React, {Component, lazy, Suspense} from "react";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import {compose} from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";

const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const LoginContainer = lazy(() => import('./components/Login/LoginContainer'));

class App extends Component {
    catchAllUnhandledErrors = (reason, promise) => {
        alert("Some error occurred");
    }
    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initSuccess) {
            return <Preloader/>
        }
        return (
            <div className="App">
                <HeaderContainer/>
                <Menu/>
                <div className='main'>
                    <Suspense fallback={<div>...Loading</div>}>
                        <Routes>
                            <Route path="/" element={<Navigate to="/profile" />} />
                            <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                            <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                            <Route path="/news" element={<News/>}/>
                            <Route path="/music" element={<Music/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                            <Route path="/users" element={<UsersContainer/>}/>
                            <Route path="/login" element={<LoginContainer/>}/>
                            <Route path="*" element={<div>404 Not found</div>}/>
                        </Routes>
                    </Suspense>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        initSuccess: state.app.initializeSuccess
    }
};
let AppContainer = compose(
    connect(mapStateToProps, {initializeApp})
)(App);

let SocialNetworkApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
};

export default SocialNetworkApp;
