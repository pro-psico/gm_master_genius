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
  timeout: 8000,
  headers: {
    "Content-Type": "application/json"
  }
});

export const getOpenings = async (search?: string): Promise<ApiListResponse<Opening>> => {
  const response = await apiClient.get<ApiListResponse<Opening>>("/openings", {
    params: {
      search: search?.trim() || undefined
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