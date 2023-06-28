import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, updateProfileInfo, updateProfilePhoto, updateStatus} from "../../redux/profile-reducer";
import {compose} from "redux";
import {withRouter} from "../../hoc/WithRouter";


class ProfileContainer extends React.Component {
    componentDidMount() {
        const userId = this.props.router.params.userId;
        if (!userId) {
            if (!this.props.authUserId) return

            this.props.router.navigate(`/profile/${this.props.authUserId}`)
        } else {
            this.props.getProfile(userId)
            this.props.getStatus(userId)
        }
    }
    componentDidUpdate(prevProps) {
        const userId = this.props.router.params.userId;
        if (this.props.authUserId !== prevProps.authUserId) {
            this.props.router.navigate(`/profile/${this.props.authUserId}`)
        } else if (userId !== prevProps.router.params.userId) {
            this.props.getProfile(userId)
            this.props.getStatus(userId)
        }
    }
    render() {
        const isOwner = this.props.router.params.userId == this.props.authUserId;
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                updateProfilePhoto={this.props.updateProfilePhoto}
                isOwner={isOwner}
                updateProfileInfo={this.props.updateProfileInfo}
            />
        )
    }

}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authUserId: state.auth.userID
    }
}

export default compose(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, updateProfilePhoto, updateProfileInfo}),
    withRouter,
)(ProfileContainer)