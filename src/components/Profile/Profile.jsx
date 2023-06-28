import s from './Profile.module.css';
import ProfileInfo from "./Profile Info/ProfileInfo";
import MyPostsContainer from "./My Posts/MyPostsContainer";
import {updateProfileInfo} from "../../redux/profile-reducer";


const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         updateProfilePhoto={props.updateProfilePhoto}
                         isOwner={props.isOwner}
                         updateProfileInfo={props.updateProfileInfo}
            />
            <MyPostsContainer isOwner={props.isOwner} />
        </div>
    )
};
export default Profile;