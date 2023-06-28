import React, {useEffect, useState} from "react";

const ProfileStatusWithHooks = (props) => {
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
    let onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    };

    return (<div>
        {!editMode && <div onDoubleClick={props.isOwner ? editModeOn : undefined}>status: {status || "----"}</div>}
        {editMode && <div>
            <input onChange={onStatusChange} type="text" value={status}
                   onBlur={editModeOff} autoFocus={true}/>
        </div>}
    </div>);
}
export default ProfileStatusWithHooks;

