import {Component} from "react";

class ProfileStatus extends Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    editModeOn() {
        this.setState({
            editMode: true
        })
    }
    editModeOff = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange(e){
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.status !== prevProps.status) {
            this.setState({
                state: this.props.status
            })
        }
    }
    render() {
        return (<div>
            {!this.state.editMode && <div onDoubleClick={this.editModeOn.bind(this) }>status: {this.props.status || "----"}</div>}
            {this.state.editMode && <div>
                <input onChange={this.onStatusChange.bind(this)} type="text" value={this.state.status} onBlur={this.editModeOff.bind(this)} autoFocus={true}/>
            </div>}
        </div>);
    }
}

export default ProfileStatus;