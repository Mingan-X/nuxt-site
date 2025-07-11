# 部署配置说明

## 概述

本项目配置为只在版本发布时触发 Cloudflare Pages 部署，而不是每次代码提交都部署。

## 工作流程

1. **开发阶段**: 正常提交代码到 `master` 分支，不会触发部署
2. **版本发布**: 使用 `pnpm run release` 创建新版本
3. **自动部署**: GitHub Actions 检测到新的版本标签后，自动触发 Cloudflare 部署

## 配置步骤

### 1. Cloudflare Pages 配置

在 Cloudflare Dashboard 中：

1. 进入你的 Pages 项目
2. 转到 **Settings** > **Builds & deployments**
3. 在 **Production branch** 设置中，将分支改为 `release`
4. 确保 **Build command** 设置为: `pnpm run generate`
5. 确保 **Build output directory** 设置为: `dist`

### 2. GitHub Repository 配置

确保你的 GitHub repository 有以下权限：

- Actions 权限已启用
- Workflow 有写入权限

### 3. 版本发布命令

```bash
# 发布补丁版本 (1.0.0 -> 1.0.1)
pnpm run release:patch

# 发布次要版本 (1.0.0 -> 1.1.0)
pnpm run release:minor

# 发布主要版本 (1.0.0 -> 2.0.0)
pnpm run release:major

# 交互式发布 (推荐)
pnpm run release
```

## 工作原理

1. **版本发布**: `release-it` 创建新的 git tag 并推送到 GitHub
2. **GitHub Actions 触发**: 检测到新的 `v*` 标签时自动运行
3. **创建发布分支**: Actions 创建/更新 `release` 分支
4. **Cloudflare 部署**: Cloudflare Pages 检测到 `release` 分支更新后自动部署

## 优势

- ✅ 只在正式版本发布时部署
- ✅ 避免开发过程中的频繁部署
- ✅ 保持部署历史清晰
- ✅ 支持回滚到特定版本
- ✅ 自动生成 CHANGELOG

## 故障排除

### 如果部署没有触发

1. 检查 GitHub Actions 是否成功运行
2. 确认 Cloudflare Pages 监听的是 `release` 分支
3. 检查 repository 的 Actions 权限设置

### 手动触发部署

如果需要手动触发部署：

```bash
git checkout -B release
git push origin release --force
```

## 注意事项

- 确保在发布前测试你的更改
- 版本号遵循语义化版本规范 (SemVer)
- CHANGELOG 会自动更新
- 每次发布都会创建 GitHub Release
