export const useGitlabFiles = () => {
  const config = useRuntimeConfig();
  const uploadImgFile = (fileData: any) => {
    return useRequest.post("/uploadImage", fileData, {
      "Content-Type": "multipart/form-data",
    });
  };

  const uploadDocFile = (fileData: any) => {
    return useRequest.post("/uploadDoc", fileData, {
      "Content-Type": "multipart/form-data",
    });
  };

  const deleteFiles = (data: any) => {
    return useRequest.post("/deleteFile", data, {});
  };

  const loadImgFiles = () => {
    return useRequest.get("/getImages", {}, {});
  };

  const loadDocFiles = () => {
    return useRequest.get("/getDocs", {}, {});
  };

  const getFileContent = (path: any) => {
    return useRequest.get(
      "/getFileContent",
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
