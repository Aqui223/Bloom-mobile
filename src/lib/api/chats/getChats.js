import axios from "axios";
import { createSecureStorage } from "@lib/Storage";
import { API_URL } from "@constants/Api";

export default async function getChats() {
  const Storage = await createSecureStorage("user-storage");

  const token = Storage.getString("token");

  const response = await axios.get(`${API_URL}/chats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
