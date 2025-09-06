import axios from 'axios';
import useSWR from 'swr';

// TODO: Enable to reuse.
async function fetcher(url: string): Promise<string | null> {
  try {
    const response = await axios.get(url);
    return response.data as string;
  } catch (error) {
    // Re-throw for SWR to handle
    throw error;
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export default function useTrophySVGIcons(url: string): any {
  // SWR 2.0: Using built-in 'isLoading' state for better UX
  // https://swr.vercel.app/blog/swr-v2#isloading
  // isLoading: true when request is ongoing and no data loaded yet
  // isValidating: true during any revalidation (including initial load)
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    trophies: data as string,
    isLoading, // SWR 2.0 built-in state - more accurate than custom logic
    isError: error as unknown,
  };
}
