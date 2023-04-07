import s from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div className={s.posts}>
            <div className={s.posts__title}>My posts</div>
            <div className={s.posts__addPost}></div>
            <Post message = 'Hi, how are you?' likesCount = '23'/>
            <Post message = 'I am using props' likesCount = '12' />
        </div>

    )
};
export default MyPosts;