<!-- GitlabPage.vue -->
<template>
  <n-space vertical :size="24">
    <n-card title="文件上传">
      <upload
        @upload-success="handleUploadSuccess"
        @upload-error="handleUploadError"
      />
    </n-card>

    <n-card title="文件列表">
      <file-list :files="files" @delete="handleDeleteFile" />
    </n-card>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMessage } from "naive-ui";
const message = useMessage();
const files = ref([]);
const { loadFiles, deleteFile } = useGitlabFiles();

onMounted(async () => {
  await refreshFileList();
});

const refreshFileList = async () => {
  try {
    const data = await loadFiles();
    files.value = data.map((item) => ({
      ...item,
      url: generateRawUrl(item.path),
    }));
  } catch (error) {
    message.error("加载文件列表失败");
  }
};

const generateRawUrl = (path) => {
  const config = useRuntimeConfig();
  return `https://gitlab.com/api/v4/projects/${
    config.public.projectId
  }/repository/files/${encodeURIComponent(path)}/raw?ref=${
    config.public.branch
  }`;
};

const handleUploadSuccess = async () => {
  await refreshFileList();
  message.success("文件上传成功！");
};

const handleUploadError = (error) => {
  message.error(`上传失败: ${error.data?.message || error.message}`);
};

const handleDeleteFile = async (path) => {
  try {
    await deleteFile(path);
    await refreshFileList();
    message.success("文件删除成功");
  } catch (error) {
    message.error(`删除失败: ${error.data?.message}`);
  }
};
</script>
