import { useState, useEffect } from 'react';
import { useBaseUrl } from '../context/BaseUrl/BaseUrlContext';
import axios from 'axios';

interface UseFetchProps {
    path: string;
}

const useFetch = ({ path }: UseFetchProps) => {
    const { baseUrl } = useBaseUrl();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = () => {
     axios
        .get(`${baseUrl}${path}`)
        .then(res => {
            //console.log("Data ",res.data);
            setData(res.data);
        })
        .catch(err => {
            setError(err.response);
        })
        .finally(() => {
            setLoading(false);
            //console.log(loading)
        });
    };

    useEffect(() => {
        fetchData();
    }, [baseUrl, path]);

    console.log("useFetch return value - data:", data, "loading:", loading, "error:", error);
    return { data, loading, error };
     
    
};

export default useFetch;
