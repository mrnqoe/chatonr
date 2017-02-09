import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      usr: ""
    }
  }

  handleUsr(event) {
    this.state.usr = event.target.value
  }

  handleSubmit(event) {
    const mess = {
      username: this.state.usr,
      content: event.target.value
    }
    event.keyCode === 13 ? (
      this.props.newMess(mess),
      // console.log("mess:",mess),
      event.target.value = ""
    ):(
      this.state.value = event.target.value
      // console.log("eventtarget:",event.target.value)
    )
  }

  render() {
    // console.log(this.state.value);
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          id="username"
          type="text"
          onChange={this.handleUsr.bind(this)}
          placeholder={this.props.currentUser} />

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
