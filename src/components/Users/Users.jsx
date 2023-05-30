import s from "./Users.module.css";
import React from "react";
import {NavLink} from "react-router-dom";
import {default as axios} from "axios";

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount/props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let curP = props.currentPage;
    let curPF = ((curP - 5) < 0) ?  0  : curP - 5 ;
    let curPL = curP + 5;
    let slicedPages = pages.slice( curPF, curPL)
    return (
        <div>
            {slicedPages.map(p => {
                return <span onClick={(e) => {props.onPageChanged(p)}} className={props.currentPage === p && s.selectedPage}> {p}</span>
            })}
            {
                props.users.map(u => <div key={u.id}>
                        <div>
                            <NavLink to={`/profile/${u.id}`}><img src={u.photos.small || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                      alt=""/></NavLink>
                            <div>
                                {u.followed
                                    ? <button onClick={() => {
                                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {withCredentials: true, headers: {"API-KEY": "Headers: {API_KEY: aaa062f9-3ee2-456c-be0d-291eec7c2ba2}"}})
                                            .then((response) => {
                                            if (response.data.resultCode === 0) {
                                                props.unfollow(u.id)
                                            }
                                    })}}>Unfollow</button>
                                    : <button onClick={() => {
                                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {withCredentials: true, headers: {"API-KEY": "Headers: {API_KEY: aaa062f9-3ee2-456c-be0d-291eec7c2ba2}"}})
                                            .then((response) => {
                                                if (response.data.resultCode === 0) {
                                                    props.follow(u.id)
                                                }
                                            })}}>Follow</button>}
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </div>
                            <div>
                                <div>{'u.location.cityName'}</div>
                                <div>{'u.location.countryName'}</div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default Users;