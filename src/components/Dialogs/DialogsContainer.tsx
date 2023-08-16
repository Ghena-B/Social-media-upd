import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {actions, DialogsType, MessagesType} from "../../redux/dialogs-reducer";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    newMessageText: string
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}
type MapDispatchPropsType = {
    sendMessage: (newMessageText: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        newMessageText: state.dialogsPage.newMessageText,
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
};

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
    return {
        sendMessage: (newMessageText) => {
            dispatch(actions.sendMessageActionCreator(newMessageText))
        }
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);