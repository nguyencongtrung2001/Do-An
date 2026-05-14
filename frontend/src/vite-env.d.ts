/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string
  // Thêm các biến khác nếu có
  readonly VITE_API_URL?: string
  // readonly VITE_...: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}