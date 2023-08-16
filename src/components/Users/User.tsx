import {NavLink} from "react-router-dom";
import {UsersType} from "../../redux/users-reducer";

type PropsType = {
    user: UsersType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
const User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {
    return (
        <div>
            <div>
                <NavLink to={`/profile/${user.id}`}><img
                    src={user.photos.small || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                    alt=""/></NavLink>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}>Follow</button>}
                </div>
            </div>
            <div>
                <div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
            </div>
        </div>
    )
};

export default User;