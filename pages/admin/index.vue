<!-- GitlabPage.vue -->
<template>
  <div class="min-w-80vw">
    <n-space v-if="!showMdEditor" vertical :size="24">
      <n-card class="max-w-800px mx-auto" title="文件上传">
        <upload
          @upload-success="handleUploadSuccess"
          @upload-error="handleUploadError"
        />
      </n-card>
      <n-card title="文件列表" v-if="filesList.length > 0">
        <file-list
          :files="filesList"
          @delete="handleDeleteFile"
          @edit="handleEditFile"
        />
      </n-card>
      <n-card title="图片列表" v-if="imgsList.length > 0">
        <img-list :files="imgsList" @delete="handleDeleteFile" />
      </n-card>
    </n-space>
    <md-editor v-if="showMdEditor" :path="editPath" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useMessage } from "naive-ui";
const message = useMessage();
const filesList = ref<any>([]);
const imgsList = ref<any>([]);
const { loadImgFiles, deleteFiles, loadDocFiles } = useGitlabFiles();
const showMdEditor = ref(false);
const editPath = ref("");
onMounted(async () => {
  await refreshFileList();
});

const handleEditFile = (path: string) => {
  editPath.value = path;
  showMdEditor.value = true;
};

const refreshFileList = async () => {
  try {
    const imgRes: any = await loadImgFiles();
    const docRes: any = await loadDocFiles();
    filesList.value = docRes.data || [];
    imgsList.value = imgRes.data || [];
  } catch (error) {
    message.error("加载文件列表失败");
  }
};

const handleUploadSuccess = async () => {
  await refreshFileList();
  message.success("文件上传成功！");
};

const handleUploadError = (error: any) => {
  message.error(`上传失败: ${error.data?.message || error.message}`);
};

const handleDeleteFile = async (deleteInfo: any) => {
  try {
    await deleteFiles({
      path: deleteInfo.path,
      sha: deleteInfo.sha,
    });
    await refreshFileList();
    message.success("文件删除成功");
  } catch (error: any) {
    message.error(`删除失败: ${error.data?.message}`);
  }
};
</script>
