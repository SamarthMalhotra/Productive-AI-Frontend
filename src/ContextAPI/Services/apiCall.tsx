import { toast } from "sonner";
import server from "../Url";
export const accessData = async (token: String) => {
  try {
    const response = await fetch(`${server}/api/thread`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      toast.error("Failed to fetch history. Please Login First.");
    }
    return response.json();
  } catch (error) {
    toast.error("An error occurred while fetching history.");
  }
};
export const signupApi = async (userData: any) => {
  try {
    const response = await fetch(`${server}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      toast.error("Signup failed. Please try again.");
    }
    return response.json();
  } catch (error) {
    toast.error("An error occurred during signup. Please try again.");
  }
};
export const loginApi = async (userdata: any) => {
  try {
    const response = await fetch(`${server}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    });
    if (!response.ok) {
      toast.error(`Error: ${response}`);
    }
    return response.json();
  } catch (error) {
    toast.error("An Error occurred during Login. Please try Again.");
  }
};
export const ans = async (prompt: string, token: string, id: string) => {
  try {
    if (!prompt || prompt.trim() === "") {
      toast.error("Message cannot be empty");
      return;
    }
    const response = await fetch(`${server}/api/chat`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        threadId: id,
        message: prompt,
      }),
    });
    if (!response.ok) {
      toast.error(`Error ${response.status}`);
    }
    return response.json();
  } catch (error) {
    toast.error("An Error occurred in prompt. Please try Again.");
  }
};
export const getHistoryThread = async (id: string, token: string) => {
  try {
    const response = await fetch(`${server}/api/thread/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      toast.error(`Error:${response.status}`);
      throw new Error("Error...");
    } else {
      return response.json();
    }
  } catch (error) {
    throw new Error();
  }
};
export const deleteThreadApi = async (id: string, token: string) => {
  try {
    const response = await fetch(`${server}/api/thread/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      toast.error(`Error:${response.status}`);
      throw new Error("Error...");
    }
    return response.json();
  } catch (error) {
    throw new Error(
      "An error occurred while deleting the thread. Please try again.",
    );
  }
};
