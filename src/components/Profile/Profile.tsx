import s from './Profile.module.css';

import MyPostsContainer from "./My Posts/MyPostsContainer";
import {ProfileType} from "../../APItypes/APItypes";
import React from "react";
import ProfileInfo from "./Profile Info/ProfileInfo";

type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    updateProfilePhoto: (file: File) => void
    updateProfileInfo: (profile: ProfileType) => Promise<any>
}
const Profile: React.FC<PropsType> = (props) => {
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