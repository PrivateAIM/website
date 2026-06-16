/// <reference types="vite/client" />

// Make the globally-registered @ilingo/vue components known to vue-tsc so they
// can be used in templates without a per-component import (they are registered
// app-wide by `installTranslator`).
declare module 'vue' {
  interface GlobalComponents {
    ITranslate: typeof import('@ilingo/vue')['ITranslate'];
    ITranslateT: typeof import('@ilingo/vue')['ITranslateT'];
  }
}

export {};
