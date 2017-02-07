import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      currentId: 3,
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
    // console.log(this.state.messages);
  }

  newMess(newMessage){
    console.log("this state:",this.state);
    const messages = this.state.messages.concat(newMessage);
    console.log("messages",messages);
    this.state.currentId += 1;
    this.setState({messages: messages});
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar defaultValue={this.state.currentUser} newMess={this.newMess.bind(this)} currentId={this.state.currentId}/>
      </div>
    );
  }
}

export default App;

// componentDidMount() {
//   // console.log("componentDidMount <App />");
//   setTimeout(() => {
//     // console.log("Simulating incoming message");
//     // Add a new message to the list of messages in the data store
//     const id = this.state.genId(this.state.messages);
//     const newMessage = {
//       messid: id,
//       username: this.props.currentUser,
//       content: this.props.message};
//     const messages = this.state.messages.concat(newMessage)
//     // Update the state of the app component.
//     // Calling setState will trigger a call to render() in App and all child components.
//     this.setState({messages: messages})
//   }, 1000);
// }
