import s from '../ProfileInfo.module.css';
import React, {ChangeEvent, useEffect, useState} from "react";
import {Input} from "antd";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
}
const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    },[props.status]);

    let editModeOn = () => {
        setEditMode(true)
    };
    let editModeOff = () => {
        setEditMode(false);
        props.updateStatus(status)
    };
    let onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    };

    return <div>
        <div className={s.statusTitle}>Status</div>
        {!editMode && <div className={s.statusText} onDoubleClick={props.isOwner ? editModeOn : undefined}>{status || "----"}</div>}
        {editMode && <div>
            <Input onChange={onStatusChange} type="text" value={status}
                   onBlur={editModeOff} autoFocus={true}/>
        </div>}
    </div>;
}
export default ProfileStatusWithHooks;

