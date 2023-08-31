import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Row, Col, Input, Button, Segmented } from 'antd';
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import {useNavigate, useSearchParams} from "react-router-dom";

export const FilterUsersForm = (props: any) => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const defaultTerm = searchParams.get('term') || '';
    const defaultFriend = searchParams.get('friend') || 'null';

    const { register, handleSubmit, control, setValue } = useForm({
        defaultValues: {
            term: defaultTerm,
            friend: defaultFriend
        }
    });
    useEffect(() => {
        setValue('term', searchParams.get('term') || '');
        setValue('friend', searchParams.get('friend') || 'null');
    }, [searchParams, setValue]);

    const onSubmit = (data: any) => {
        let filter = {
            term: data.term,
            friend: data.friend === "null" ? null : data.friend === "true"
        };
        props.onFilterChanged(filter);
        if (props.redirectOnSubmit) {
            const queryParams = new URLSearchParams({
                term: filter.term,
                friend: filter.friend !== null ? filter.friend.toString() : ''
            }).toString();
            navigate(`/users?${queryParams}`);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={22}>
                <Col className="gutter-row" span={5} >
                    <Controller
                        name="term"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                size="large"
                                placeholder="Search Users"
                                prefix={<UserOutlined />}
                            />
                        )}
                    />
                </Col>
                <Col className="gutter-row">
                    <Controller
                        name="friend"
                        control={control}
                        render={({ field }) => (
                            <Segmented
                                options={[
                                    { label: 'All', value: 'null' },
                                    { label: 'Followed', value: 'true' },
                                    { label: 'Unfollowed', value: 'false' }
                                ]}
                                size="large"
                                value={field.value}
                                onChange={value => field.onChange(value)}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </Col>
                <Col className="gutter-row" >
                    <Button type="primary" shape="circle" icon={<SearchOutlined />} htmlType="submit"></Button>
                </Col>
            </Row>
        </form>
    );
}
