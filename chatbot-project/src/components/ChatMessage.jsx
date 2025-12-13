import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';

import './ChatMessage.css'

export function ChatMessage({message, sender}) { // destructure the object in the parameter
  // function ChatMessage(props) {
  // const message = props.message;
  // const sender = props.sender;

  // const { message, sender } = props;
  
  // Guard operator &&: If !LHS, then nothing. If LHS, then RHS.
  // the HTML in the () is just done to separate to next line. Optional.
  return (
    <div className={sender==='user' ? 'chat-message-user' : 'chat-message-robot'}>
      {sender === 'robot' && (
        <img src={RobotProfileImage} className="chat-message-profile"/>
      )}
      <div className="chat-message-text">
        {message}
      </div>
      {sender === 'user' && 
      (<img src={UserProfileImage} className="chat-message-profile"/>
      )}
    </div>
  );
}