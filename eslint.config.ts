import eslintConfig from '@tada5hi/eslint-config';
import globals from 'globals';

export default eslintConfig(
    {
        typescript: true,
        vue: { typescript: true },
    },
    {
        name: 'app/files-to-ignore',
        ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
    },
    {
        // This is a browser SPA; the tada5hi base only provides Node globals.
        name: 'app/browser-globals',
        languageOptions: { globals: { ...globals.browser } },
    },
    {
        name: 'app/rule-overrides',
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/no-useless-template-attributes': 'off',
            'vue/no-deprecated-html-element-is': 'off',
            // Rendered markdown/news content is bound via v-html by design.
            'vue/no-v-html': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    {
        // Inline SVG `<path d="…">` data in templates legitimately exceeds the line limit.
        name: 'app/vue-template-overrides',
        files: ['**/*.vue'],
        rules: { '@stylistic/max-len': 'off' },
    },
);
