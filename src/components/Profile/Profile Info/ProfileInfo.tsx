import s from '../Profile Info/ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./Profile Status/ProfileStatusWithHooks";
import React, {ChangeEvent, useEffect, useState} from "react";
import ProfileUserDataForm from "../../Forms/ProfileUserDataForm";
import {ProfileType} from "../../../APItypes/APItypes";
import {Button, Card, Input} from "antd";
import MyPostsContainer from "../My Posts/MyPostsContainer";
import {AuditOutlined, InfoOutlined, MonitorOutlined, NotificationOutlined} from "@ant-design/icons";

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
    let [editMode, setEditMode] = useState(isOwner);
    let editModeOn = () => {
        setEditMode(true)
    };
    let editModeOff = () => {
        setEditMode(false);
    };
    useEffect(() => {
    }, [isOwner]);

    if (!profile) {
        return <Preloader/>
    }
    return <div>
        <div className={s.profileBgImage}>
            <img
                src="https://i0.wp.com/www.flutterbeads.com/wp-content/uploads/2022/01/add-image-in-flutter-hero.png?fit=2850%2C1801&ssl=1"
                alt=""/>
        </div>
        <div className={s.profileContent}>
            <div className={s.profileHeader}>
                <div className={s.profileUserPhoto}>
                    <ProfileUserImage updateProfilePhoto={updateProfilePhoto}
                                      isOwner={isOwner}
                                      profile={profile}/>
                </div>
                <div className={s.profileUserStatus}>
                    <ProfileStatusWithHooks status={status}
                                            updateStatus={updateStatus}
                                            isOwner={isOwner}/>
                </div>
                <div className={s.profileUserEdit}>
                    {isOwner && !editMode && <Button onClick={editModeOn}>Update Profile</Button>}
                </div>
            </div>
            <hr/>
            <div className={s.profileUserContent}>
                    <Card title="Profile Presentation" className={s.profileUserInfo}>
                    {!editMode ?
                        <ProfileUserData profile={profile}/> :
                        <ProfileUserDataForm profile={profile}
                                             editModeOff={editModeOff}
                                             updateProfileInfo={updateProfileInfo}/>}
                    {!editMode && <ProfileUserContacts profile={profile}/>}
                    </Card>
                <div className={s.profileUserPosts}>
                    {props.isOwner && <MyPostsContainer isOwner={props.isOwner}/>}
                </div>
            </div>
        </div>
    </div>
};
export default ProfileInfo;

type ProfileUserDataType = {
    profile: ProfileType
}
const ProfileUserData: React.FC<ProfileUserDataType> = ({profile}) => {
    return <div className={s.infoProfile}>
            <div><AuditOutlined style={{ fontSize: '25px'}}/>
                <span className={s.infoProfile__name}><strong>Name:</strong> {profile.fullName}</span></div>
            <div><NotificationOutlined style={{ fontSize: '25px'}}/><span className={s.infoProfile__about}><strong>About me:</strong> {profile.aboutMe}</span></div>
            <div><MonitorOutlined style={{ fontSize: '25px'}}/><span className={s.infoProfile__job}><strong>Looking for a job:</strong> {profile["lookingForAJob"] ? "Yes" : "No"}</span></div>
            <div><InfoOutlined style={{ fontSize: '25px'}}/><span className={s.infoProfile__job}><strong>Job description:</strong> {profile.lookingForAJobDescription}</span></div>
    </div>
};

type ProfileUserContactsType = {
    profile: ProfileType
}

const ProfileUserContacts: React.FC<ProfileUserContactsType> = ({profile}) => {
    if (!profile.contacts) {
        return null;
    }
    const validContacts = Object.entries(profile.contacts).filter(([_, value]) => value !== null);

    if (validContacts.length === 0) {
        return null;
    }

    return (
        <div className={s.contactsProfile}>
            <div className={s.contactsProfileTitle}>Find me on: </div>
            {validContacts.map(([key, value]) => (
                <div key={key}>
                    <strong>{key}: </strong>
                    <span><a href={value}>{value}</a></span>
                </div>
            ))}
        </div>
    );
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
    return <>
        <div>
            <div>
                <img
                    src={profileImageURL}
                    alt=""/>
            </div>
            <div>{isOwner && <div><div>Change photo</div><Input type="file" style={{ width: '250px' }} onChange={handleFileChange}/></div>}</div>
        </div>
    </>
};

