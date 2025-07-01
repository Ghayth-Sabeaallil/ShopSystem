// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import type { AxiosResponse } from "axios";
import axiosClient from "./axiosClient.ts";

const api = {
  get: async <T>(route: string, config = {}): Promise<AxiosResponse<T>> => axiosClient.get<T>(route, config),
  post: async <T>(route: string, data = {}, config = {}): Promise<AxiosResponse<T>> =>
    axiosClient.post<T>(route, data, config),
  put: async <T>(route: string, data = {}, config = {}): Promise<AxiosResponse<T>> =>
    axiosClient.put<T>(route, data, config),
  delete: async <T>(route: string, data?: any, config = {}): Promise<AxiosResponse<T>> =>
    axiosClient.delete<T>(route, {
      ...config,
      data,
    }),
};

export default api;
