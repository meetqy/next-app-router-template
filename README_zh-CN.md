# Next.js App Router 演示项目

一个交互式演示 Next.js 16 App Router 核心特性的项目，包含布局系统、文件约定和路由功能的完整示例。

## 🚀 项目特性

### 核心功能
- **Nested Layouts** - 嵌套布局系统演示
- **Route Groups** - 路由分组功能展示
- **Parallel Routes** - 并行路由特性实现
- **File Conventions** - 文件约定完整示例
  - `loading.js` - 加载状态管理
  - `error.js` - 错误边界处理
  - `not-found.js` - 404页面定制

### 技术栈
- **Next.js 16.3.0** - 当前稳定版 App Router
- **TypeScript** - 完整的类型支持
- **Tailwind CSS v4** - 现代化样式系统
- **shadcn/ui** - 高质量UI组件库
- **Lucide React** - 精美图标库

## 📁 项目结构

```
app-router-template/
├── src/
│   ├── app/
│   │   ├── globals.css              # 全局样式和主题
│   │   ├── layout.tsx               # 根布局
│   │   ├── page.tsx                 # 首页
│   │   ├── components/
│   │   │   └── Header.tsx          # 共享导航组件
│   │   ├── layouts/                 # 布局系统演示
│   │   │   ├── nested-layouts/     # 嵌套布局
│   │   │   │   ├── layout.tsx      # 外层布局
│   │   │   │   ├── page.tsx        # 首页
│   │   │   │   ├── dashboard/      # 仪表板页面
│   │   │   │   ├── settings/       # 设置页面（有内层布局）
│   │   │   │   └── profile/        # 个人资料页面
│   │   │   ├── route-groups/       # 路由分组
│   │   │   │   ├── page.tsx        # 演示页面
│   │   │   │   ├── (admin)/        # 管理组
│   │   │   │   ├── (user)/         # 用户组
│   │   │   │   └── (public)/       # 公共组
│   │   │   └── parallel-routes/    # 并行路由
│   │   │       ├── layout.tsx      # 并行路由布局
│   │   │       ├── @messages/      # 消息插槽
│   │   │       ├── @users/         # 用户插槽
│   │   │       └── @settings/      # 设置插槽
│   │   └── file-conventions/       # 文件约定演示
│   │       ├── loading/            # 加载状态
│   │       │   ├── page.tsx        # 介绍页面
│   │       │   ├── loading.js      # 加载组件
│   │       │   └── demo/           # 演示页面
│   │       ├── error/              # 错误处理
│   │       │   ├── page.tsx        # 介绍页面
│   │       │   ├── error.js        # 错误边界
│   │       │   └── demo/           # 演示页面
│   │       └── not-found/          # 404页面
│   │           ├── page.tsx        # 介绍页面
│   │           ├── not-found.js    # 404组件
│   │           └── demo/           # 演示页面
│   └── components/
│       └── ui/                     # shadcn/ui 组件
├── public/                          # 静态资源
├── package.json                     # 项目依赖
├── next.config.ts                   # Next.js 配置
├── postcss.config.mjs               # Tailwind CSS v4 PostCSS 集成配置
└── tsconfig.json                    # TypeScript 配置
```

## 🎨 设计主题

项目采用现代化的深色主题设计：

- **主色调**: `#1c66e5` (蓝色)
- **背景**: `#0a0a0a` (深黑)
- **前景**: `#ffffff` (白色)
- **卡片**: `#1a1a1a` (深灰)
- **边框**: `rgba(255, 255, 255, 0.1)` (半透明白)

## 🛠️ 快速开始

### 环境要求
- Node.js 20.9 或更高版本
- npm 或 yarn 包管理器

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
edgeone pages dev
```

项目将在 [http://localhost:8088](http://localhost:8088) 启动


## 📚 功能演示

### 1. Nested Layouts (嵌套布局)
**路径**: `/layouts/nested-layouts`

演示真正的嵌套布局系统：
- 外层布局提供共享导航和标题
- 内层布局（设置页面）提供侧边栏
- 布局状态在页面切换时保持
- 支持多层嵌套和独立渲染

**特性**:
- 布局持久化
- 共享组件
- 多层嵌套
- 性能优化

### 2. Route Groups (路由分组)
**路径**: `/layouts/route-groups`

展示路由分组功能：
- 使用 `(folderName)` 约定创建逻辑分组
- 不影响URL路径结构
- 为不同路由段应用不同布局
- 支持管理、用户、公共等分组

**分组结构**:
- `(admin)` - 管理后台页面
- `(user)` - 用户相关页面  
- `(public)` - 公共页面

### 3. Parallel Routes (并行路由)
**路径**: `/layouts/parallel-routes`

实现真正的并行路由特性：
- 使用 `@folder` 约定创建插槽
- 同时渲染多个独立的路由段
- 每个插槽维护独立状态
- 支持条件渲染和默认插槽

**插槽组件**:
- `@messages` - 消息列表
- `@users` - 用户管理
- `@settings` - 应用设置
- `@default` - 默认内容

### 4. File Conventions (文件约定)

#### Loading UI (`loading.js`)
**路径**: `/file-conventions/loading`

- 自动显示加载状态
- 支持嵌套和继承
- 不影响SEO和性能
- 真实演示异步组件加载

#### Error UI (`error.js`)
**路径**: `/file-conventions/error`

- 自动捕获组件错误
- 优雅降级处理
- 提供错误恢复机制
- 防止应用崩溃

#### Not Found UI (`not-found.js`)
**路径**: `/file-conventions/not-found`

- 自定义404页面
- 支持 `notFound()` 函数调用
- 保持应用结构完整
- 友好的用户引导

## 🔧 技术实现

### 布局系统
- **外层布局**: 提供共享的导航和标题
- **内层布局**: 为特定页面段提供额外布局
- **布局继承**: 支持多层嵌套和状态保持
- **性能优化**: 只有变化部分重新渲染

### 路由管理
- **文件系统路由**: 基于文件结构的自动路由
- **动态路由**: 支持参数和查询字符串
- **中间件支持**: 路由级别的逻辑处理
- **SEO优化**: 服务端渲染和元数据管理

### 状态管理
- **布局状态**: 在页面切换时保持
- **组件状态**: 使用React Hooks管理
- **服务端状态**: 支持异步数据获取
- **客户端状态**: 交互和用户输入

## 📖 学习资源

### 官方文档
- [Next.js App Router](https://nextjs.org/docs/app)
- [Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [File Conventions](https://nextjs.org/docs/app/building-your-application/routing/file-conventions)
- [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
- [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

### 相关技术
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

### 开发规范
- 使用 TypeScript 编写代码
- 遵循 ESLint 规则
- 保持组件结构清晰
- 添加适当的注释和文档

### 提交规范
- 使用清晰的提交信息
- 一个提交只做一件事
- 测试确保功能正常
- 更新相关文档

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 部署
[![Deploy with EdgeOne Pages](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://console.cloud.tencent.com/edgeone/pages/new?from=github&template=express-template)
