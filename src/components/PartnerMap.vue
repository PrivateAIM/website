<script setup lang="ts">
import { computed } from 'vue';
import { useLocale, useTranslation } from '@/i18n';

// Outline of Germany from Natural Earth (public domain), projected to a 400x540 viewBox
const OUTLINE = 'M160.2,517.8 L152.7,512.7 L145.5,507.8 L143.1,507.8 L132.5,508.7 L130.4,505.5 L128.7,504.6 L127.1,505.9 L121.2,501.2 L119.3,500.6 L116.6,501.2 L113.4,503.6 L112.0,506.6 L112.4,508.3 L114.1,509.0 L118.4,508.5 L119.2,510.0 L115.2,511.7 L114.2,512.8 L112.5,513.3 L108.7,512.1 L103.2,512.1 L98.7,514.2 L91.5,515.1 L81.6,514.6 L78.1,513.1 L75.9,512.1 L74.4,507.5 L74.8,500.7 L77.1,491.7 L77.8,485.1 L76.7,480.9 L78.1,474.5 L82.0,466.1 L84.5,457.2 L85.8,447.9 L87.7,441.8 L91.3,437.5 L100.0,425.6 L100.4,418.7 L98.1,417.9 L94.7,416.2 L86.0,414.0 L77.9,412.7 L74.2,411.0 L71.0,406.5 L69.0,406.4 L65.1,408.0 L60.2,409.1 L56.7,408.2 L54.4,408.4 L53.2,409.2 L51.7,404.6 L49.8,403.6 L46.9,402.7 L45.1,403.1 L43.9,405.0 L42.0,406.4 L40.2,405.9 L34.7,397.0 L33.3,395.1 L33.0,393.2 L31.6,389.9 L28.3,386.6 L25.0,385.6 L23.4,386.0 L23.6,381.9 L24.9,375.9 L26.1,372.8 L27.7,370.3 L29.5,368.5 L29.8,365.3 L29.6,362.3 L27.6,361.9 L22.6,359.6 L19.6,357.3 L17.4,354.4 L14.5,350.3 L13.3,346.2 L13.3,342.1 L13.6,340.3 L13.8,339.0 L16.1,332.7 L24.3,327.0 L23.4,321.2 L23.3,317.7 L21.3,315.4 L17.3,314.4 L16.3,312.8 L15.8,311.3 L18.8,307.8 L15.2,305.0 L13.7,302.1 L8.9,298.5 L8.3,297.3 L10.7,286.7 L8.9,283.6 L6.7,282.1 L4.1,281.3 L2.9,279.8 L2.5,278.2 L6.0,277.4 L6.9,276.3 L14.2,270.1 L14.5,268.9 L13.5,268.3 L12.1,267.9 L11.8,266.6 L11.9,264.9 L15.8,256.0 L16.9,252.2 L17.2,249.5 L16.9,246.8 L14.7,242.6 L12.5,239.3 L12.4,236.6 L10.9,235.2 L6.4,228.1 L6.4,225.4 L8.9,223.2 L12.5,221.9 L13.6,220.7 L15.8,220.0 L21.4,222.1 L23.9,223.9 L26.9,221.5 L30.9,221.9 L40.5,218.0 L41.9,216.1 L43.0,214.1 L39.4,209.4 L39.3,208.0 L39.8,206.4 L40.8,205.1 L43.0,204.3 L45.4,202.6 L50.6,197.8 L52.5,193.7 L53.0,189.2 L53.1,185.9 L51.7,183.2 L50.2,181.5 L48.3,181.8 L44.4,181.6 L40.8,180.2 L38.8,177.7 L38.3,175.6 L39.2,174.3 L39.5,172.7 L38.9,171.0 L39.2,169.6 L40.8,168.5 L52.2,168.6 L53.0,167.4 L53.8,161.0 L56.6,151.2 L59.3,145.8 L59.8,143.6 L59.7,130.7 L60.1,124.2 L58.2,121.2 L53.9,117.8 L54.8,110.9 L56.2,105.5 L60.5,98.8 L63.9,97.0 L78.7,95.9 L95.0,96.3 L101.8,106.4 L99.3,111.6 L103.3,114.0 L105.2,113.1 L106.6,108.6 L107.6,103.6 L109.0,102.1 L114.0,105.8 L115.8,108.4 L115.9,116.6 L117.8,105.5 L116.4,97.7 L117.4,90.1 L119.4,86.2 L121.2,83.7 L133.2,86.4 L146.5,85.0 L151.5,87.9 L162.8,102.5 L166.6,104.9 L171.4,105.6 L164.8,102.5 L151.1,84.8 L146.9,82.6 L140.6,82.0 L136.7,80.2 L134.2,77.5 L133.5,75.2 L133.6,57.4 L131.2,54.7 L128.2,53.8 L126.3,55.0 L122.4,55.0 L121.5,51.0 L122.5,48.0 L130.4,46.0 L135.6,43.2 L135.8,38.4 L132.5,34.6 L128.6,27.6 L124.0,21.1 L123.5,13.4 L131.5,13.6 L133.5,13.9 L145.6,17.4 L148.6,20.0 L152.3,20.1 L159.1,17.7 L164.1,16.7 L166.1,18.2 L168.8,18.8 L169.7,20.0 L176.0,21.8 L178.7,24.7 L181.6,29.1 L181.9,35.5 L178.1,40.0 L175.0,42.9 L186.8,41.8 L188.0,44.4 L189.8,47.2 L196.1,45.2 L212.1,53.6 L221.8,49.5 L224.2,49.3 L226.4,56.0 L224.0,62.8 L215.5,70.0 L217.4,74.5 L220.1,75.5 L228.1,74.6 L240.8,79.0 L243.5,77.6 L253.8,67.4 L257.9,65.2 L271.5,63.7 L273.9,59.7 L279.4,55.8 L282.9,51.5 L291.4,43.2 L300.2,44.7 L305.3,46.3 L310.9,47.1 L316.0,55.9 L328.9,65.6 L340.8,64.7 L345.0,73.9 L346.9,85.2 L350.6,88.8 L353.8,91.1 L363.4,93.5 L364.1,95.2 L364.7,100.8 L365.5,105.5 L370.5,124.1 L370.4,128.7 L370.4,129.9 L368.5,136.3 L365.3,141.7 L361.0,144.7 L358.7,148.1 L358.2,151.8 L363.6,158.4 L374.8,167.7 L379.3,175.7 L377.2,182.4 L376.5,187.3 L377.4,190.4 L379.2,192.9 L381.9,194.8 L383.0,197.7 L382.5,201.6 L383.0,204.3 L385.1,206.3 L383.9,209.8 L382.5,214.7 L381.7,218.4 L378.6,223.3 L379.5,227.5 L382.0,232.5 L383.9,235.0 L384.5,237.4 L383.3,243.0 L383.9,244.4 L391.7,248.5 L392.9,250.5 L393.7,254.4 L396.4,262.9 L394.1,273.7 L392.1,279.6 L387.7,289.0 L387.0,291.0 L385.7,292.6 L383.8,292.9 L381.0,291.7 L379.1,290.1 L379.5,286.0 L378.3,285.8 L376.8,283.3 L376.2,280.6 L374.5,279.5 L368.5,278.4 L366.4,277.6 L364.9,278.2 L363.7,280.1 L364.4,281.8 L365.6,283.5 L368.9,286.1 L361.4,289.7 L356.8,292.3 L352.6,293.8 L348.3,296.5 L339.8,299.6 L333.6,300.4 L332.3,301.2 L330.0,306.4 L328.4,307.5 L326.9,306.9 L325.8,306.1 L324.3,306.8 L322.8,308.5 L321.3,309.2 L319.9,309.1 L317.5,313.7 L310.4,315.0 L309.6,317.4 L308.2,320.1 L307.2,320.8 L304.0,319.7 L299.6,319.1 L297.1,320.6 L294.0,321.4 L290.3,321.7 L286.1,324.7 L282.1,329.9 L279.8,334.5 L278.6,336.2 L276.6,331.8 L274.2,328.8 L272.5,327.3 L270.9,327.3 L270.5,330.2 L272.2,334.0 L274.2,336.5 L274.5,338.4 L275.6,341.9 L278.6,345.7 L283.2,348.7 L286.3,351.6 L288.7,355.7 L288.7,356.9 L288.1,358.6 L287.0,360.2 L286.0,362.2 L283.5,366.4 L284.2,368.2 L286.3,370.4 L288.2,373.2 L290.6,377.6 L293.9,385.4 L296.0,388.6 L298.8,391.9 L301.7,394.4 L306.1,394.3 L310.7,399.1 L315.7,406.1 L319.5,409.3 L322.1,410.2 L324.3,412.7 L326.2,416.3 L326.9,418.4 L328.6,419.9 L333.2,419.7 L339.1,425.3 L342.8,429.5 L344.7,432.8 L344.2,434.2 L344.0,438.3 L344.0,442.8 L343.5,445.1 L340.8,448.2 L339.4,448.8 L330.6,445.5 L329.5,446.7 L327.3,458.3 L325.8,460.5 L323.6,462.6 L318.9,464.6 L315.7,465.4 L313.2,466.4 L305.3,471.3 L301.7,474.3 L299.4,477.9 L299.4,480.1 L303.2,486.3 L307.7,492.7 L307.7,498.4 L305.7,502.6 L305.3,504.3 L306.6,504.9 L309.1,505.1 L311.1,505.8 L312.0,508.8 L311.7,514.0 L311.0,518.9 L310.3,520.9 L308.3,521.1 L304.5,519.0 L301.5,516.5 L300.3,515.0 L300.3,513.2 L300.9,512.1 L299.8,509.9 L296.2,507.8 L292.2,508.7 L289.3,510.1 L287.4,510.0 L285.4,508.1 L282.3,506.6 L278.2,505.6 L275.7,504.5 L275.4,509.4 L274.7,511.3 L254.5,513.7 L248.3,516.0 L243.9,519.0 L240.6,520.3 L239.7,522.1 L236.5,524.6 L232.8,525.3 L229.5,525.6 L225.5,526.7 L222.8,526.4 L221.6,524.4 L219.1,521.4 L218.1,519.4 L218.2,518.0 L212.5,517.8 L209.0,516.2 L201.4,516.6 L199.5,515.9 L198.0,525.1 L196.5,528.6 L194.1,532.2 L191.0,534.2 L188.5,534.5 L188.6,531.9 L189.3,528.8 L187.5,528.0 L184.8,527.6 L183.5,526.7 L183.8,524.3 L183.2,522.9 L182.1,521.2 L179.4,519.1 L173.7,515.8 L169.8,514.3 L168.4,515.9 L165.6,517.7 L161.2,517.1 L160.2,517.8Z M340.2,49.0 L341.3,53.6 L340.1,56.0 L335.3,52.1 L330.4,52.1 L327.5,58.1 L325.3,58.4 L317.9,52.9 L316.6,50.3 L316.4,48.1 L317.5,40.4 L317.3,38.0 L319.6,35.4 L320.0,31.5 L324.2,27.5 L327.9,27.4 L329.0,30.8 L330.8,33.1 L337.0,35.7 L338.0,36.9 L338.5,38.6 L335.6,41.8 L334.6,43.5 L335.6,46.1 L340.2,49.0Z M361.8,78.6 L361.2,80.7 L361.9,84.0 L360.1,83.8 L354.8,84.5 L349.5,83.4 L348.5,79.4 L349.3,75.4 L347.2,72.7 L345.3,71.1 L345.0,68.8 L345.3,66.5 L354.4,72.8 L361.8,78.6Z M235.8,46.6 L229.2,46.7 L226.7,44.0 L224.2,43.3 L225.5,39.9 L227.3,38.7 L233.7,40.9 L235.7,45.2 L235.8,46.6Z M107.9,21.4 L106.9,22.8 L107.3,13.1 L112.1,2.8 L114.0,3.1 L112.0,5.8 L111.4,7.8 L110.6,11.7 L111.0,13.7 L121.7,14.2 L120.5,16.0 L109.6,17.2 L107.9,21.4Z M119.9,26.5 L118.2,28.1 L114.1,27.9 L111.8,26.4 L112.6,24.7 L114.8,23.4 L116.6,23.2 L119.3,24.0 L119.9,26.5Z';

