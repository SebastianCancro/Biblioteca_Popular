import { api } from "./api";

export const fileService = {
    UploadFile : (data) => api.post("/files/upload", data,
        { headers: { "Content-Type": "multipart/form-data" } }
    )
              .then(response => {
                  return response;
              })
};
