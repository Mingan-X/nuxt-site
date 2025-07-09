# Release Guide

本项目已配置 `release-it` 来自动管理版本号和生成 CHANGELOG。

## 快速开始

### 1. 确保提交信息符合规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
feat: 添加新功能
fix: 修复bug
docs: 更新文档
style: 代码格式化
refactor: 重构代码
perf: 性能优化
test: 添加测试
build: 构建系统更改
ci: CI配置更改
chore: 其他更改
```

### 2. 发布版本

```bash
# 预览即将发布的内容（推荐先运行）
pnpm run release:dry

# 交互式发布（会提示选择版本类型）
pnpm run release

# 直接发布特定版本类型
pnpm run release:patch   # 0.0.x
pnpm run release:minor   # 0.x.0  
pnpm run release:major   # x.0.0

# 预发布版本
pnpm run release:alpha   # 1.0.0-alpha.0
pnpm run release:beta    # 1.0.0-beta.0
```

## 发布流程

1. **自动生成 CHANGELOG** - 基于 conventional commits
2. **更新版本号** - 在 package.json 中
3. **创建 Git 标签** - 格式为 v1.0.0
4. **推送到远程仓库** - 包括标签
5. **创建 GitHub Release** - 包含 release notes

## GitHub Token 配置（可选）

如果要自动创建 GitHub Release，需要设置环境变量：

```bash
# Windows
set GITHUB_TOKEN=your_github_token

# macOS/Linux
export GITHUB_TOKEN=your_github_token
```

或者在项目根目录创建 `.env` 文件：

```
GITHUB_TOKEN=your_github_token
```

## 配置文件

- `.release-it.json` - release-it 主配置
- `CHANGELOG.md` - 自动生成的变更日志
- `CONTRIBUTING.md` - 贡献指南和提交规范

## 注意事项

1. 发布前确保所有更改已提交
2. 建议先运行 `pnpm run release:dry` 预览
3. 确保在 master/main 分支上发布
4. 首次发布会从 0.0.0 开始
