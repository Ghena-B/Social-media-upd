import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    let contactsElement = Object.entries(props.profile.contacts);
    return (
        <div>
            <div className={s.main__bgImage}>
                <img
                    src="https://i0.wp.com/www.flutterbeads.com/wp-content/uploads/2022/01/add-image-in-flutter-hero.png?fit=2850%2C1801&ssl=1"
                    alt=""/>
            </div>
            <div className={s.profileInfo}>
                <div className={s.profileInfo__image}>
                    <img src={props.profile.photos.large || 'https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP-1200x1200.jpg'} alt=""/>
                </div>
                <div className={`${s.profileInfo__info} ${s.infoProfile}`}>
                    <div className={s.infoProfile__name}>{props.profile.fullName}</div>
                    <div className={s.infoProfile__about}>{props.profile.aboutMe}</div>
                    <div className={s.infoProfile__job}>{props.profile.lookingForAJobDescription} <br/> city:
                        Ungheni <br/> age: 24
                    </div>
                    <div className={s.infoProfile__contact}>
                        {contactsElement.map(([key, value]) => {
                                if (value === null) {
                                    return null;
                                }
                                return (
                                    <div key={key}>
                                        <strong>{key}: </strong>
                                        <span>
                                            <a href="{value}">{value}</a></span>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default ProfileInfo;