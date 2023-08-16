import React from "react";

type PropsType = {
    message: string
    likesCount: string
}
const Post: React.FC<PropsType> = (props) => {
    return (
        <div>{props.message}
            <div>Likes:{props.likesCount}</div>
        </div>


    )
};
export default Post;