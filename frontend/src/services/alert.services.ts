import api from "@/lib/axios";

export const getAlerts =
  async () => {
    const response =
      await api.get(
        "/alerts"
      );

    return response.data;
  };

export const markAlertRead =
  async (
    id: string
  ) => {
    const response =
      await api.patch(
        `/alerts/${id}/read`
      );

    return response.data;
  };