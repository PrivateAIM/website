<script lang="ts">
import {computed, defineComponent, toRef} from 'vue';
import LocalizedLink from './LocalizedLink.vue';

type TextItem = {
    isLink: boolean,
    text: string,
    url?: string,
    internal?: boolean
}

export default defineComponent({
    components: {LocalizedLink},
    props: {
        tag: {
            type: String,
            required: true,
            default: 'div'
        },
        text: {
          type: String,
          required: true
        }
    },
    setup(props) {
        const text = toRef(props, 'text');

        const parseText = (text: string) : TextItem[] => {
            const parts : TextItem[] = [];
            const linkRegex = /\[([^\]]+)\]\(([^:)]+(?::\/\/[^)]+)?):([^)]+)\)/g;

            let lastIndex = 0;
            let match;

            while ((match = linkRegex.exec(text)) !== null) {
                // Add text before the link
                if (match.index > lastIndex) {
                    parts.push({
                        isLink: false,
                        text: text.substring(lastIndex, match.index)
                    });
                }

                // Parse link details
                const linkText = match[1];
                let linkUrl = match[2].trim();
                const linkType = match[3].trim();
                const isInternal = linkType === 'internal';

                // Ensure external URLs have proper protocol WITHOUT duplicating it
                if (!isInternal && !linkUrl.match(/^https?:\/\//)) {
                    linkUrl = `https://${linkUrl}`;
                }

                parts.push({
                    isLink: true,
                    text: linkText,
                    url: linkUrl,
                    internal: isInternal
                });

                lastIndex = match.index + match[0].length;
            }

            // Add the remaining text after the last link
            if (lastIndex < text.length) {
                parts.push({
                    isLink: false,
                    text: text.substring(lastIndex)
                });
            }

            return parts;
        }

        const parts = computed(() => parseText(text.value));

        return {
            parts
        }
    }
})
</script>
<template>
    <template :is="tag" v-for="(part, index) in parts" :key="index">
        <LocalizedLink
            v-if="part.isLink"
            :url="part.url"
            :internal="part.internal"
        >
            {{ part.text }}
        </LocalizedLink>
        <template v-else>{{ part.text }}</template>
    </template>
</template>
