<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 重定向规则

所有用户可见的 HTTP 重定向（包括 301、302、307、308）必须先维护根目录 `redirects.json`。禁止直接手改 `edgeone.json` 的 `redirects`，也禁止以 Next 的 `redirect()` 或 `permanentRedirect()` 替代 URL 迁移规则。当前默认使用 301；其他 3xx 状态码必须有明确需求。
