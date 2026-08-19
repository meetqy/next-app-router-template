<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 重定向规则

所有用户可见的 HTTP 重定向（包括 301、302、307、308）必须先维护根目录 `redirects.json`。禁止直接手改 `edgeone.json` 的 `redirects`，也禁止以 Next 的 `redirect()` 或 `permanentRedirect()` 替代 URL 迁移规则。当前默认使用 301；其他 3xx 状态码必须有明确需求。

## 验证规则

1. 非必要不要启用 `dev` / `build` 进行验证（尤其不要为了验证而启动 `next dev` / `npm run build`）。
2. UI 相关的改动由用户手动验证，不要自行跑 dev server 做视觉确认。
3. 每次会话完成之后，只进行必要的验证：
   - 纯 JSX 类名 / 样式 / 文案改动 → 无需工具验证；
   - 涉及类型 / 数据逻辑改动 → 最多运行 `npx tsc --noEmit`，不要跑 build；
   - 仅当改动逻辑确实存疑时，才考虑 dev server 冒烟验证（并说明原因）。
