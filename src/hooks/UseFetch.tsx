import { useState, useEffect } from 'react';
import { useBaseUrl } from '../context/BaseUrl/BaseUrlContext';
import axios from 'axios';

interface UseFetchProps {
    path: string;
    trigger?: boolean;
}

const useFetch = ({ path , trigger }: UseFetchProps) => {
    const { baseUrl } = useBaseUrl();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = () => {
     axios
        .get(`${baseUrl}${path}`)
        .then(res => {
            //console.log("Data ",res.data);
            setData(res.data);
        })
        .catch(err => {
            //setError(err.response && err.response.data.error.message);
            console.log(err);
            setError(null);
        })
        .finally(() => {
            setLoading(false);
            //console.log(loading)
        });
    };

    useEffect(() => {
        fetchData();
    }, [path , trigger]);

    console.log("useFetch return value - data:", data, "loading:", loading, "error:", error);
    return { data, loading, error };
     
    
};

export default useFetch;
