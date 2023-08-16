import {useForm} from "react-hook-form";
import React from "react";

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
export default AddPostForm;