import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form } from "antd";
import {SendOutlined} from "@ant-design/icons";

const AddMessageForm = (props: any) => {

    const { control, handleSubmit, reset } = useForm();

    const onSubmit = (data: any) => {
        const messageObject = { message: data.textMessage, photo: '', userId: 0, userName: 'Name' };
        props.addMessage(messageObject);
        reset();
    };

    return (
        <Form layout="inline" onFinish={handleSubmit(onSubmit)}>
            <Form.Item label="Message">
                <Controller
                    name="textMessage"
                    control={control}
                    render={({ field }) => <Input {...field} placeholder="Message..." style={{width: "100vh"}}/>}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
                    Send Message
                </Button>
            </Form.Item>
        </Form>
    )
};

export default AddMessageForm;
