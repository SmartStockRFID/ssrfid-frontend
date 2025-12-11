import { useEffect, useState } from "react";
import type { ApplicationException } from "@/exceptions";
import { RequestStatus } from "@/types";

interface UseFetchReturn<T> {
  data: T | null;
  status: RequestStatus;
}

export function useFetchData<T>(
  mutation: () => Promise<T | ApplicationException>,
): UseFetchReturn<T> {
  const [requestStatus, setRequestStatus] = useState(RequestStatus.PENDING);
  const [data, setData] = useState<T | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation> [] -> We just want to run on mount
  useEffect(() => {
    async function attemptFetch() {
      const result = await mutation();
      if (result instanceof Error) {
        setRequestStatus(RequestStatus.ERROR);
      } else {
        setData(result);
        setRequestStatus(RequestStatus.SUCCESS);
      }
    }
    attemptFetch();
  }, []);

  return {
    data,
    status: requestStatus,
  };
}
