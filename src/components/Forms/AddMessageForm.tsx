import {useForm} from "react-hook-form";
import React from "react";

const AddMessageForm = (props: any) => {

    const {register, handleSubmit, reset} = useForm();
    const onSubmit = (data: any) => {
        const messageObject = { message: data.textMessage, photo: '', userId: 0, userName: 'Name' };
        props.addMessage(messageObject);
        reset();
    };


    return (<form onSubmit={handleSubmit(onSubmit)} action="">
        <div>
            <textarea {...register('textMessage')} placeholder="Message..."/>
        </div>
        <button type="submit">Send Message</button>
    </form>);
}
export default AddMessageForm;