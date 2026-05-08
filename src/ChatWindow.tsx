import styles from "./ChatWindow.module.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosSunny } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { TbMoonStars } from "react-icons/tb";
import { ScaleLoader } from "react-spinners";
import { Link } from "react-router-dom";
import Chat from "./Chat.js";
import { contextApi } from "./ContextAPI/context";
import { useNavigate } from "react-router-dom";
//import Chat from "./Chat";
const ChatWindow = () => {
  const [mode, setMode] = useState("dark-theme");
  const {
    link,
    setLink,
    setData,
    getReply,
    loader,
    reply,
    setPrevChat,
    prompt,
    setPrompt,
  } = useContext(contextApi)!;
  const navigate = useNavigate();
  //Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setPrevChat([]);
    setLink(false);
    setData(null);
    navigate("/");
  };
  //To set the theme or mode
  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  useEffect(() => {
    if (prompt.length > 0 && reply) {
      setPrevChat((prevChat) => [
        ...prevChat,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);

      setPrompt("");
    }
  }, [reply]);
  return (
    <div className={styles.chatWindow}>
      {/* ================= NAVBAR ================= */}
      <header className={styles["navbar"]}>
        <h6 className={styles["logo"]}>
          Productive AI &nbsp;
          <IoMdArrowDropdown className={styles["dropdownIcon"]} />
        </h6>
        <div className={styles["navActions"]}>
          <span
            className={styles["themeToggle"]}
            aria-label="Toggle theme"
            onClick={() => {
              setMode((prevMode) =>
                prevMode === "dark-theme" ? "light-theme" : "dark-theme",
              );
            }}
          >
            {mode === "dark-theme" ? <TbMoonStars /> : <IoIosSunny />}
          </span>
          <div className={styles["authLinks"]}>
            {link ? (
              <span onClick={handleLogout} className={styles["logout"]}>
                Logout
              </span>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </header>
      {/* ================= DROPDOWN =================
      <div className={styles["dropDown"]}>
        <button className={styles["dropDownItem"]}>
          <i className="fa-solid fa-cloud-arrow-up"></i>
          <span>Upgrade Plan</span>
        </button>

        <button className={styles["dropDownItem"]}>
          <i className="fa-solid fa-gear"></i>
          <span>Settings</span>
        </button>

        <button className={`${styles["dropDownItem"]} ${styles["logout"]}`}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Log Out</span>
        </button>
      </div> */}
      <div className={styles["loader"]} aria-live="polite"></div>
      {/* ================= CHAT AREA ================= */}
      <main className={styles["chatBox"]}>
        {" "}
        <div className={styles["chat"]}>
          <Chat />
        </div>
      </main>

      {/* ================= INPUT ================= */}
      <footer className={styles["chatInput"]}>
        {loader && (
          <ScaleLoader
            color={mode == "dark-theme" ? "white" : "black"}
          ></ScaleLoader>
        )}
        <div className={styles["inputBox"]}>
          <input
            type="text"
            placeholder="Ask anything..."
            aria-label="Chat input"
            value={prompt}
            onChange={(e: any) => setPrompt(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                getReply(prompt);
              }
            }}
          />

          <span
            className={styles["submit"]}
            aria-label="Send message"
            onClick={() => getReply(prompt)}
          >
            <FaLocationArrow className={styles["submitIcon"]} />
          </span>
        </div>

        <p className={styles["info"]}>
          Productive AI can make mistakes. Check important information.{" "}
          <a href="#">Cookies Preferences</a>
        </p>
      </footer>
    </div>
  );
};

export default ChatWindow;
