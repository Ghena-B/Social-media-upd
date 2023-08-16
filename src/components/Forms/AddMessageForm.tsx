import {useForm} from "react-hook-form";
import React from "react";

const AddMessageForm = (props: any) => {
    const {register, handleSubmit} = useForm();
    const onSubmit = (data: any) => {
        return props.sendMessage(data.textMessage);
    };
    return (<form onSubmit={handleSubmit(onSubmit)} action="">
        <div>
            <textarea {...register('textMessage')} placeholder="Message..."/>
        </div>
        <button type="submit">Send Message</button>
    </form>);
}
export default AddMessageForm;