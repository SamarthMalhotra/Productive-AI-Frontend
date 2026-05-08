import { v4 as uuidv4 } from "uuid";
import styles from "./Sidebar.module.css";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { TfiPencilAlt } from "react-icons/tfi";
import { contextApi } from "./ContextAPI/context";
import { ImMenu } from "react-icons/im";
const SideBar = () => {
  const {
    deleteThread,
    accessHistory,
    data,
    setPrompt,
    setPrevChat,
    setReply,
    setNewChat,
    setCurrentThr,
    currentThr,
    getHistory,
  } = useContext(contextApi)!;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    accessHistory();
  }, [currentThr]);
  const handleClick = () => {
    setPrompt("");
    setReply(null);
    setPrevChat([]);
    setNewChat(true);
    setCurrentThr(uuidv4());
  };
  return (
    <>
      {" "}
      {visible ? (
        <span
          className={styles["croseIcon"]}
          onClick={() => {
            setVisible(!visible);
          }}
        >
          <RiDeleteBack2Fill />
        </span>
      ) : (
        <span
          className={styles["toggleIcon"]}
          onClick={() => {
            setVisible(!visible);
          }}
        >
          <ImMenu />
        </span>
      )}
      <section
        className={
          visible
            ? `${styles["sidebar"]} ${styles["visibleSidebar"]}`
            : `${styles["sidebar"]} ${styles["hiddenSidebar"]}`
        }
      >
        <button onClick={handleClick}>
          <img
            src="https://res.cloudinary.com/duryxhwcp/image/upload/v1768023219/blacklogo_1_s9er6g.png"
            className={styles["logo"]}
            alt="gpt logo"
          ></img>
          <span>
            <TfiPencilAlt className={styles["logo-icon"]} />
          </span>
        </button>
        <ul className={styles["history"]}>
          <h4>History:</h4>
          {data?.map((thread, threadId) => (
            <li
              key={threadId}
              onClick={() => getHistory(thread.threadId)}
              className={styles["thread"]}
            >
              <span>{thread.title}</span>
              <span
                className={styles["deleteIcon"]}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteThread(thread.threadId);
                }}
              >
                {" "}
                <MdDeleteForever />
              </span>
            </li>
          ))}
        </ul>
        <p className={styles["welcome-text"]}>Welcome to Productive AI</p>
      </section>
    </>
  );
};
export default SideBar;
