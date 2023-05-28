import s from './ActiveUsers.module.css';
import ActiveUser from "./ActiveUser/ActiveUser";

const ActiveUsers = (props) => {
    let activeUserElement = props.state.map(a => <ActiveUser src={a.imgURL} key={a.id} name={a.name} />)
    return (
        <div>
            <h3 className={s.title}>Friends</h3>
             <div className={s.active}>
                 {activeUserElement}
            </div>
        </div>
)
};
export default ActiveUsers;