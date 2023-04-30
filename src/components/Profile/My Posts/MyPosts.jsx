import s from './MyPosts.module.css';
import Post from "./Post/Post";
import React from 'react';

const MyPosts = (props) => {
    let newPost = React.createRef();
    let addPost = () => {
        alert(newPost.current.value)
    }
    let postsElement = props.posts.map((p) => <Post message={p.message} likesCount={p.likesCount}/>);
    return (
        <div className={s.posts}>
            <div className={s.posts__title}>My posts</div>
            <div className={s.posts__addPost}>
                <textarea name="" id="" cols="30" rows="10" ref={newPost}></textarea>
                <button onClick={addPost}>Add Post</button>
            </div>
            {postsElement}
        </div>

    )
};
export default MyPosts;