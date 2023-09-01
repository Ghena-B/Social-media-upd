import React from "react";
import { useForm, Controller } from "react-hook-form";
import {Input, Button, Form, Row, Col} from "antd";
import {SendOutlined} from "@ant-design/icons";
import s from "./AddMessageFormStyle.module.css"
const AddMessageForm = (props: any) => {

    const { control, handleSubmit, reset } = useForm();

    const onSubmit = (data: any) => {
        const messageObject = { message: data.textMessage, photo: '', userId: 0, userName: 'Name' };
        props.addMessage(messageObject);
        reset();
    };

    return (
        <Form onFinish={handleSubmit(onSubmit)}>
            <Row gutter={16}>
                <Col xs={24} md={16} lg={20}>
                    <Form.Item >
                        <Controller
                            name="textMessage"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder="Message..." className={s.responsiveInput} />
                            )}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8} lg={4}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" icon={<SendOutlined />} className={s.responsiveButton}>
                            Send Message
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
};

export default AddMessageForm;

