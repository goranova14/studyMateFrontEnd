// const MessageReceived = (props) => {
//     return (
//         <div>
//             <b>{props.from}</b>: {props.text} {props.direct ? <b>(direct)</b> : ''}
//         </div>
//     );
// };

const ChatMessagesPlaceholder = (props) => {
    return (
        <div>
      {props.messagesReceived.map((message, index) => (
        <div key={index}>
          <p>{message.name}</p><p2>: {message.message.text}</p2>
          <p class="small ms-3 mb-3 rounded-3 text-muted">Delivered on: <br></br>{new Date().getDate()}/{new Date().getMonth()}/{new Date().getDate()}-{new Date().getHours()}:{new Date().getMinutes()}</p>

        </div>
      ))}
    </div>
    );
}

export default ChatMessagesPlaceholder;