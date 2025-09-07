import axios from 'axios';
import useSWR from 'swr';

// TODO: Enable to reuse.
async function fetcher(url: string): Promise<string | null> {
  const response = await axios.get(url);
  return response.data as string;
}

interface TrophySVGIconsResult {
  trophies: string | null;
  isLoading: boolean;
  isError: unknown;
}

export default function useTrophySVGIcons(url: string): TrophySVGIconsResult {
  // SWR 2.0: Using built-in 'isLoading' state for better UX
  // https://swr.vercel.app/blog/swr-v2#isloading
  // isLoading: true when request is ongoing and no data loaded yet
  // isValidating: true during any revalidation (including initial load)
  const { data, error, isLoading } = useSWR<string | null, Error>(url, fetcher);

  return {
    trophies: data || null,
    isLoading, // SWR 2.0 built-in state - more accurate than custom logic
    isError: error || null,
  };
}
