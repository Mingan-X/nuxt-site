export const useGitlabFiles = () => {
  const config = useRuntimeConfig();
  const uploadFile = ({ name, content }: any) => {
    return useRequest.post(
      `/projects/${
        config.public.projectId
      }/repository/files/${encodeURIComponent(name)}`,
      {
        branch: config.public.branch,
        commit_message: `Upload ${name}`,
        encoding: "base64",
        content,
      },
      {},
      true
    );
  };

  const deleteFiles = (path: any) => {
    return useRequest.delete(
      `/projects/${
        config.public.projectId
      }/repository/files/${encodeURIComponent(path)}`,
      {
        branch: config.public.branch,
        commit_message: `Delete ${path}`,
      },
      {},
      true
    );
  };

  const loadFiles = () => {
    return useRequest.get(
      `/projects/${config.public.projectId}/repository/tree`,
      {},
      {},
      true
    );
  };

  return { uploadFile, deleteFiles, loadFiles };
};
