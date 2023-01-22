import { apiSlice } from "../api/apiSlice";
import { IAttatchmentReq, IAttatchmentResponse } from "./attatchment.types";

export const attatchmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadAttatchment: builder.mutation<IAttatchmentResponse, IAttatchmentReq>({
      query: ({ body, folderName }) => ({
        url: `/attatchment/${folderName}`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});
export const { useUploadAttatchmentMutation } = attatchmentApi;
