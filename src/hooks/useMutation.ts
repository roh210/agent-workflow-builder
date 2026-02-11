import { useState } from "react";

interface UseMutationOptions<T, P, C = T> {
  url: string | ((payload: P) => string);
  method: "POST" | "PUT" | "DELETE";
  onMutate?: (payload: P) => { previousData: C | null };
  onSuccess?: (response: T | null) => void;
  onError?: (error: string, context: { previousData: C | null }) => void;
}

export const useMutation = <T, P, C = T>({
  url,
  method,
  onMutate,
  onSuccess,
  onError,
}: UseMutationOptions<T, P, C>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  const mutate = async (payload: P) => {
    setLoading(true);
    const prevData = onMutate ? onMutate(payload).previousData : null;
    try {
      const response = await fetch(typeof url === "function" ? url(payload) : url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      if (response.status === 204) {
        if (onSuccess) onSuccess(null); // Handle no content response
        return;
      }
      const data: T = await response.json();
      if (onSuccess) onSuccess(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
      if (onError)
        onError(error instanceof Error ? error.message : String(error), {
          previousData: prevData,
        });
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};
// Returns:
/*{
edge cases to handle - 204 No Content response
  mutate: (payload) => Promise<void>,  // trigger the mutation
  loading: boolean,
  error: string | null,
}
 */
