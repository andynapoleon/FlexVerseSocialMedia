import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import CustomerHeader from "components/customHeader";
import StandardMessageForm from "components/customMessageForms/StandardMessageForm";

const Chat = () => {
  const projectID = process.env.REACT_APP_PROJECT_ID;
  const chatProps = useMultiChatLogic(
    projectID,
    "testuser", //username
    "1234" //password
  );
  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket
        {...chatProps} /* connect to React chat engine website SOCKET*/
      />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => (
          <CustomerHeader chat={chat} /* COMPONENT customizable for UI */ />
        )}
        renderMessageForm={(props) => {
          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} /> // curently active chat
          );
        }}
      />
    </div>
  );
};

export default Chat;
