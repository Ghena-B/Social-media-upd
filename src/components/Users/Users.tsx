import React, {useEffect} from "react";
import User from "./User";
import s from './Users.module.css'
import Paginator from "../common/Paginator/Paginator";
import {FilterUsersForm} from "../Forms/FilterUsersForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import {FilterType, follow, requestUsers, unfollow} from "../../redux/users-reducer";
import {useNavigate, useSearchParams} from "react-router-dom";

type PropsType = {}
type QueryParamsType = {
    term?: string;
    page?: string;
    friend?: string
}
export const Users: React.FC<PropsType> = () => {
    const users = useSelector(getUsers)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getUsersFilter)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const parsed: QueryParamsType = Object.fromEntries([...searchParams]);

        let actualPage = parsed.page ? Number(parsed.page) : currentPage;
        let actualFilter = {...filter};

        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term};

        switch (parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null};
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true};
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false};
                break;
        }

        if (actualPage !== currentPage || actualFilter !== filter) {
            dispatch(requestUsers(actualPage, pageSize, actualFilter));
        }

    }, [searchParams]);

    useEffect(() => {
        const newParams: any = {};

        if (filter.term) newParams.term = filter.term;
        if (filter.friend !== null) newParams.friend = String(filter.friend);
        if (currentPage !== 1) newParams.page = String(currentPage);

        const searchString = new URLSearchParams(newParams).toString();

        if (searchString !== searchParams.toString()) {
            navigate({ pathname: '/users', search: `?${searchString}` });
        }

    }, [filter, currentPage]);

    const onPageChanged = (pageNumber: number | "...") => {
        if (typeof pageNumber === "number") {
            dispatch(requestUsers(pageNumber, pageSize, filter))
        }
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const handleFollow = (userId: number) => {
        dispatch(follow(userId));
    }
    const handleUnfollow = (userId: number) => {
        dispatch(unfollow(userId));
    }
    return (<div>
        <FilterUsersForm onFilterChanged={onFilterChanged}/>
        <Paginator onPageChange={onPageChanged}
                        currentPage={currentPage}
                        totalCount={totalUsersCount}
                        pageSize={pageSize}
        />
        <div className={s.cards}>
            {users.map(u => <User user={u} key={u.id}
                                  followingInProgress={followingInProgress}
                                  follow={handleFollow}
                                  unfollow={handleUnfollow}
            />)}
        </div>
    </div>)
}
