# 戴氏教育高考中心官网

成都戴氏教育高考中心总部官网，基于 Next.js App Router 构建。图片资源托管在腾讯云 COS，通过 CDN 提供服务。

## 快速开始

```bash
pnpm install
cp .env.example .env.local   # 填入 COS 密钥等配置
pnpm dev
```

开发服务器默认运行在 http://localhost:3000。

## 目录结构

```
src/app/              页面路由
src/components/       组件（home/ 为首页区块，ui/ 为 shadcn 组件）
src/lib/              数据与工具，constants/ 存放校区、老师、荣誉等站点数据
src/lib/generated/    脚本生成的文件，不要手动编辑
src/styles/           全局样式
content/              知识库 Markdown 文档，资料库页面的数据源
public/               直接对外提供的静态文件，不上传 COS
cos-assets/           需要上传到 COS 的图片源文件（不进 git）
scripts/              构建与运维脚本
```

### public/ 与 cos-assets/ 的分工

两个目录职责不同，新增文件时按用途选择：

- **`public/`** — 必须从站点根路径访问、且不适合走 CDN 的文件：`favicon.ico`、各搜索引擎的站点验证文件（百度、必应、神马、搜狗、头条）。这些文件跟随代码提交。
- **`cos-assets/`** — 所有图片资源，保持与线上一致的目录结构（`assets/`、`honors/`、`老师/`、`校区/`、`喜报/` 等）。该目录被 `.gitignore` 忽略，图片通过 `pnpm images:upload` 上传到 COS，页面经 `imageUrl()` 引用 CDN 地址。

新增图片后需要执行两步：

```bash
pnpm images:manifest   # 更新图片清单（清单要提交）
pnpm images:upload     # 上传到 COS
```

清单 `src/lib/generated/image-manifest.json` 会提交进仓库，因为 `cos-assets/` 在部署环境不存在，升学喜报图库和 Markdown 配图需要靠它判断图片是否存在。

## 图片引用方式

页面不要直接写 `/assets/xxx.jpg`，统一通过 `imageUrl()` 转换成 CDN 地址：

```tsx
import Image from "next/image";
import { imageUrl } from "@/lib/image-url";

<Image src={imageUrl("/assets/校区环境1.png")} alt="校区环境" fill />;
```

`imageUrl()` 会拼接 `NEXT_PUBLIC_IMAGE_BASE_URL` 与资源前缀；未配置该变量时回落到本地路径。`next.config.ts` 中配置的自定义 loader 会追加 `imageMogr2` 参数，由 COS 完成缩放与 WebP 转换。

## 环境变量

在 `.env.local` 中配置，示例见 `.env.example`：

| 变量 | 说明 |
| --- | --- |
| `NEXT_PUBLIC_SITE_DOMAIN` | 站点域名，用于生成 canonical、sitemap 与结构化数据 |
| `NEXT_PUBLIC_IMAGE_BASE_URL` | 图片 CDN 地址，如 `https://cdn.dai-shi.cn` |
| `COS_BUCKET` | COS 存储桶名称，仅上传脚本使用 |
| `COS_REGION` | COS 地域，如 `ap-guangzhou` |
| `TENCENTCLOUD_SECRET_ID` | 腾讯云密钥 ID，仅上传脚本使用 |
| `TENCENTCLOUD_SECRET_KEY` | 腾讯云密钥 Key，仅上传脚本使用 |

`NEXT_PUBLIC_SITE_DOMAIN` 通过 `src/env.js` 校验，缺失时构建会直接失败。构建时可用 `SKIP_ENV_VALIDATION=1` 跳过校验。

## 命令说明

| 命令 | 作用 |
| --- | --- |
| `pnpm dev` | 启动开发服务器（Turbopack） |
| `pnpm build` | 生产构建（Turbopack） |
| `pnpm start` | 启动生产服务器，需先执行 `pnpm build` |
| `pnpm lint` | ESLint 检查 |
| `pnpm images:manifest` | 扫描 `cos-assets/` 与 `public/`，生成图片清单 `src/lib/generated/image-manifest.json`。**增删图片后必须执行**，否则喜报图库和 Markdown 配图不会显示 |
| `pnpm images:upload` | 把 `cos-assets/` 下的图片上传到 COS，对象前缀 `site-assets/v1/`。只上传不删除远端文件。加 `--dry-run` 可先列出待上传对象，`--source <目录>` 可指定其他源目录 |
| `pnpm submit:baidu` | 向百度站长平台推送 URL，从文本文件读取（默认 `1.txt`，每行一个 URL）。可用 `--file`、`--site`、`--token` 覆盖，或用环境变量 `BAIDU_PUSH_SITE` / `BAIDU_PUSH_TOKEN` |
| `pnpm submit:indexnow` | 向 IndexNow 推送 URL（必应、Yandex 等）。不传文件时自动读取线上 `/sitemap.xml`，也可传文件路径。加 `--dry-run` 只预览不提交 |

推送类命令会向搜索引擎提交真实数据。`submit:indexnow` 支持 `--dry-run` 预览，`submit:baidu` 没有该选项，执行前请先确认文件里的 URL 列表。

## 知识库内容

`content/` 下的 Markdown 文件由 `src/lib/knowledge-base.ts` 读取，驱动资料库（`/zi-liao-ku`）相关页面。Next.js 会在构建时跟踪这些文件，部署时请保留 `content/` 目录。

`/urls` 与 `/llms.txt` 提供站点 URL 清单与 AI 友好的内容索引，供搜索引擎和大模型抓取。
