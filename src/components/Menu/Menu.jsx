import s from './Menu.module.css';
import {NavLink} from "react-router-dom";

const Menu = () => {
    return (
        <div className={s.menu}>
            <ul>
                <li><NavLink to="/profile" className={({ isActive }) => isActive ? s.active : s.menu }>Profile</NavLink></li>
                <li><NavLink to="/dialogs" className={({ isActive }) => isActive ? s.active : s.menu }>Messages</NavLink></li>
                <li><NavLink to="/news" className={({ isActive }) => isActive ? s.active : s.menu }>News</NavLink></li>
                <li><NavLink to="/music" className={({ isActive }) => isActive ? s.active : s.menu }>Music</NavLink></li>
                <li><NavLink to="/settings" className={({ isActive }) => isActive ? s.active : s.menu }>Settings</NavLink></li>
            </ul>
        </div>
    )
};
export default Menu;