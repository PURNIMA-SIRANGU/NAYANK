import api from "@/lib/axios";

export const loginUser = async (
  email: string,
  password: string
) => {
  const response =
    await api.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

  return response.data;
};

export const registerUser =
  async (data: any) => {
    const response =
      await api.post(
        "/auth/register",
        data
      );

    return response.data;
  };

export const changePassword =
  async (
    userId: string,
    currentPassword: string,
    newPassword: string
  ) => {
    const response =
      await api.post(
        "/auth/change-password",
        {
          userId,
          currentPassword,
          newPassword,
        }
      );

    return response.data;
  };