/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_WEB3FORMS_KEY?: string
  readonly VITE_GA_ID?: string
}

declare module '*as=picture' {
  const picture: import('./types').Picture
  export default picture
}
