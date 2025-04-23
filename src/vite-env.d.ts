import 'vue-i18n'

declare module 'vue-i18n' {
  // Define your custom message schema if needed
  export interface DefineLocaleMessage {
      [k: string]: any
    // Define your message structure here if you want better typing
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $t: (key: string, ...args: any[]) => string
    $i18n: {
      locale: string
      // Add other i18n properties you use
    }
  }
}
