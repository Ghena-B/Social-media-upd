import s from './MyPosts.module.css';
import Post from "./Post/Post";
import React from 'react';
import {useForm} from "react-hook-form";

const MyPosts = React.memo((props) => {

    let postsElement = props.posts.map((p) => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>);
    return (<div className={s.posts}>
        <div className={s.posts__title}>My posts</div>
        <div className={s.posts__addPost}>
            <AddPostForm addPost={props.addPost}/></div>
        <div>{postsElement}</div>
    </div>)
});
export default MyPosts;

const AddPostForm = (props) => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = data => props.addPost(data.postText);
    return (<form onSubmit={handleSubmit(onSubmit)} action="">
        <div>
            <textarea {...register('postText', {
                required: 'Please add text', maxLength: {
                    value: 10, message: 'Please enter no more than 10 characters'
                }
            })} placeholder="Max 10 characters" name="postText"/>
            {errors.postText && <span className="error">{errors.postText.message}</span>}
        </div>
        <button type="submit">Add Post</button>
    </form>)
};

/*<div>
                <textarea {...register('postText', {
                    required: 'Please add text', maxLength: {
                        value: 10, message: 'Please enter no more than 10 characters'
                    }
                })} placeholder="Max 10 characters" name="postText"/>
            {errors.postText && <span className="error">{errors.postText.message}</span>}
        </div>*/
