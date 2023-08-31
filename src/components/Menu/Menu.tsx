import s from './Menu.module.css';
import {NavLink} from "react-router-dom";
import ActiveUsersContainer from "../ActiveUsers/ActiveUsersContainer";
import React from "react";
import {
    ContainerOutlined,
    MessageOutlined, SoundOutlined,
    ToolOutlined,
    UploadOutlined, UsergroupAddOutlined,
    UserOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import {Menu} from "antd";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

type PropsType = {
    collapsed: boolean
}
const MenuOwn: React.FC<PropsType> = (props) => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuthorized)
    return (
        <div style={{height: "calc(100vh - 64px)"}}>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined/>,
                        label: <NavLink to="/profile">Profile</NavLink>,
                    },
                    {
                        key: '2',
                        icon: <MessageOutlined />,
                        label: <NavLink to="/chat">Chat</NavLink>,
                    },
                    {
                        key: '3',
                        icon: <ContainerOutlined />,
                        label: <NavLink to="/news">News</NavLink>,
                    },
                    {
                        key: '4',
                        icon: <SoundOutlined />,
                        label: <NavLink to="/music">Music</NavLink>,
                    },
                    {
                        key: '5',
                        icon: <ToolOutlined />,
                        label: <NavLink to="/settings">Settings</NavLink>,
                    },
                    {
                        key: '6',
                        icon: <UsergroupAddOutlined />,
                        label: <NavLink to="/users">Users</NavLink>,
                    },
                ]}
            />
            {isAuth && <ActiveUsersContainer collapsed={props.collapsed}/>}
        </div>

    )
};
export default MenuOwn;