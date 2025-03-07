<!-- UploadComponent.vue -->
<template>
  <n-upload
    accept="image/*,.pdf,.doc,.docx,.md"
    :custom-request="customRequest"
    :disabled="isUploading"
  >
    <n-upload-dragger>
      <div class="dnd-container">
        <div>
          <n-icon size="48" :depth="3">
            <CloudUploadOutline />
          </n-icon>
        </div>
        <n-text depth="1">点击或拖拽文件到此处上传</n-text>
        <n-p depth="3" style="margin: 0">
          支持格式：{{ allowedTypes.join(", ") }}
        </n-p>
      </div>
    </n-upload-dragger>
  </n-upload>
</template>

<script setup>
import { ref } from "vue";
import { NUpload, NUploadDragger, NIcon, NText, NP } from "naive-ui";
import { CloudUploadOutline } from "@vicons/ionicons5";
const { uploadFile } = useGitlabFiles();
const emit = defineEmits(["upload-success", "upload-error"]);
const allowedTypes = ["image/*", ".pdf", ".doc", ".docx", ".md"];
const isUploading = ref(false);
const customRequest = async ({ file, onProgress, onFinish }) => {
  try {
    const base64Content = await readFileAsBase64(file.file);
    const response = await uploadFile({
      name: file.name,
      content: base64Content,
    });
    onFinish();
    emit("upload-success", response);
  } catch (error) {
    emit("upload-error", error);
  }
};

const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
  });
};
</script>

<style scoped>
.dnd-container {
  padding: 24px;
  text-align: center;
}
</style>
