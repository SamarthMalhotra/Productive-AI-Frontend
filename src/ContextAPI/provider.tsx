import { contextApi } from "./context.tsx";
import { useState } from "react";
import { toast } from "sonner";
import {
  accessData,
  signupApi,
  loginApi,
  ans,
  getHistoryThread,
  deleteThreadApi,
} from "./Services/apiCall.tsx";
import testToken from "./testToken.tsx";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
type history = {
  _id: string;
  threadId: string;
  title: string;
};
type signup = {
  usename?: string;
  email: string;
  password: string;
};
type prevchat = {
  role: string;
  content: string;
};
function ContextProvider({ children }: { children: React.ReactNode }) {
  //history
  let [data, setData] = useState<history[] | null>(null);
  let [reply, setReply] = useState<string | null>(null);
  let [link, setLink] = useState(false);
  let [newChat, setNewChat] = useState(true);
  let navigate = useNavigate();
  let [prompt, setPrompt] = useState("");
  let [prevChat, setPrevChat] = useState<prevchat[]>([]);
  let [currentThr, setCurrentThr] = useState(uuidv4());
  let [formData, setFormData] = useState<signup>({
    usename: "",
    email: "",
    password: "",
  });
  let [loader, setLoader] = useState(false);
  //Access the Single history
  const getHistory = async (id: string) => {
    const token: string = localStorage.getItem("token")!;

    if (!token || testToken(token)) {
      toast.error("Something went wrong. Try again.");
      return;
    }
    try {
      const response = await getHistoryThread(id, token);
      if (response.length > 0) {
        setReply(null);
        setPrevChat([...response]);
        setNewChat(false);
      } else {
        setPrevChat([]);
      }
      return;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknown error");
      }
    }
  };
  //Access the history of  user query if exists
  const accessHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Handle case where token is not available}
      toast.error("You are not logged in. Please log in or SignUp first.");
      return;
    }
    const history: any = await accessData(token);

    if (history && history.length > 0) {
      const newhistory = history.filter((item: history) => {
        return !data?.some((d) => d._id === item._id);
      });

      setData((prevData) => [...newhistory, ...(prevData || [])]);
    }
    setLink(true);
  };
  //Signup Route
  const signup = async () => {
    // Implement signup logic here
    try {
      let { email, password }: signup = formData;
      email: email.trim();
      password: password.trim();
      // Make API call to signup endpoint
      const result = await signupApi({
        ...formData,
        email,
        password,
      });
      if (result && result.success) {
        localStorage.setItem("token", result.token);
        toast.success("Welcome on Productive AI.");
        navigate("/");
        setFormData({ email: "", password: "" });
      } else {
        toast.error("Signup failed. Please try again.");
      }
      setLink(true);
    } catch (error) {
      // Handle error
      toast.error("Signup failed. Please try again.");
    }
  };
  //login Function
  const login = async () => {
    try {
      localStorage.removeItem("token");
      let { email, password }: signup = formData;
      email: email.trim();
      password: password.trim();
      const result = await loginApi({ email, password });
      if (result && result.success) {
        localStorage.setItem("token", result.token);
        toast.success("Welcome on Productive AI.");
        navigate("/");
        setFormData({ email: " ", password: " " });
      } else {
        toast.error(`Error : ${result.message}.`);
      }
      setLink(true);
    } catch (error) {
      toast.error("Error Occured in Login");
    }
  };
  //Get GPT Response
  const getReply = async (prompt: string) => {
    try {
      setLoader(true);
      setNewChat(false);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please go for Login or Signup to use the service.");
        setLoader(false);
        return;
      }
      const query = await ans(prompt, token, currentThr);
      if (query.reply.length > 0) {
        setReply(query.reply);
        setLoader(false);
      } else {
        setReply("Try Again ...");
        setLoader(false);
      }
      return;
    } catch (error) {
      setLoader(false);
      return toast.error("Error Occurred in Reply.");
    }
  };
  //Delete Thread
  const deleteThread = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token || testToken(token)) {
      toast.error("Something went wrong. Try again.");
      return;
    }
    try {
      const response = await deleteThreadApi(id, token);
      if (response.success) {
        setData(
          (prevData) =>
            prevData?.filter((item) => item.threadId !== id) || null,
        );
        toast.success("Thread deleted successfully.");
      } else {
        toast.error("Failed to delete thread. Please try again.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknown error");
      }
    }
  };
  return (
    <contextApi.Provider
      value={{
        accessHistory,
        data,
        formData,
        setFormData,
        signup,
        login,
        link,
        setLink,
        setData,
        reply,
        getReply,
        setReply,
        loader,
        newChat,
        prevChat,
        setPrevChat,
        prompt,
        setPrompt,
        setNewChat,
        currentThr,
        setCurrentThr,
        getHistory,
        deleteThread,
      }}
    >
      {children}
    </contextApi.Provider>
  );
}

export default ContextProvider;