type Role = 'coordination' | 'partner' | 'associated';

interface Site {
    name: { en: string; de: string };
    x: number;
    y: number;
    role: Role;
    institutions: string;
    /** Label side, to keep neighbouring labels apart */
    anchor?: 'start' | 'end';
    /** Vertical label offset, for labels that would overlap */
    dy?: number;
}

const SITES: Site[] = [
    {
        name: { en: 'Berlin', de: 'Berlin' }, 
        x: 326.9, 
        y: 176.3, 
        role: 'coordination', 
        institutions: 'BIH at Charité, TMF',
    },
    {
        name: { en: 'Tübingen', de: 'Tübingen' }, 
        x: 140.2, 
        y: 449.7, 
        role: 'coordination', 
        institutions: 'University Hospital Tübingen, University of Tübingen', 
        anchor: 'end',
    },
    {
        name: { en: 'Munich', de: 'München' }, 
        x: 248.6, 
        y: 475.7, 
        role: 'coordination', 
        institutions: 'TUM, LMU Munich',
    },
    {
        name: { en: 'Heidelberg', de: 'Heidelberg' }, 
        x: 124.3, 
        y: 389.6, 
        role: 'partner', 
        institutions: 'DKFZ, Heidelberg University Hospital',
    },
    {
        name: { en: 'Mannheim', de: 'Mannheim' }, 
        x: 114.8, 
        y: 383.4, 
        role: 'partner', 
        institutions: 'University Medicine Mannheim', 
        anchor: 'end',
    },
    {
        name: { en: 'Ulm', de: 'Ulm' }, 
        x: 180.2, 
        y: 457.9, 
        role: 'partner', 
        institutions: 'Ulm University',
    },
    {
        name: { en: 'Erlangen', de: 'Erlangen' }, 
        x: 223.7, 
        y: 375.9, 
        role: 'partner', 
        institutions: 'University Hospital Erlangen',
    },
    {
        name: { en: 'Freiburg', de: 'Freiburg' }, 
        x: 87.7, 
        y: 485.9, 
        role: 'partner', 
        institutions: 'University Hospital Freiburg',
    },
    {
        name: { en: 'Cologne', de: 'Köln' }, 
        x: 49.9, 
        y: 284.3, 
        role: 'partner', 
        institutions: 'University Hospital Cologne',
    },
    {
        name: { en: 'Leipzig', de: 'Leipzig' }, 
        x: 282.6, 
        y: 257.0, 
        role: 'partner', 
        institutions: 'University Hospital Leipzig',
    },
    {
        name: { en: 'Saarbrücken', de: 'Saarbrücken' }, 
        x: 51.6, 
        y: 400.5, 
        role: 'partner', 
        institutions: 'CISPA',
        dy: 14,
    },
    {
        name: { en: 'Essen', de: 'Essen' }, 
        x: 52.0, 
        y: 248.8, 
        role: 'associated', 
        institutions: 'University Hospital Essen',
    },
    {
        name: { en: 'Kiel / Lübeck', de: 'Kiel / Lübeck' }, 
        x: 186.2, 
        y: 53.3, 
        role: 'associated', 
        institutions: 'University Hospital Schleswig-Holstein',
    },
];

