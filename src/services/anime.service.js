import axios from "axios";
import rateLimit from "axios-rate-limit";

const api = axios.create();

const apiWithRateLimit = rateLimit(api, {
  maxRequests: 1,
  perMilliseconds: 1000,
});

export const getAnime = async (page, apiConfig) => {
  const { baseURL, limit } = apiConfig;
  const itemsPerPage = limit || 24;

  const response = await apiWithRateLimit.get(
    `${baseURL}&limit=${itemsPerPage}&page=${page}`
  );

  const data = response.data;

  const totalItems = data?.pagination?.items?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    data: data?.data || [],
    totalPages,
  };
};

export const getCarouselAnime = async () => {
  const response = await apiWithRateLimit.get(
    "https://api.jikan.moe/v4/top/anime?limit=6"
  );
  return response.data.data;
};

export const getDetailAnime = async (mal_id) => {
  const response = await apiWithRateLimit.get(
    `https://api.jikan.moe/v4/anime/${mal_id}`
  );
  return response.data.data;
};

export const getEpisodeAnime = async (mal_id) => {
  const response = await apiWithRateLimit.get(
    `https://api.jikan.moe/v4/anime/${mal_id}/episodes`
  );
  return response.data?.data || [];
};

export const getAnimeGenresList = async () => {
  const response = await apiWithRateLimit.get(
    "https://api.jikan.moe/v4/genres/anime"
  );
  return response.data?.data || [];
};

export const getAnimeGenre = async (page, apiConfig, mal_id) => {
  const { baseURL, limit } = apiConfig;
  const itemsPerPage = limit || 24;

  const response = await apiWithRateLimit.get(
    `${baseURL}${mal_id}&limit=${itemsPerPage}&page=${page}`
  );

  const data = response.data;

  const totalItems = data?.pagination?.items?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    data: data?.data || [],
    totalPages,
  };
};
