import s from './MyPosts.module.css';
import Post from "./Post/Post";
import React from 'react';

const MyPosts = (props) => {
    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    let postsElement = props.posts.map((p) => <Post message={p.message} likesCount={p.likesCount}/>);
    return (
        <div className={s.posts}>
            <div className={s.posts__title}>My posts</div>
            <div className={s.posts__addPost}>
                <textarea  onChange={onPostChange} value={props.newPostText} name="" id="" cols="30" rows="10" ref={newPostElement}/>
                <button onClick={onAddPost}>Add Post</button>
            </div>
            {postsElement}
        </div>

    )
};
export default MyPosts;