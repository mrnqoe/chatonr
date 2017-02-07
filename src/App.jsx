import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
    console.log("Rendering <App/>");
    return (
      this.setState({
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]
      }))
      <div>
        <MessageList/>
        <ChatBar/>
      </div>
    );
  }
}

export default App;
