import s from './MyPosts.module.css';
import Post from "./Post/Post";
import React from 'react';
import AddPostForm from "../../Forms/AddPostForm";
import {PostsType} from "../../../APItypes/APItypes";

type PropsType = {
    posts: Array<PostsType>
    isOwner: boolean
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<PropsType> = React.memo((props) => {

    let postsElement = props.posts.map((p) => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>);
    return (<div className={s.posts}>
        <div className={s.posts__title}>My posts</div>
        <div className={s.posts__addPost}>
            {props.isOwner && <AddPostForm addPost={props.addPost}/>} </div>
        <div>{postsElement}</div>
    </div>)
});
export default MyPosts;