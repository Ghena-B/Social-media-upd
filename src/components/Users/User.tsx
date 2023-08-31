import s from './Users.module.css'
import {NavLink} from "react-router-dom";
import {UsersType} from "../../redux/users-reducer";
import {Button} from "antd";

type PropsType = {
    user: UsersType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
const User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {
    return (
        <div>
                <div className={s.card} >
                    <div>
                        <NavLink to={`/profile/${user.id}`}><img
                            src={user.photos.large || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                            alt="profile-pic" className={s.profileImg}/></NavLink>
                    </div>
                    <div className={s.username}>
                        {user.name}
                    </div>
                    <div className={s.status}>
                       {user.status}
                    </div>
                    <div className={s.button}>
                        {user.followed
                            ? <Button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                unfollow(user.id)
                            }}>Unfollow</Button>
                            : <Button type={"primary"} disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                follow(user.id)
                            }}>Follow</Button>}

                    </div>
                </div>

        </div>
    )
};

export default User;