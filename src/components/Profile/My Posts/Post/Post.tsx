import React from "react";
import {LikeOutlined} from "@ant-design/icons";

type PropsType = {
    message: string
    likesCount: string
}
const Post: React.FC<PropsType> = (props) => {
    return (
        <div style={{padding: 10}}>{props.message}
            <div><LikeOutlined /> {props.likesCount}</div>
        </div>


    )
};
export default Post;