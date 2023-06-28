import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./Profile Status/ProfileStatusWithHooks";
import {useState} from "react";
import ProfileUserDataForm from "../../Forms/ProfileUserDataForm";

const ProfileInfo = (props) => {
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

const ProfileUserData = ({profile}) => {
    return <div>
        <div className={s.infoProfile__name}>Name: {profile.fullName}</div>
        <div className={s.infoProfile__about}>About me: {profile.aboutMe}</div>
        <div className={s.infoProfile__job}>Looking for a job: {profile["lookingForAJob"] ? "Yes" : "No"}</div>
        <div className={s.infoProfile__job}>Job description: {profile.lookingForAJobDescription}</div>
    </div>
};

const ProfileUserContacts = ({profile}) => {
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

const ProfileUserImage = ({profile, updateProfilePhoto, isOwner}) => {
    let handleFileChange = (e) => {
        if (e.target.files) {
            updateProfilePhoto(e.target.files[0]);
        }
    };
    return <div>
        <div className={s.profileInfo__image}>
            <img
                src={profile.photos.large || 'https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP-1200x1200.jpg'}
                alt=""/>
        </div>
        <div>{isOwner && <input type="file" onChange={handleFileChange}/>}</div>
    </div>
};

