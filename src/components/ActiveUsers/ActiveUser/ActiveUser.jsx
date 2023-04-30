import s from './ActiveUser.module.css';

const ActiveUser = (props) => {
    return (
        <div >
                <div className={s.user}>
                    <div className={s.image}>
                        <img src={props.src} alt=""/>
                        <div className={s.dot}></div>
                    </div>
                    <div className={s.name}>{props.name}</div>
                </div>

        </div>)
};
export default ActiveUser;