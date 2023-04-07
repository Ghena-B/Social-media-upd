import s from './Profile.module.css';
import MyPosts from "./My Posts/MyPosts";

const Profile = () => {
    return (
        <div>
            <div className={s.main__bgImage}>
                <img
                    src="https://i0.wp.com/www.flutterbeads.com/wp-content/uploads/2022/01/add-image-in-flutter-hero.png?fit=2850%2C1801&ssl=1"
                    alt=""/>
            </div>
            <div className={s.profileInfo}>
                <div className={s.profileInfo__image}>
                    <img src="https://i.pinimg.com/474x/97/aa/84/97aa847d061a14894178805f1d551500.jpg" alt=""/>
                </div>
                <div className={`${s.profileInfo__info} ${s.infoProfile}`}>
                    <div className={s.infoProfile__name}>Ghena B</div>
                    <div className={s.infoProfile__contact}>future web developer <br/> city: Ungheni <br/> age: 24</div>
                </div>
            </div>
            <MyPosts/>
        </div>
    )
};
export default Profile;