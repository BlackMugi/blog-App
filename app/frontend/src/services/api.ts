import axios from 'axios';
import type { Article, ArticleInput } from '../types/Article';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getArticles = async (): Promise<Article[]> => {
  const response = await api.get<Article[]>('/articles');
  return response.data;
};

export const getArticleById = async (id: number): Promise<Article> => {
  const response = await api.get<Article>(`/articles/${id}`);
  return response.data;
};

export const createArticle = async (article: ArticleInput): Promise<Article> => {
  const response = await api.post<Article>('/articles', article);
  return response.data;
};

export const updateArticle = async (id: number, article: ArticleInput): Promise<Article> => {
  const response = await api.put<Article>(`/articles/${id}`, article);
  return response.data;
};

export const deleteArticle = async (id: number): Promise<void> => {
  await api.delete(`/articles/${id}`);
};