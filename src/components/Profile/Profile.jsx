import s from './Profile.module.css';
import MyPosts from "./My Posts/MyPosts";
import ProfileInfo from "./Profile Info/ProfileInfo";

const Profile = (props) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.state.posts}/>
        </div>
    )
};
export default Profile;