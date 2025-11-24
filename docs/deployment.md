# GitHub Actions 集成 Cloudflare Pages 部署指南

本文档介绍如何配置 GitHub Actions 自动部署项目到 Cloudflare Pages。

## 目录

- [前置要求](#前置要求)
- [配置步骤](#配置步骤)
  - [1. 配置 wrangler.jsonc](#1-配置-wranglerjsonc)
  - [2. 创建 GitHub Actions 工作流](#2-创建-github-actions-工作流)
  - [3. 配置 Cloudflare API 凭证](#3-配置-cloudflare-api-凭证)
  - [4. 配置 GitHub Secrets](#4-配置-github-secrets)
- [工作流说明](#工作流说明)
- [常见问题](#常见问题)
- [参考资源](#参考资源)

## 前置要求

- 已创建 GitHub 仓库
- 已创建 Cloudflare 账户
- 项目已配置构建脚本（如 `pnpm run build`）
- 项目使用 pnpm 作为包管理器（可根据实际情况调整）

## 配置步骤

### 1. 配置 wrangler.jsonc

在项目根目录创建或编辑 `wrangler.jsonc` 文件：

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "pdd-dashboard-demo",  // 项目名称，需与 Cloudflare Pages 项目名一致
  "compatibility_date": "2025-11-21",
  "pages_build_output_dir": "./dist",  // 构建输出目录
  "observability": {
    "enabled": true
  }
}
```

**重要提示：**
- `name` 字段必须与 Cloudflare Pages 中的项目名称完全一致
- `pages_build_output_dir` 指向构建后的输出目录（通常是 `./dist`）

### 2. 创建 GitHub Actions 工作流

在项目根目录创建 `.github/workflows/main.yaml` 文件：

```yaml
name: Deploy Pages
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    # 秘钥是创建到不同环境的，这里需要根据环境来选择
    environment: pdd-dashboard-demo-cloudflare
    steps:
      - uses: actions/checkout@v4
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Build project
        run: pnpm run build
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy ./dist
```

**关键配置说明：**

1. **触发条件**：当代码推送到 `main` 分支时自动触发部署
2. **环境配置**：`environment` 字段指定使用哪个 GitHub 环境（用于管理 secrets）
3. **构建步骤**：
   - 安装 pnpm
   - 安装 Node.js（版本 20）
   - 安装项目依赖
   - 构建项目（生成 `./dist` 目录）
4. **部署命令**：使用 `pages deploy ./dist` 部署到 Cloudflare Pages（注意不是 `wrangler deploy`）

### 3. 配置 Cloudflare API 凭证

#### 3.1 获取 Cloudflare API Token

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **My Profile** → **API Tokens**
3. 点击 **Create Token**
4. 使用 **Edit Cloudflare Workers** 模板，或自定义权限：
   - **Account** → **Cloudflare Pages** → **Edit**
   - **Account** → **Account Settings** → **Read**
5. 创建并复制 API Token（只显示一次，请妥善保存）

#### 3.2 获取 Account ID

1. 在 Cloudflare Dashboard 右侧边栏找到 **Account ID**
2. 复制 Account ID

### 4. 配置 GitHub Secrets

#### 4.1 创建 GitHub 环境（推荐）

使用环境（Environment）可以更好地管理不同环境的配置：

1. 进入 GitHub 仓库 → **Settings** → **Environments**
2. 点击 **New environment**，创建环境（如 `pdd-dashboard-demo-cloudflare`）
3. 在环境配置中添加以下 secrets：
   - `CLOUDFLARE_API_TOKEN`：Cloudflare API Token
   - `CLOUDFLARE_ACCOUNT_ID`：Cloudflare Account ID

#### 4.2 使用仓库级 Secrets（可选）

如果不使用环境，可以直接在仓库级别配置：

1. 进入 GitHub 仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 点击 **New repository secret**
3. 添加以下 secrets：
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

**注意**：如果使用仓库级 secrets，需要从工作流中移除 `environment` 字段。

## 工作流说明

### 工作流执行流程

1. **代码检出**：从 GitHub 仓库检出代码
2. **环境准备**：安装 pnpm 和 Node.js
3. **依赖安装**：使用 `pnpm install --frozen-lockfile` 安装依赖
4. **项目构建**：运行 `pnpm run build` 构建项目
5. **部署到 Cloudflare Pages**：使用 wrangler 将构建产物部署到 Cloudflare Pages

### 构建输出目录

确保项目的构建脚本（`package.json` 中的 `build` 脚本）输出到 `./dist` 目录，或与 `wrangler.jsonc` 中 `pages_build_output_dir` 配置的目录一致。

## 常见问题

### 1. 项目未找到错误

**错误信息：**
```
Project not found. The specified project name does not match any of your existing projects.
```

**解决方案：**
- 检查 `wrangler.jsonc` 中的 `name` 字段是否与 Cloudflare Pages 中的项目名称完全一致
- 确保项目名称大小写匹配

### 2. Secrets 无法访问

**错误信息：**
```
Secrets not found or cannot be accessed
```

**解决方案：**
- 如果使用环境级 secrets，确保工作流中指定了正确的 `environment` 字段
- 检查 secrets 是否已正确配置在对应的环境或仓库中
- 验证 API Token 是否有足够的权限

### 3. 构建失败

**可能原因：**
- 依赖安装失败：检查 `package.json` 和锁文件是否完整
- 构建脚本错误：检查本地构建是否正常
- Node.js 版本不匹配：调整工作流中的 Node.js 版本

### 4. 部署命令错误

**错误信息：**
```
Command not found: wrangler deploy
```

**解决方案：**
- 确保使用 `pages deploy` 而不是 `wrangler deploy`
- 检查 `command` 参数是否正确：`command: pages deploy ./dist`

### 5. 环境配置问题

如果 secrets 配置在环境中但无法访问：

1. 检查工作流中的 `environment` 字段是否与 GitHub 中创建的环境名称一致
2. 确保环境已正确配置 secrets
3. 检查环境是否有访问限制（如分支保护规则）

## 参考资源

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Wrangler 配置文档](https://developers.cloudflare.com/workers/wrangler/configuration/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [cloudflare/wrangler-action](https://github.com/cloudflare/wrangler-action)

## 总结

通过以上配置，当代码推送到 `main` 分支时，GitHub Actions 会自动：

1. 检出代码
2. 安装依赖
3. 构建项目
4. 部署到 Cloudflare Pages

这样就实现了持续集成和持续部署（CI/CD）的自动化流程。
