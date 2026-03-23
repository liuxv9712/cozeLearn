# Coze Studio 安装运行教程

## 📋 目录
- [项目概述](#项目概述)
- [环境准备](#环境准备)
- [安装步骤](#安装步骤)
- [启动前端开发服务器](#启动前端开发服务器)
- [常见问题解决](#常见问题解决)
- [项目结构说明](#项目结构说明)
- [开发指南](#开发指南)

## 项目概述

Coze Studio 是一站式 AI Agent 开发工具，提供各类最新大模型和工具、多种开发模式和框架。该项目采用微服务架构，后端使用 Golang 开发，前端使用 React 18 + TypeScript。

### 技术栈
- **前端框架**: React 18 + TypeScript
- **构建工具**: Rsbuild
- **包管理器**: Rush + PNPM
- **路由**: React Router v6
- **状态管理**: Zustand
- **UI 组件**: @coze-arch/coze-design
- **国际化**: @coze-arch/i18n

## 环境准备

### 系统要求
- **操作系统**: Windows、macOS 或 Linux
- **内存**: 至少 4GB RAM
- **处理器**: 至少 2 Core

### 软件依赖

#### 1. Node.js
- **版本要求**: Node.js >= 21（推荐使用 22.x LTS 版本）
- **下载地址**: https://nodejs.org/

**检查 Node.js 版本**:
```bash
node --version
```

#### 2. Rush（包管理工具）
- **版本要求**: Rush 5.147.1
- **安装方式**:
```bash
npm install -g @microsoft/rush@5.147.1
```

**验证安装**:
```bash
rush --version
```

#### 3. PNPM（包管理器）
- **版本要求**: PNPM 8.15.8
- **注意**: Rush 会自动管理 PNPM，无需单独安装

## 安装步骤

### 步骤 1: 获取项目源码

如果您还没有项目源码，请先克隆仓库：

```bash
git clone https://github.com/coze-dev/coze-studio.git
cd coze-studio
```

### 步骤 2: 安装项目依赖

在项目根目录下运行：

```bash
# 进入 frontend 目录
cd frontend

# 安装依赖（首次运行可能需要较长时间）
rush install
```

**说明**:
- `rush install` 会自动安装所有子项目的依赖
- 首次安装可能需要 10-30 分钟，具体取决于网络速度
- Rush 会使用 PNPM 8.15.8 进行依赖管理
- 依赖会被安装在 `common/temp/default/node_modules` 目录

**更新依赖**:
```bash
rush update
```

### 步骤 3: 验证依赖安装

检查依赖是否正确安装：

```bash
# 检查 node_modules 是否存在
dir common\temp\default\node_modules  # Windows
ls common/temp/default/node_modules    # macOS/Linux
```

## 启动前端开发服务器

### Windows 系统

```bash
# 进入前端应用目录
cd frontend\apps\coze-studio

# 启动开发服务器
npm run dev
```

### macOS/Linux 系统

```bash
# 进入前端应用目录
cd frontend/apps/coze-studio

# 启动开发服务器
npm run dev
```

### 访问应用

启动成功后，您会看到以下输出：

```
Rsbuild v1.1.13

➜  Local:    http://localhost:8080/
➜  Network:  http://172.20.192.1:8080/
➜  press h + enter to show help
```

**在浏览器中访问**: http://localhost:8080/

### 代理配置

前端开发服务器已配置以下代理：
- `/api` -> `http://localhost:8888/`
- `/v1` -> `http://localhost:8888/`

这意味着前端请求会自动代理到后端服务（默认端口 8888）。

## 常见问题解决

### 问题 1: Node.js 版本不兼容

**错误信息**:
```
Your version of Node.js (25.8.1) has not been tested with this release of Rush
```

**解决方案**:
- 降级 Node.js 到 22.x LTS 版本
- 或升级 Rush 到最新版本（但可能存在兼容性问题）

### 问题 2: Windows 环境变量设置失败

**错误信息**:
```
'IS_OPEN_SOURCE' is not recognized as an internal or external command
```

**解决方案**:
项目已配置 `cross-env` 来解决跨平台环境变量问题。如果仍然遇到问题：

1. 确保 `package.json` 中的脚本已修改为使用 `cross-env`:
```json
"scripts": {
  "dev": "cross-env IS_OPEN_SOURCE=true CUSTOM_VERSION=release rsbuild dev"
}
```

2. 安装 cross-env:
```bash
npm install -g cross-env
```

### 问题 3: Rush install 失败

**错误信息**:
```
fatal: not a git repository
```

**解决方案**:
- 这是警告信息，不影响功能
- 如果需要完整的 Git 支持，请初始化 Git 仓库:
```bash
git init
```

### 问题 4: 端口被占用

**错误信息**:
```
Port 8080 is already in use
```

**解决方案**:
1. 查找占用端口的进程:
```bash
netstat -ano | findstr :8080  # Windows
lsof -i :8080                  # macOS/Linux
```

2. 终止进程或修改端口配置

### 问题 5: 依赖安装很慢

**解决方案**:
1. 使用国内镜像源:
```bash
npm config set registry https://registry.npmmirror.com
```

2. 或配置 PNPM 镜像源（Rush 会自动使用）

### 问题 6: Git hooks 执行失败

**错误信息**:
```
Event hook "scripts/hooks/post-rush-install.sh" failed
```

**解决方案**:
这是 Windows 系统下的已知问题，不影响核心功能。可以忽略此错误。

## 项目结构说明

### 前端目录结构
```
frontend/
├── apps/                    # 应用层
│   └── coze-studio/        # 主应用
├── packages/               # 核心包
│   ├── agent-ide/         # AI Agent 开发环境
│   ├── arch/              # 架构基础设施
│   ├── common/            # 通用组件和工具
│   ├── components/        # UI 组件库
│   ├── data/              # 数据层
│   ├── devops/            # DevOps 工具
│   ├── foundation/        # 基础设施
│   ├── project-ide/       # 项目开发环境
│   ├── studio/            # Studio 核心功能
│   └── workflow/          # 工作流引擎
├── config/                # 配置文件
│   ├── eslint-config/     # ESLint 配置
│   ├── rsbuild-config/    # Rsbuild 构建配置
│   ├── ts-config/         # TypeScript 配置
│   └── ...
└── infra/                 # 基础设施工具
    ├── idl/              # IDL 工具
    ├── plugins/          # 构建插件
    └── utils/            # 工具库
```

### 核心模块说明

#### Agent IDE
- **agent-ide**: AI Agent 集成开发环境
- **prompt**: 提示词编辑器
- **tool**: 工具配置管理
- **workflow**: 工作流集成

#### 架构层 (arch)
- **bot-api**: API 接口层
- **bot-hooks**: React Hooks 库
- **foundation-sdk**: 基础 SDK
- **i18n**: 国际化支持
- **bot-flags**: 功能标志管理

#### 工作流引擎 (workflow)
- **fabric-canvas**: 画布渲染引擎
- **nodes**: 节点组件库
- **sdk**: 工作流 SDK
- **playground**: 调试运行环境

## 开发指南

### 开发模式

```bash
cd frontend/apps/coze-studio
npm run dev
```

### 生产构建

```bash
cd frontend/apps/coze-studio
npm run build
```

构建产物将输出到 `dist` 目录。

### 代码检查

```bash
cd frontend/apps/coze-studio
npm run lint
```

### 测试

```bash
cd frontend/apps/coze-studio
npm run test
```

### 使用 Rushx

Rushx 是 Rush 提供的脚本运行工具，可以在任何子项目中运行：

```bash
cd frontend/apps/coze-studio
rushx dev      # 等同于 npm run dev
rushx build    # 等同于 npm run build
rushx lint     # 等同于 npm run lint
```

### 代码质量标准

- 使用 ESLint + Prettier 进行代码格式化
- TypeScript 严格模式
- 单元测试覆盖率要求
- 基于团队的分层管理（level-1 到 level-4）

### 团队协作

- 基于 Rush 的 monorepo 管理
- 工作区依赖管理
- 统一的构建和发布流程

## 后续步骤

1. **配置后端服务**: 参考 [README.zh_CN.md](README.zh_CN.md) 中的 Docker 部署指南
2. **配置模型服务**: 访问 `http://localhost:8888/admin/#model-management` 配置模型
3. **开始开发**: 参考 [扣子开发平台官方文档](https://www.coze.cn/open/docs) 了解如何使用 Coze Studio

## 参考资源

- **项目主页**: https://github.com/coze-dev/coze-studio
- **官方文档**: https://www.coze.cn/open/docs
- **常见问题**: https://github.com/coze-dev/coze-studio/wiki/9.-常见问题
- **社区支持**:
  - Discord: https://discord.gg/sTVN9EVS4B
  - Telegram: https://t.me/+pP9CkPnomDA0Mjgx

## License

Apache License 2.0

---

**注意**: 本教程基于实际安装经验编写，如遇到问题请参考官方文档或提交 Issue。
