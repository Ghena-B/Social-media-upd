import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { Input, Button } from 'antd';

const AddPostForm = (props) => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();

    const onSubmit = data => {
        props.addPost(data.postText);
        setValue('postText', '');  // Clear the text from the TextArea
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Controller
                    name="postText"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Please add text',
                        maxLength: {
                            value: 10,
                            message: 'Please enter no more than 10 characters'
                        }
                    }}
                    render={({ field }) =>
                        <Input.TextArea
                            {...field}
                            placeholder="Max 10 characters"
                        />
                    }
                />
                {errors.postText && <span className="error">{errors.postText.message}</span>}
            </div>
            <Button type="primary" htmlType="submit" style={{marginTop: 10}}>
                Add Post
            </Button>
        </form>
    );
};

export default AddPostForm;
