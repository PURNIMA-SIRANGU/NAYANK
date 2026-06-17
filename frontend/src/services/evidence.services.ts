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

export const getEvidence =
  async (
    evidenceId: string
  ) => {
    const response =
      await api.get(
        `/evidence/${evidenceId}`
      );

    return response.data;
  };