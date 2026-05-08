import styles from "./Chat.module.css";
import { useContext, useEffect, useState } from "react";
import { contextApi } from "./ContextAPI/context";
import ReactMarkDown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
function Chat() {
  const { newChat, prevChat, reply } = useContext(contextApi)!;
  const [latestReply, setLatestReply] = useState<string | null>("");

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }
    if (!prevChat?.length) return;
    const content = reply.split("");
    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(""));
      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, [prevChat, reply]);
  return (
    <>
      {newChat && <h1>Start a new Chat...</h1>}

      <div className={styles["chats"]}>
        {/* Old Chats */}
        {prevChat?.slice(0, -1).map((chat, id) => (
          <div
            className={
              chat.role === "user" ? styles["userDiv"] : styles["gptDiv"]
            }
            key={id}
          >
            {chat.role === "user" ? (
              <p className={styles["userMessage"]}>{chat.content}</p>
            ) : (
              <ReactMarkDown rehypePlugins={[rehypeHighlight]}>
                {chat.content}
              </ReactMarkDown>
            )}
          </div>
        ))}
        {prevChat.length > 0 && (
          <>
            {latestReply === null ? (
              <div className={styles["gptDiv"]} key={"non-typing"}>
                <ReactMarkDown rehypePlugins={[rehypeHighlight]}>
                  {prevChat[prevChat.length - 1].content}
                </ReactMarkDown>
              </div>
            ) : (
              <div className={styles["gptDiv"]} key={"typing"}>
                <ReactMarkDown rehypePlugins={[rehypeHighlight]}>
                  {latestReply}
                </ReactMarkDown>{" "}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
export default Chat;

/* <div className={styles["userDiv"]}>
          <p className={styles["userMessage"]}>Q..........</p>
        </div>
        <div className={styles["gptDiv"]}>
          <p className={styles[""]}>Ans.........</p>
        </div>
      </div> */
/*
//       <div className={styles["chats"]}>
//         {prevChats?.slice(0, -1).map((chat, id) => (
//           <div
//             className={
//               chat.role === "user" ? styles["userDiv"] : styles["gptDiv"]
//             }
//             key={id}
//           >
//             {chat.role === "user" ? (
//               <p className={styles["userMessage"]}>{chat.content}</p>
//             ) : (
//               <ReactMarkDown rehypePlugins={[rehypeHighlight]}>
//                 {chat.content}
//               </ReactMarkDown>
//             )}
//           </div>
//         ))}
//         {prevChats.length > 0 && (
//           <>
//             {latestReply === null ? (
//               <div className={styles["gptDiv"]} key={"non-typing"}>
//                 <ReactMarkDown rehypePlugins={[rehypeHighlight]}>
//                   {prevChats[prevChats.length - 1].content}
//                 </ReactMarkDown>
//               </div>
//             ) : (
//               <div className={styles["gptDiv"]} key={"typing"}>
//                 <ReactMarkDown rehypePlugins={[rehypeHighlight]}>
//                   {latestReply}
//                 </ReactMarkDown>
//               </div>
//             )}
//           </>
//         )}
//       </div>*/
//</>
//   );
// } */}
