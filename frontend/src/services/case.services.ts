import api from "@/lib/axios";

export const createCase =
  async (data: any) => {
    const response =
      await api.post(
        "/cases",
        data
      );

    return response.data;
  };

export const getCases =
  async () => {
    const response =
      await api.get(
        "/cases"
      );

    return response.data;
  };

export const getCase =
  async (id: string) => {
    const response =
      await api.get(
        `/cases/${id}`
      );

    return response.data;
  };

export const getUserCases =
  async (
    userId: string
  ) => {
    const response =
      await api.get(
        `/cases/user/${userId}`
      );

    return response.data;
  };