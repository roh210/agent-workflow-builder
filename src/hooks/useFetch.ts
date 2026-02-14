import { handleApiError } from "@/lib/utils/api-error";
import { useEffect, useState } from "react";

export const useFetch = <T>(url: string, method?: RequestInit) => {
  const [data, setData] = useState<T| null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, method);
        if (!res.ok) {
          setError(`Error: ${res.status} ${res.statusText}`);
          return;
        }
        const data = await res.json();
        setData(data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, method, refetchIndex]);

  return { data, loading, error, refetch: () => setRefetchIndex(prev => prev + 1) };
};
