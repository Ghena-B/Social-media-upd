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

const {Header} = Layout;

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
            <Row gutter={22} justify="space-between" align="middle" style={{ display: 'flex' }}>
                <Col className="gutter-row" lg={2} sm={2}>
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
                <Col lg={20} className="gutter-row" >
                    {location.pathname !== '/users' &&
                        <FilterUsersForm onFilterChanged={onFilterChanged}
                                         redirectOnSubmit={true}/>}
                </Col>
                {props.isAuthorized ?
                    <Col className="gutter-row" lg={2} sm={1} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 30 }}>
                        <Button type="default"
                                shape="round"
                                size={"large"}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsCardVisible(!isCardVisible);
                                }}
                        style={{display: "flex", alignItems: "center", position: "relative"}}>
                            <Avatar size='default'
                                    src={profileImageURL}/>
                            <SettingOutlined/>
                        </Button>
                        {isCardVisible &&
                            <Card style={{width: 300, marginTop: 50, marginRight: 16, float: 'right', zIndex: "999", position: "absolute"}}
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
