import {useSelector} from "react-redux";
import React from 'react';
import {Users} from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {getIsFetching} from "../../redux/users-selectors";

const UsersPage: React.FC = () => {
    const isFetching = useSelector(getIsFetching)
    return <div>
        {isFetching ? <Preloader/> : null}
        <Users />
    </div>
}
export default UsersPage;