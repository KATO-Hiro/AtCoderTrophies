import axios from 'axios';
import useSWR from 'swr';

// TODO: Enable to reuse.
async function fetcher(url: string): Promise<string | null> {
  const response = await axios.get(url);
  return response.data as string;
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export default function useTrophySVGIcons(url: string): any {
  const { data, error } = useSWR(url, fetcher);

  return {
    trophies: data as string,
    isLoading: !error && !data,
    isError: error as unknown,
  };
}
