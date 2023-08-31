import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Checkbox, Button, Form } from "antd";

const ProfileUserDataForm = ({ profile, editModeOff, updateProfileInfo }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: profile,
    });

    const onSubmit = data => {
        updateProfileInfo(data);
        editModeOff();
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Form.Item label="Full Name" error={errors.fullName && errors.fullName.message}>
                <Controller
                    name="fullName"
                    control={control}
                    rules={{ required: "Full name is required" }}
                    render={({ field }) => <Input {...field} />}
                />
            </Form.Item>

            <Form.Item label="About Me">
                <Controller
                    name="aboutMe"
                    control={control}
                    render={({ field }) => <Input.TextArea {...field} />}
                />
            </Form.Item>

            <Form.Item>
                <Controller
                    name="lookingForAJob"
                    control={control}
                    render={({ field }) => (
                        <Checkbox {...field} checked={field.value}>
                            Looking for a job
                        </Checkbox>
                    )}
                />
            </Form.Item>

            <Form.Item label="Job Description">
                <Controller
                    name="lookingForAJobDescription"
                    control={control}
                    render={({ field }) => <Input.TextArea {...field} />}
                />
            </Form.Item>

            {Object.entries(profile.contacts).map(([name, url]) => (
                <Form.Item key={name} label={name}>
                    <Controller
                        name={`contacts.${name}`}
                        control={control}
                        rules={{
                            pattern: {
                                value: /^(https?:\/\/)?[a-z0-9]+([-.][a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
                                message: 'Invalid website name',
                            }
                        }}
                        render={({ field }) => <Input {...field} />}
                    />
                    {errors.contacts && errors.contacts[name] && <span>{errors.contacts[name].message}</span>}
                </Form.Item>
            ))}

            <Button type="primary" htmlType="submit">
                Save changes
            </Button>
        </Form>
    );
};

export default ProfileUserDataForm;
