/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_VERSION: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
