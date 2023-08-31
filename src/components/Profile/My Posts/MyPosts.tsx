import s from './MyPosts.module.css';
import Post from "./Post/Post";
import React from 'react';
import AddPostForm from "../../Forms/AddPostForm";
import {PostsType} from "../../../APItypes/APItypes";
import {Card} from "antd";

type PropsType = {
    posts: Array<PostsType>
    isOwner: boolean
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<PropsType> = React.memo((props) => {

    let postsElement = props.posts.map((p) => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>);
    return <Card title="My posts" >
    <div className={s.posts}>
        <div className={s.posts__addPost}>
            {props.isOwner && <AddPostForm addPost={props.addPost}/>} </div>
        <div className={s.post}>{postsElement}</div>
    </div>
        </Card>
});
export default MyPosts;