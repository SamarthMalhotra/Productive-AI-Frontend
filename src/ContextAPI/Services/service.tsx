export type thread = {
  _id: string;
  threadId: string;
  title: string;
  messages: {
    role: string;
    content: string;
    _id: string;
    timestamp: string;
  }[];
};
