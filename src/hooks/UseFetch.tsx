import { useState, useEffect } from 'react';
import { useBaseUrl } from '../context/BaseUrl/BaseUrlContext';
import axios from 'axios';

interface UseFetchProps {
    path: string;
}

const useFetch = ({ path }: UseFetchProps) => {
    const { baseUrl } = useBaseUrl();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("Starting fetch for path:", path);
        fetchData();
    }, [baseUrl, path]);

    const fetchData = async () => {
        try {
            setLoading(true);
            console.log("Fetching data from:", `${baseUrl}${path}`);
            const response = await axios(`${baseUrl}${path}`);
            const result = response.data; // no need to await response.data as axios already resolves it
            console.log("Fetched data:", result);
            if (result.status === false) {
                throw new Error('Network response was not ok');
            } else {
                setData(result);
            }
        } catch (error) {
            console.error("Error fetching data:", (error as Error).message);
            setError((error as Error).message);
        } finally {
            setLoading(false);
            console.log("Fetch complete. Data:", data);
        }
    };

    console.log("useFetch return value - data:", data, "loading:", loading, "error:", error);
    return { data, loading, error };
};

export default useFetch;
