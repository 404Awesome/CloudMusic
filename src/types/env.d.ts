/// <reference types="vite/client" />
import vue, { AllowedComponentProps } from "vue";

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue' {
  // 解决标签无法正确识别属性问题
  interface HTMLAttributes {
    [propName: string]: unknown
  }

  // 解决组件无法正确识别属性问题
  interface AllowedComponentProps {
    [propName: string]: unknown
  }
}