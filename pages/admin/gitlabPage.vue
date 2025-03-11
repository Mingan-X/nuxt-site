<!-- GitlabPage.vue -->
<template>
  <n-space vertical :size="24">
    <n-card title="文件上传">
      <upload
        @upload-success="handleUploadSuccess"
        @upload-error="handleUploadError"
      />
    </n-card>
    <n-card title="文件列表" v-if="filesList.length > 0">
      <file-list :files="filesList" @delete="handleDeleteFile" />
    </n-card>
    <n-card title="图片列表" v-if="imgsList.length > 0">
      <img-list :files="imgsList" @delete="handleDeleteFile" />
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useMessage } from "naive-ui";
const message = useMessage();
const files = ref([]);
const filesList = ref<any>([]);
const imgsList = ref<any>([]);
const { loadFiles, deleteFiles } = useGitlabFiles();
const imgTypeList = ["png", "jpg", "jpeg", "bmp", "gif", "webp"];
onMounted(async () => {
  await refreshFileList();
});

const refreshFileList = async () => {
  try {
    const data: any = await loadFiles();
    files.value = data.map((item: any) => ({
      ...item,
      url: generateRawUrl(item.path),
    }));

    filesList.value = files.value.filter((item: any) => {
      return !imgTypeList.includes(item.name.split(".").pop());
    });
    imgsList.value = files.value.filter((item: any) => {
      return imgTypeList.includes(item.name.split(".").pop());
    });
    console.log(filesList.value);
  } catch (error) {
    message.error("加载文件列表失败");
  }
};

const generateRawUrl = (path: string) => {
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

const handleUploadError = (error: any) => {
  message.error(`上传失败: ${error.data?.message || error.message}`);
};

const handleDeleteFile = async (path: string) => {
  try {
    await deleteFiles(path);
    await refreshFileList();
    message.success("文件删除成功");
  } catch (error: any) {
    message.error(`删除失败: ${error.data?.message}`);
  }
};
</script>
