const GA_TRACKING_ID = 'G-HEP0T9F5MV';

interface IGtagWindow extends Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
}

export function sendPageView(path: string, title?: string) {
    const win = window as unknown as IGtagWindow;

    if (typeof win.gtag === 'function') {
        win.gtag('event', 'page_view', {
            page_path: path,
            page_title: title || document.title,
        });
    }
}

export function isAnalyticsLoaded(): boolean {
    const win = window as unknown as IGtagWindow;

    return typeof win.gtag === 'function';
}

export { GA_TRACKING_ID };
