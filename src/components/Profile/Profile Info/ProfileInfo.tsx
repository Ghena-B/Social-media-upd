import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./Profile Status/ProfileStatusWithHooks";
import React, {ChangeEvent, useState} from "react";
import ProfileUserDataForm from "../../Forms/ProfileUserDataForm";
import {ProfileType} from "../../../APItypes/APItypes";
type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    updateProfilePhoto: (file: File) => void
    updateProfileInfo: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = (props) => {
    const {profile, status, isOwner, updateProfilePhoto, updateStatus, updateProfileInfo} = props;
    let [editMode, setEditMode] = useState(false);
    let editModeOn = () => {
        setEditMode(true)
    };
    let editModeOff = () => {
        setEditMode(false);
    };
    if (!profile) {
        return <Preloader/>
    }
    return <div>
        <div className={s.main__bgImage}>
            <img
                src="https://i0.wp.com/www.flutterbeads.com/wp-content/uploads/2022/01/add-image-in-flutter-hero.png?fit=2850%2C1801&ssl=1"
                alt=""/>
        </div>
        <div className={s.profileInfo}>
            <ProfileUserImage updateProfilePhoto={updateProfilePhoto}
                              isOwner={isOwner}
                              profile={profile}/>
            <div className={`${s.profileInfo__info} ${s.infoProfile}`}>
                <ProfileStatusWithHooks status={status}
                                        updateStatus={updateStatus}
                                        isOwner={isOwner}/>
                {!editMode ? <ProfileUserData profile={profile}/> :
                    <ProfileUserDataForm profile={profile} editModeOff={editModeOff}
                                         updateProfileInfo={updateProfileInfo}/>}
                {!editMode && <ProfileUserContacts profile={profile}/>}
                {isOwner && !editMode && <button onClick={editModeOn}>Update</button>}
            </div>
        </div>
    </div>
};
export default ProfileInfo;

type ProfileUserDataType = {
    profile: ProfileType
}
const ProfileUserData: React.FC<ProfileUserDataType> = ({profile}) => {
    return <div>
        <div className={s.infoProfile__name}>Name: {profile.fullName}</div>
        <div className={s.infoProfile__about}>About me: {profile.aboutMe}</div>
        <div className={s.infoProfile__job}>Looking for a job: {profile["lookingForAJob"] ? "Yes" : "No"}</div>
        <div className={s.infoProfile__job}>Job description: {profile.lookingForAJobDescription}</div>
    </div>
};

type ProfileUserContactsType = {
    profile: ProfileType
}
const ProfileUserContacts: React.FC<ProfileUserContactsType> = ({profile}) => {
    if (!profile.contacts) {
        return null;
    }

    let contactsElement = Object.entries(profile.contacts);
    return <div>
        {contactsElement.map(([key, value]) => {
            if (value === null) {
                return null;
            }
            return (<div key={key}>
                <strong>{key}: </strong>
                <span><a href={value}>{value}</a></span>
            </div>)
        })}
    </div>
};

type ProfileUserImageType = {
    profile: ProfileType
    isOwner: boolean
    updateProfilePhoto: (file: File) => void
}
const ProfileUserImage: React.FC<ProfileUserImageType> = ({profile, updateProfilePhoto, isOwner}) => {
    let handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            updateProfilePhoto(e.target.files[0]);
        }
    };
    const defaultImageURL = 'https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP-1200x1200.jpg';
    const profileImageURL = profile.photos?.large || defaultImageURL;
    return <div>
        <div className={s.profileInfo__image}>
            <img
                src={profileImageURL}
                alt=""/>
        </div>
        <div>{isOwner && <input type="file" onChange={handleFileChange}/>}</div>
    </div>
};

