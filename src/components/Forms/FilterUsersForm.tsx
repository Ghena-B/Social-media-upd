import {useForm} from "react-hook-form";
import {FilterType} from "../../redux/users-reducer";
import React from "react";

export const FilterUsersForm = (props: any) => {
    const {register, handleSubmit} = useForm();
    const onSubmit = (data: any) => {
        const filter: FilterType = {
            term: data.term,
            friend: data.friend === "null" ? null : data.friend === "true"
        }
        props.onFilterChanged(filter)
    }
    return (<form onSubmit={handleSubmit(onSubmit)} action="">
        <div>
            <input {...register('term')} type="text" name="term"/>
        </div>
        <div>
            <select {...register("friend")}>
                <option value="null">Show all</option>
                <option value="true">Followed</option>
                <option value="false">Unfollowed</option>
            </select>
        </div>
        <button type="submit">Find</button>
    </form>);
}