const locale = useLocale();
const mapLabel = useTranslation('partners.map.label');
const sites = computed(() => SITES.map((site) => ({
    ...site,
    label: locale.value === 'de' ? site.name.de : site.name.en,
})));
</script>

<template>
    <figure class="partner-map">
        <svg
            viewBox="-10 -10 420 560"
            role="img"
            :aria-label="mapLabel"
        >
            <path
                :d="OUTLINE"
                class="map-land"
            />
            <g
                v-for="site in sites"
                :key="site.label"
                :class="`site site-${site.role}`"
            >
                <title>{{ site.label }}: {{ site.institutions }}</title>
                <circle
                    :cx="site.x"
                    :cy="site.y"
                    :r="site.role === 'coordination' ? 8 : 6"
                    class="site-dot"
                />
                <text
                    :x="site.anchor === 'end' ? site.x - 12 : site.x + 12"
                    :y="site.y + 4 + (site.dy ?? 0)"
                    :text-anchor="site.anchor ?? 'start'"
                    class="site-label"
                >{{ site.label }}</text>
            </g>
        </svg>
        <figcaption class="map-legend">
            <span><i class="legend-dot legend-coordination" /><ITranslate path="partners.subsection1" /></span>
            <span><i class="legend-dot legend-partner" /><ITranslate path="partners.subsection2" /></span>
            <span><i class="legend-dot legend-associated" /><ITranslate path="partners.subsection3" /></span>
        </figcaption>
    </figure>
</template>

<style scoped>
.partner-map {
  margin: 0;
}

svg {
  display: block;
  width: 100%;
  max-width: 420px;
  height: auto;
  margin: 0 auto;
}

.map-land {
  fill: var(--tag-bg, #ebf8ff);
  stroke: var(--primary-color, #3182ce);
  stroke-width: 1.5;
  stroke-linejoin: round;
}

.site-dot {
  stroke: var(--body-bg, #ffffff);
  stroke-width: 2.5;
}

.site-coordination .site-dot { fill: var(--primary-color, #1e90ff); }
.site-partner .site-dot { fill: #38a169; }
.site-associated .site-dot { fill: #805ad5; }

.site-label {
  font-size: 13px;
  font-weight: 600;
  fill: var(--text-color, #1a202c);
  paint-order: stroke;
  stroke: var(--body-bg, #ffffff);
  stroke-width: 3px;
  stroke-linejoin: round;
}

.map-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--text-color, #4a5568);
}

.map-legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.legend-dot {
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
}

.legend-coordination { background-color: var(--primary-color, #1e90ff); }
.legend-partner { background-color: #38a169; }
.legend-associated { background-color: #805ad5; }
</style>
