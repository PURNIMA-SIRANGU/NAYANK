import api from "@/lib/axios";

export const uploadEvidence =
  async (data: any) => {
    const response =
      await api.post(
        "/evidence",
        data
      );

    return response.data;
  };

export const getCaseEvidence =
  async (
    caseId: string
  ) => {
    const response =
      await api.get(
        `/evidence/case/${caseId}`
      );

    return response.data;
  };