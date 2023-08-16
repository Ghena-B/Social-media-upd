import s from './ActiveUsers.module.css';
import ActiveUser from './ActiveUser/ActiveUser'
import {ActiveUsersType} from "../../redux/sidebar-reducer";

type PropsType = {
    activeUsers: Array<ActiveUsersType>
}
const ActiveUsers: React.FC<PropsType> = (props) => {
    let activeUserElement = props.activeUsers.map(a => <ActiveUser src={a.imgUrl} key={a.id} name={a.name} />)
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