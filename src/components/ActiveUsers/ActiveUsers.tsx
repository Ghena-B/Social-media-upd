import s from './ActiveUsers.module.css';
import ActiveUser from './ActiveUser/ActiveUser'
import {ActiveUsersType} from "../../redux/sidebar-reducer";
import classNames from "classnames";

type PropsType = {
    activeUsers: Array<ActiveUsersType>
    collapsed: boolean
}
const ActiveUsers: React.FC<PropsType> = (props) => {
    let activeUserElement = props.activeUsers.map(a => <ActiveUser src={a.imgUrl} key={a.id} name={a.name}/>)
    return (
        <div>
            <h3 className={classNames(s.title, {[s.collapsed]: props.collapsed})}>Friends</h3>
            <div className={s.active}>
                {activeUserElement}
            </div>
        </div>
    )
};
export default ActiveUsers;