import s from './Menu.module.css';
import {NavLink} from "react-router-dom";
import ActiveUsers from "../ActiveUsers/ActiveUsers";

const Menu = (props) => {
    return (
        <div className={s.menu}>
            <ul>
                <li><NavLink to="/profile" className={({ isActive }) => isActive ? s.active : s.menu }>Profile</NavLink></li>
                <li><NavLink to="/dialogs" className={({ isActive }) => isActive ? s.active : s.menu }>Messages</NavLink></li>
                <li><NavLink to="/news" className={({ isActive }) => isActive ? s.active : s.menu }>News</NavLink></li>
                <li><NavLink to="/music" className={({ isActive }) => isActive ? s.active : s.menu }>Music</NavLink></li>
                <li><NavLink to="/settings" className={({ isActive }) => isActive ? s.active : s.menu }>Settings</NavLink></li>
            </ul>
            <ActiveUsers state={props.state.activeUsers}/>
        </div>
    )
};
export default Menu;