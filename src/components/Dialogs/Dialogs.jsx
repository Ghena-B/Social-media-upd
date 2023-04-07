import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                <div className={s.dialog + " " + s.active}>
                    <NavLink to="/dialogs/1">Ghena</NavLink></div>
                <div className={s.dialog}> <NavLink to="/dialogs/2">Nicu</NavLink></div>
                <div className={s.dialog}><NavLink to="/dialogs/3">Max</NavLink></div>
                <div className={s.dialog}><NavLink to="/dialogs/4">Tudor</NavLink></div>
                <div className={s.dialog}><NavLink to="/dialogs/5">Mama</NavLink></div>
                <div className={s.dialog}> <NavLink to="/dialogs/6">Tata</NavLink></div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>Salut ce faci?</div>
                <div className={s.message}>Mesaj 2</div>
                <div className={s.message}>Ciao</div>

            </div>
        </div>
    )
};
export default Dialogs;