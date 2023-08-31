import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Checkbox, Button, Form, Image } from "antd";

const LoginForm = (props) => {

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        props.login(data.email, data.password, data.rememberMe, data.captcha);
    }

    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Form.Item label="Email" error={errors.email && errors.email.message}>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email format'
                        }
                    }}
                    render={({ field }) => <Input {...field} type="email" placeholder="Login" style={{width: 300}}/>}
                />
            </Form.Item>

            <Form.Item label="Password" error={errors.password && errors.password.message}>
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must have at least 6 characters',
                        }
                    }}
                    render={({ field }) => <Input.Password {...field} placeholder="Password" style={{width: 300}}/>}
                />
            </Form.Item>

            <Form.Item>
                <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => (
                        <Checkbox {...field} checked={field.value}>
                            Remember Me
                        </Checkbox>
                    )}
                />
            </Form.Item>

            {props.captcha && (
                <Form.Item label="Captcha">
                    <Image src={props.captcha} alt="captcha" />
                    <Controller
                        name="captcha"
                        control={control}
                        rules={{ required: 'Captcha is required' }}
                        render={({ field }) => <Input {...field} placeholder="Enter captcha" />}
                    />
                    {errors.captcha && <span>{errors.captcha.message}</span>}
                </Form.Item>
            )}

            {props.errorMessage && <p>{props.errorMessage}</p>}

            <Button type="primary" htmlType="submit">
                Login
            </Button>
        </Form>
    )
};

export default LoginForm;
