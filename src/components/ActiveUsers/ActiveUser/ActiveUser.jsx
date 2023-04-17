import s from './ActiveUser.module.css';

const ActiveUser = () => {
    return (
        <div >

                <div className={s.user}>
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt=""/>
                    <div className={s.name}>Ghena</div>
                </div>
        </div>)
};
export default ActiveUser;