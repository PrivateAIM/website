import { type PropType, defineComponent, h } from 'vue';
import type { JsonLdNode } from '@/seo/types';

/** Renders schema.org nodes as one JSON-LD `@graph` script, also in prerendered HTML. */
export default defineComponent({
    name: 'JsonLd',
    props: {
        nodes: {
            type: Array as PropType<JsonLdNode[]>,
            required: true,
        },
    },
    setup(props) {
        return () => h('script', {
            type: 'application/ld+json',
            // Escape "<" so content can never close the script element
            innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': props.nodes }).replace(/</g, '\\u003c'),
        });
    },
});
