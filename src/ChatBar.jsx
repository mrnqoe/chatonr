import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      usr: this.props.currentUsr,
      newUsr: ""
    }
  }

  handleUsr(event) {
    event.keyCode === 13 ? (
      this.props.changeUsr(this.state.usr, this.state.newUsr),
      this.setState({
        usr: this.state.newUsr,
        newUsr: ""
      })
    ):(
      this.setState({
        newUsr: event.target.value
      })
    )
  }

  handleSubmit(event) {
    const mess = {
      username: this.state.usr,
      content: event.target.value,
      color: this.props.color
    }
    event.keyCode === 13 ? (
      this.state.newUsr ? (
        this.props.changeUsr(this.state.usr, this.state.newUsr),
        mess.username = this.state.newUsr,
        this.setState({
          usr: this.state.newUsr,
          newUsr: ""
        })
      ):(
        mess.username = this.props.currentUsr
      ),
      this.props.newMess(mess),
      event.target.value = ""
    ):(
      this.state.content = event.target.value
    )
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          id="username"
          type="text"
          onKeyUp={this.handleUsr.bind(this)}
          placeholder={this.props.currentUsr} />

        <input
          className="chatbar-message"
          id="new-message"
          type="text"
          onKeyUp={this.handleSubmit.bind(this)}
          placeholder="Type smthing yo" />
      </footer>
    );
  }
}

export default ChatBar;
