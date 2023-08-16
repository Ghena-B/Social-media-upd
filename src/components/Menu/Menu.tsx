import s from './Menu.module.css';
import {NavLink} from "react-router-dom";
import ActiveUsersContainer from "../ActiveUsers/ActiveUsersContainer";
import React from "react";

const Menu: React.FC = () => {
    return (
        <div className={s.menu}>
            <ul>
                <li><NavLink to="/profile" className={({isActive}) => isActive ? s.active : s.menu}>Profile</NavLink>
                </li>
                <li><NavLink to="/dialogs" className={({isActive}) => isActive ? s.active : s.menu}>Messages</NavLink>
                </li>
                <li><NavLink to="/news" className={({isActive}) => isActive ? s.active : s.menu}>News</NavLink></li>
                <li><NavLink to="/music" className={({isActive}) => isActive ? s.active : s.menu}>Music</NavLink></li>
                <li><NavLink to="/settings" className={({isActive}) => isActive ? s.active : s.menu}>Settings</NavLink>
                </li>
                <li><NavLink to="/users" className={({isActive}) => isActive ? s.active : s.menu}>Users</NavLink>
                </li>
            </ul>
            <ActiveUsersContainer/>
        </div>
    )
};
export default Menu;