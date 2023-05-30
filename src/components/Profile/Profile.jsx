import s from './Profile.module.css';
import ProfileInfo from "./Profile Info/ProfileInfo";
import MyPostsContainer from "./My Posts/MyPostsContainer";


const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>
    )
};
export default Profile;