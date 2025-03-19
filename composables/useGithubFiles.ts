export const useGitlabFiles = () => {
  const config = useRuntimeConfig();
  const uploadImgFile = (fileData: any) => {
    return useRequest.post("/api/uploadImage", fileData, {
      "Content-Type": "multipart/form-data",
    });
  };

  const uploadDocFile = (fileData: any) => {
    return useRequest.post("/api/uploadDoc", fileData, {
      "Content-Type": "multipart/form-data",
    });
  };

  const deleteFiles = (data: any) => {
    return useRequest.post("/api/deleteFile", data, {});
  };

  const loadImgFiles = () => {
    return useRequest.get("/api/getImages", {}, {});
  };

  const loadDocFiles = () => {
    return useRequest.get("/api/getDocs", {}, {});
  };

  const getFileContent = (path: any) => {
    return useRequest.get(
      "/api/getFileContent",
      {
        path,
      },
      {}
    );
  };

  return {
    uploadImgFile,
    uploadDocFile,
    deleteFiles,
    loadImgFiles,
    loadDocFiles,
    getFileContent,
  };
};
