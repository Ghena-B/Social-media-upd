import s from "./Users.module.css";
import React from "react";

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
                            <div><img src={u.photos.small || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                      alt=""/></div>
                            <div>
                                {u.followed
                                    ? <button onClick={() => {
                                        props.unfollow(u.id)
                                    }}>Unfollow</button>
                                    : <button onClick={() => {
                                        props.follow(u.id)
                                    }}>Follow</button>}
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