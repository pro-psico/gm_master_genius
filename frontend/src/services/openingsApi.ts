import axios from "axios";
import type {
  ApiListResponse,
  ApiSingleResponse,
  Opening,
  OpeningLineResponse
} from "../types/opening";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

type GetOpeningsParams = {
  search?: string;
  eco?: string;
  category?: string;
  page?: number;
  limit?: number;
};

export const getOpenings = async (
  params: GetOpeningsParams = {}
): Promise<ApiListResponse<Opening>> => {
  const response = await apiClient.get<ApiListResponse<Opening>>("/openings", {
    params: {
      search: params.search?.trim() || undefined,
      eco: params.eco?.trim() || undefined,
      category: params.category?.trim() || undefined,
      page: params.page ?? 1,
      limit: params.limit ?? 30
    }
  });

  return response.data;
};

export const getOpeningById = async (
  id: string
): Promise<ApiSingleResponse<Opening>> => {
  const response = await apiClient.get<ApiSingleResponse<Opening>>(
    `/openings/${encodeURIComponent(id)}`
  );

  return response.data;
};

export const getOpeningLine = async (
  id: string
): Promise<ApiSingleResponse<OpeningLineResponse>> => {
  const response = await apiClient.get<ApiSingleResponse<OpeningLineResponse>>(
    `/openings/${encodeURIComponent(id)}/line`
  );

  return response.data;
};

export const lookupOpeningByFen = async (
  fen: string
): Promise<ApiSingleResponse<Opening>> => {
  const response = await apiClient.get<ApiSingleResponse<Opening>>(
    "/openings/lookup/by-fen",
    {
      params: {
        fen
      }
    }
  );

  return response.data;
};