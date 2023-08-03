import React from "react";
// import { useState } from "react";
// import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "components/customHeader";
import StandardMessageForm from "components/customMessageForms/StandardMessageForm";

/* THERE'S A PROBLEM WITH MULTISOCKET FOR NOW IN CHAT ENGINE, THIS WILL BE USED WHEN THE PROBLEM IS SOLVED */

const Chat = ({ user, secret }) => {
  const chatProps = useMultiChatLogic(
    process.env.REACT_APP_PROJECT_ID,
    user,
    secret
  );

  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={(props) => {
          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;

/* SIMPLE 1-1 DM's */

// const Chat = ({ user, secret }) => {
//   const [username, setUsername] = useState("");

//   function createDirectChat(creds) {
//     getOrCreateChat(
//       creds,
//       { is_direct_chat: true, usernames: [username] },
//       () => setUsername("")
//     );
//   }

//   function renderChatForm(creds) {
//     return (
//       <div>
//         <input
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <button onClick={() => createDirectChat(creds)}>Create</button>
//       </div>
//     );
//   }

//   return (
//     <ChatEngine
//       height="100vh"
//       userName={user}
//       userSecret={secret}
//       projectID={process.env.REACT_APP_PROJECT_ID}
//       renderNewChatForm={(creds) => renderChatForm(creds)}
//     />
//   );
// };

// export default Chat;
