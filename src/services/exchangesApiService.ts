import axios from 'axios';

const baseUrl = 'https://api.coingecko.com/api/v3/exchanges';

export async function getExchanges(
  perPage: number = 100,
  pageIndex: number = 1
) {
  try {
    const response = await axios.get(
      `${baseUrl}/?per_page=${perPage}&page=${pageIndex}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
