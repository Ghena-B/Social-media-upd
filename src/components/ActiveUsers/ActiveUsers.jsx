import s from './ActiveUsers.module.css';
import ActiveUser from "./ActiveUser/ActiveUser";

const ActiveUsers = () => {
    return (
        <div>
            <h3 className={s.title}>Friends</h3>
             <div className={s.active}>
                 <ActiveUser/>
                 <ActiveUser/>
                 <ActiveUser/>
            </div>
        </div>
)
};
export default ActiveUsers;