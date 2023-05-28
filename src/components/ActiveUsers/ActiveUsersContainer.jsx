import s from './ActiveUsers.module.css';
import {connect} from "react-redux";
import ActiveUsers from "./ActiveUsers";

const mapStateToProps = (state) => {
    return {
        state: state.sidebar.activeUsers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}
const ActiveUsersContainer = connect(mapStateToProps, mapDispatchToProps)(ActiveUsers)
export default ActiveUsersContainer;