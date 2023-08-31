import {NavLink, useLocation} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {Avatar, Button, Card, Col, Layout, Row} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import {FilterUsersForm} from "../Forms/FilterUsersForm";
import {FilterType, requestUsers} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getPageSize} from "../../redux/users-selectors";
import {AppStateType} from "../../redux/redux-store";

const {Header, Sider, Content} = Layout;

type PropsType = {
    isAuthorized: boolean
    login: string | null
    colorBgContainer: string
    logout: () => void
    collapsed: boolean,
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderOwn: React.FC<PropsType> = (props) => {
    const [isCardVisible, setIsCardVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const pageSize = useSelector(getPageSize);
    const profilePhoto = useSelector((state: AppStateType) => state.profilePage.profile?.photos?.small)
    const dispatch = useDispatch();
    const defaultImageURL = 'https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP-1200x1200.jpg';
    const profileImageURL = profilePhoto || defaultImageURL;
    const handleClickOutside = (event: any) => {
        if (cardRef.current && !cardRef.current.contains(event.target)) {
            setIsCardVisible(false);
        }
    };
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <Header style={{padding: 0, background: props.colorBgContainer}}>
            <Row>
                <Col span={2}>
                    <Button
                        type="text"
                        icon={props.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => props.setCollapsed(!props.collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Col>
                <Col style={{flex: 1}}>
                    {location.pathname !== '/users' &&
                        <FilterUsersForm onFilterChanged={onFilterChanged}
                                         redirectOnSubmit={true}/>}
                </Col>
                {props.isAuthorized ?
                    <Col span={2} style={{paddingRight: 20}}>
                        <Button type="default"
                                shape="round"
                                size={"large"}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsCardVisible(!isCardVisible);
                                }}>
                            <Avatar size='small'
                                    src={profileImageURL}/>
                            <SettingOutlined/>
                        </Button>
                        {isCardVisible &&
                            <Card style={{width: 300, marginTop: 10, marginRight: 16, float: 'right'}}
                                  ref={cardRef}>
                                <Meta
                                    avatar={<Avatar size={'large'} src={profileImageURL}/>}
                                    title={<span style={{fontWeight: '400'}}>Hello <span
                                        style={{color: '#31394D', fontWeight: '700'}}>{props.login}</span></span>}
                                    description="Have a good day!"
                                />
                                <div style={{paddingTop: '40px'}}>
                                    <Button type="primary" block onClick={props.logout}>
                                        Log out
                                    </Button>
                                </div>
                            </Card>
                        }
                    </Col>
                    : <NavLink to='/login'>
                        <div style={{paddingRight: 30, fontSize: 16}}>Login</div>
                    </NavLink>
                }
            </Row>
        </Header>
    )
};

export default HeaderOwn;
