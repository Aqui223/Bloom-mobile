import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@constants/Api";

export default function useUserSearch(query = "") {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [query]);

    useEffect(() => {
        let ignore = false;

        if (!query.trim()) {
            setUsers([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        async function fetchUser() {
            try {
                const response = await axios.get(`${API_URL}/user/search?q=${query}&offset=${(page - 1) * 12}&limit=12`);
                
                if (!ignore) {
                    setUsers(response?.data || []);
                }
            } catch (err) {
                if (!ignore) {
                    setError(err);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        fetchUser();

        return () => {
            ignore = true;
        };

    }, [query, page]);

    function addPage() {
        setPage(prev => prev + 1);
    }

    return { loading, error, users, addPage };
}