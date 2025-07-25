import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NormalizedFetchNotesResponse extends FetchNotesResponse {
  page: number;
  perPage: number;
}

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = "",
}: FetchNotesParams): Promise<NormalizedFetchNotesResponse> {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("perPage", String(perPage));
  if (search) params.append("search", search);

  const res: AxiosResponse<FetchNotesResponse> = await api.get(
    `/notes?${params.toString()}`
  );

  return {
    ...res.data,
    page,
    perPage,
  };
}

export async function createNote(
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> {
  const res: AxiosResponse<Note> = await api.post("/notes", note);
  return res.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return res.data;
}
