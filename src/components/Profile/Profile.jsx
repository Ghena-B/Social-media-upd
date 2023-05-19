import s from './Profile.module.css';
import MyPosts from "./My Posts/MyPosts";
import ProfileInfo from "./Profile Info/ProfileInfo";


const Profile = (props) => {
    debugger;
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts} dispatch={props.dispatch} newPostText={props.profilePage.newPostText}/>
        </div>
    )
};
export default Profile;