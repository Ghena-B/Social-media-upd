import s from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = (props) => {

    let postsElement = props.posts.map( (p) => <Post message ={p.message} likesCount = {p.likesCount}/>);
    return (
        <div className={s.posts}>
            <div className={s.posts__title}>My posts</div>
            <div className={s.posts__addPost}></div>
            {postsElement}
        </div>

    )
};
export default MyPosts;