import { useState, useEffect } from "react";
import { createSecureStorage } from "@lib/storage";

export default function useTokenCheck() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let listener;
    let storageInstance;

    const init = async () => {
      try {
        storageInstance = await createSecureStorage("user-storage");
        const token = storageInstance.getString("token");
        setIsAuthenticated(!!token);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  return { isAuthenticated, isLoading };
}
