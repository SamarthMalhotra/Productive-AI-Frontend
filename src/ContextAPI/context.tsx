import { createContext } from "react";
type history = {
  _id: string;
  threadId: string;
  title: string;
};
type prevchat = { role: string; content: string };
interface project {
  accessHistory: () => void;
  data: history[] | null;
  formData: { email: string; password: string; username?: string };
  setFormData: React.Dispatch<
    React.SetStateAction<{ email: string; password: string; username?: string }>
  >;
  signup: () => void;
  login: () => void;
  link: boolean;
  getReply: (prompt: string) => void;
  setLink: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<history[] | null>>;
  reply: string | null;
  loader: boolean;
  newChat: boolean;
  prevChat: prevchat[];
  setPrevChat: React.Dispatch<React.SetStateAction<prevchat[] | []>>;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  setNewChat: React.Dispatch<React.SetStateAction<boolean>>;
  setReply: React.Dispatch<React.SetStateAction<string | null>>;
  getHistory: (id: string) => void;
  currentThr: string;
  setCurrentThr: React.Dispatch<React.SetStateAction<string>>;
  deleteThread: (id: string) => void;
}

export const contextApi = createContext<project | null>(null);
