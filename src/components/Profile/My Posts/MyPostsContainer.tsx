import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {actions} from "../../../redux/profile-reducer";
import {AppStateType} from "../../../redux/redux-store";
import {PostsType} from "../../../APItypes/APItypes";


let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        //newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(actions.addPostActionCreator(newPostText))
        }
    }
}
const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer;

type MapStatePropsType = {
    posts: Array<PostsType>
    //newPostText: string
}
type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}
type OwnPropsType = {
    isOwner: boolean
}
