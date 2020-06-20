import api from '../services/api';

export default async function (title: string) {
  const apiKey = process.env.API_GIPHY_KEY;
  const data = await api.giphy.get(
    `/search?q=${title.trim()}&api_key=${apiKey}&limit=1`,
  );
  const url = (await data.data.data[0].images.original.url) as string;

  return url;
}
