import axios, { Method } from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [userChatData, setUserChatData] = useState("");
  const [userChat, setUserChat] = useState("");
  const [answerhatData, setAnswerChatData] = useState("");
  const [messages, setMessages] = useState([]);
  const inputData = (e: any) => {
    setUserChatData(e.target.value);
  };

  const goog = () => {
    console.log(userChatData);
    setMessages([userChatData, ...messages]);
    setUserChat(userChatData);
    setUserChatData("");
  };
  useEffect(() => {
    const chatdata = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/answer/${userChat}`)
          .then((response) => response.json())
          .then((data) => setMessages([data.cal_result, ...messages]));
      } catch (e) {
        console.error(e);
      }
    };
    if (userChat) {
      console.log("aa");
      chatdata();
    }
  }, [userChat]);

  useEffect(() => {
    console.log(answerhatData);
  }, [answerhatData]);

  return (
    <>
      <div className="chat_wrap">
        <div className="header">CHAT</div>
        <div className="chat">
          <ul>
            {messages
              .slice(0)
              .reverse()
              .map((data, index) => {
                // if (index == 0) return;
                return (
                  <li>
                    <div className="sender">
                      <span>{index % 2 == 0 ? "유저" : "챗봇"}</span>
                    </div>
                    <div className="message">
                      <span>{data}</span>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="input-div">
          <textarea
            placeholder="Press Enter for send message."
            onChange={inputData}
            value={userChatData}
            // onChange={(e) => {
            //   setUserChatData(e.target.value);
            // }}
          ></textarea>
          <button onClick={goog}>등록</button>
        </div>
      </div>
    </>
  );
}
