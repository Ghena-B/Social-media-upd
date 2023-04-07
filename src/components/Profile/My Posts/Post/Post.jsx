const Post = (props) => {
    return (
        <div>{props.message}
            <div>Likes:{props.likesCount}</div>
        </div>


    )
};
export default Post;