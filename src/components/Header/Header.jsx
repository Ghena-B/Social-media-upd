import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <div className={s.header}>
            <div className={s.header_logo}>
                <a href="#"><img
                    src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png"
                    alt=""/></a>
            </div>
            <div className={s.authorize}>
                {props.isAuthorized ?<div>Hello {props.login} - <button onClick={props.logout}>Logout</button></div> : <NavLink to='/login'>Login </NavLink>}
            </div>
        </div>
    )
};

export default Header;