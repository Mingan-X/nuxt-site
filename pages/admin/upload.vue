<template>
  <div class="container">
    <!-- 上传区域 -->
    <div class="upload-section">
      <input
        type="file"
        ref="fileInput"
        @change="handleFileSelect"
        accept="image/*, .pdf, .doc, .docx, .md"
      />
      <button :disabled="!selectedFile || isUploading" @click="uploadFile">
        {{ isUploading ? `上传中...` : "上传到GitLab" }}
      </button>
    </div>

    <!-- 文件列表 -->
    <div class="file-list">
      <div v-for="file in files" :key="file.id" class="file-item">
        <span>{{ file.name }}</span>
        <a :href="file.url" target="_blank">查看</a>
        <button @click="deleteFile(file.path)">删除</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const message = useMessage();

// 响应式状态
const selectedFile = ref(null);
const baseFile = ref(null);
const isUploading = ref(false);
const uploadProgress = ref(0);
const files = ref([]);
const fileInput = ref(null);
const config = useRuntimeConfig();

// 生命周期钩子
onMounted(async () => {
  await loadFiles();
});

// 文件选择处理（保持不变）
const handleFileSelect = async (e) => {
  selectedFile.value = e.target.files[0];
  baseFile.value = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile.value);
    reader.onload = () => resolve(reader.result.split(",")[1]); // 提取 Base64 部分
  });
};

// 上传文件
const uploadFile = async () => {
  try {
    isUploading.value = true;
    const { data, error } = await useFetch(
      `/projects/${
        config.public.projectId
      }/repository/files/${encodeURIComponent(selectedFile.value.name)}`,
      {
        baseURL: "https://gitlab.com/api/v4",
        method: "POST",
        body: JSON.stringify({
          branch: config.public.branch,
          commit_message: `Upload ${selectedFile.value.name}`,
          encoding: "base64",
          content: baseFile.value,
        }),
        headers: {
          "PRIVATE-TOKEN": config.public.gitlabToken,
          "Content-Type": "application/json ",
          // 不需要手动设置 Content-Type，浏览器会自动设置
        },
      }
    );
    if (error.value) {
      throw error.value;
    }
    await loadFiles();
    fileInput.value.value = null;
    selectedFile.value = null;
    message.success("文件上传成功！");
  } catch (error) {
    message.error(`上传失败: ${error.data?.message || error.message}`);
  } finally {
    isUploading.value = false;
    uploadProgress.value = 0;
  }
};

// 加载文件列表
const loadFiles = async () => {
  try {
    const { data, error } = await useFetch(
      `/projects/${config.public.projectId}/repository/tree`,
      {
        baseURL: "https://gitlab.com/api/v4",
        headers: { "PRIVATE-TOKEN": config.public.gitlabToken },
      }
    );

    if (error.value) throw error.value;

    files.value = data.value.map((item) => ({
      ...item,
      url: `https://gitlab.com/api/v4/projects/${
        config.public.projectId
      }/repository/files/${encodeURIComponent(item.path)}/raw?ref=${
        config.public.branch
      }`,
    }));
  } catch (error) {
    message.error("加载文件列表失败");
  }
};

// 删除文件
const deleteFile = async (path) => {
  if (confirm("确定要删除这个文件吗？")) {
    try {
      const { error } = await useFetch(
        `/projects/${
          config.public.projectId
        }/repository/files/${encodeURIComponent(path)}`,
        {
          baseURL: "https://gitlab.com/api/v4",
          method: "DELETE",
          params: {
            branch: config.public.branch,
            commit_message: `Delete ${path}`,
          },
          headers: { "PRIVATE-TOKEN": config.public.gitlabToken },
        }
      );

      if (error.value) throw error.value;

      await loadFiles();
      message.success("文件删除成功");
    } catch (error) {
      message.error(`删除失败: ${error.data?.message}`);
    }
  }
};
</script>

<style scoped>
/* 保持原有样式不变 */
.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 20px;
}

.upload-section {
  margin-bottom: 2rem;
  padding: 20px;
  border: 1px solid #eee;
}

input[type="file"] {
  margin: 10px 0;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

progress {
  width: 100%;
  margin-top: 10px;
}

.file-list {
  border-top: 1px solid #ddd;
  padding-top: 20px;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.file-item span {
  flex: 1;
  margin-right: 20px;
}
</style>
