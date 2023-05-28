import s from './Profile.module.css';
import ProfileInfo from "./Profile Info/ProfileInfo";
import MyPostsContainer from "./My Posts/MyPostsContainer";


const Profile = () => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    )
};
export default Profile;