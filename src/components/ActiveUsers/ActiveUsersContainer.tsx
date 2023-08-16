import {connect} from "react-redux";
import ActiveUsers from "./ActiveUsers";
import {AppStateType} from "../../redux/redux-store";
import {ActiveUsersType} from "../../redux/sidebar-reducer";

type MapStatePropsType = {
    activeUsers: Array<ActiveUsersType>
}
type MapDispatchPropsType = {}
type OwnPropsType = {}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        activeUsers: state.sidebar.activeUsers
    }
}
const mapDispatchToProps = (): MapDispatchPropsType => {
    return {}
}
const ActiveUsersContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(ActiveUsers)

export default ActiveUsersContainer;