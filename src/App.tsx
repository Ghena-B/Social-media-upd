//import logo from './logo.svg';
import './App.css';

import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {HashRouter as Router, Navigate, NavLink, Route, Routes} from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import React, {lazy, Suspense, useEffect, useState} from "react";
import {connect, Provider, useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import {compose} from "redux";

import store, {AppStateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import {chatApi} from "./api/chatApi";
import Chat from "./components/Chat/Chat";
import {Layout, theme} from 'antd';
import MenuOwn from "./components/Menu/Menu";

const UsersPage = lazy(() => import('./components/Users/UsersContainer'));
const LoginContainer = lazy(() => import('./components/Login/LoginContainer'));

const {Sider, Content} = Layout;

const App: React.FC = () => {
    const dispatch = useDispatch();
    const initSuccess = useSelector((state: AppStateType) => state.app.initializeSuccess);
    const [collapsed, setCollapsed] = useState(window.innerWidth < 833);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    useEffect(() => {
        dispatch(initializeApp());
        chatApi.start();
        return () => {
            chatApi.stop();
        }
    }, [dispatch]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 833) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!initSuccess) {
        return <Preloader/>
    }

    return (<>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" style={{padding: 16,
                        background: colorBgContainer,
                        fontWeight: 700,
                        fontSize: 24,
                        color: "#252B42"}}>
                        <NavLink to="/"> { collapsed ? <div>GN</div> : <div>GNetwork</div>}
                            </NavLink>
                    </div>
                    <MenuOwn collapsed={collapsed}/>
                </Sider>
                <Layout>
                    <HeaderContainer collapsed={collapsed} setCollapsed={setCollapsed}
                                     colorBgContainer={colorBgContainer}/>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Suspense fallback={<div>...Loading</div>}>
                            <Routes>
                                <Route path="/" element={<Navigate to="/profile"/>}/>
                                <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                                <Route path="/news" element={<News/>}/>
                                <Route path="/music" element={<Music/>}/>
                                <Route path="/settings" element={<Settings/>}/>
                                <Route path="/users" element={<UsersPage/>}/>
                                <Route path="/login" element={<LoginContainer/>}/>
                                <Route path="/chat" element={<Chat/>}/>
                                <Route path="*" element={<div>404 Not found</div>}/>
                            </Routes>
                        </Suspense>
                    </Content>
                </Layout>
            </Layout>
        </>

    )
}

let AppContainer = compose(
    connect(null, {initializeApp})
)(App);

const SocialNetworkApp: React.FC = () => {
    return <Router>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </Router>
};

export default SocialNetworkApp;
