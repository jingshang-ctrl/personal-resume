---
name: git-push
description: 自动将代码提交、推送到 GitHub 并部署到 GitHub Pages。触发方式：/git-push、「推送到GitHub」「部署到线上」「发布到网站」「push到github」
---

# Git Push & Deploy 自动化

## 触发条件

用户说"推送到 GitHub""部署上线""发布网站""push + deploy"等。

## 执行流程

### Step 1：检查状态

```bash
git status
```

确认当前分支、未暂存/未跟踪的改动。

### Step 2：收集提交信息

向用户确认要提交的文件范围，以及 commit message。

如果用户没有指定 message，根据 git diff 生成一个简洁的中文 commit message（10-20 字）。

### Step 3：暂存并提交

```bash
git add <files>
git commit -m "<message>"
```

只添加与改动相关的文件，不添加不需要的 untracked 文件（如临时文件、.env 等）。

### Step 4：构建前检查

**必须执行**，防止部署后出现资源 404 问题。

1. **检查静态资源引用**：
   - 扫描 `src/` 中所有 `/xxx.ext` 形式的硬编码绝对路径（如 `src="/profile.jpg"`）。
   - **JSX 中必须用 `import.meta.env.BASE_URL`**：Vite 不会自动给 JSX 里的绝对路径加 base 前缀。硬编码 `/profile.jpg` 在 dev 正常，但生产环境实际请求的是 `域名/profile.jpg`（缺少 `/personal-resume/` 前缀），导致 404。
   - 正确写法：`` src={`${import.meta.env.BASE_URL}profile.jpg`} ``
2. **检查文件存在**：确认引用的文件确实在 `public/` 目录中。

### Step 5：推送到 GitHub

```bash
git push
```

如果 push 失败（如 SSH 不通），自动切换为 HTTPS 方式重试。

### Step 6：构建并部署到 GitHub Pages

```bash
npm run deploy
```

此命令会执行 `vite build && gh-pages -d dist`，构建生产版本并推送到 `gh-pages` 分支。

### Step 7：确认结果

告诉用户：
- 线上地址：https://jingshang-ctrl.github.io/personal-resume/
- 代码仓库：https://github.com/jingshang-ctrl/personal-resume
- GitHub Pages 部署通常需要 1-2 分钟后生效

## 注意事项

- 不要推送 `.env` 等敏感文件
- 如果 push 被拒绝（non-fast-forward），先 `git pull --rebase` 再 push
- 构建失败时，检查 vite.config.ts 和依赖是否完整
- **静态资源必须在 `public/` 目录**：`src` 中引用的 `/profile.jpg`、`/favicon.ico` 等文件必须放在 `public/` 下，否则 dev 正常但生产构建丢失（已知 bug，Step 4 会自动检查）
