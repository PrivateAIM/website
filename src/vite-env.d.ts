/// <reference types="vite/client" />

import type { ITranslateT } from '@ilingo/vue';
import type { ITranslate } from '@/i18n';

// Make the globally-registered translation components known to vue-tsc so they
// can be used in templates without a per-component import (they are registered
// app-wide by `installTranslator`).
declare module 'vue' {
    interface GlobalComponents {
        ITranslate: typeof ITranslate;
        ITranslateT: typeof ITranslateT;
    }
}

export {};
