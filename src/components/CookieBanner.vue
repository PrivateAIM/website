// CookieBanner.vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface CookieOptions {
  necessary: boolean;
  analytics: boolean;
}

interface WindowWithDataLayer extends Window {
  dataLayer: Array<unknown[]>;
  gtag?: (...args: unknown[]) => void;
  [key: string]: unknown;
}

const isVisible = ref(false);
const cookieOptions = ref<CookieOptions>({
  necessary: true, // Immer aktiviert
  analytics: false,
});

// Hier deine Google Analytics Tracking ID einfügen
const GA_TRACKING_ID = 'G-HEP0T9F5MV';

// Cookie überprüfen, ob bereits eingestellt
const checkCookieConsent = (): boolean => {
  return document.cookie.includes('cookie-consent=true');
};

// Cookie setzen
const setCookieConsent = (options: CookieOptions) => {
  // Setze einen Cookie für das Consent mit 6 Monaten Gültigkeit
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 6);

  document.cookie = `cookie-consent=true; expires=${expiryDate.toUTCString()}; path=/`;
  document.cookie = `cookie-options=${JSON.stringify(options)}; expires=${expiryDate.toUTCString()}; path=/`;

  // Wenn Analytics akzeptiert wurde, initialisiere Google Analytics
  if (options.analytics) {
    initGoogleAnalytics();
  } else {
    // Falls Analytics abgelehnt wurde, deaktivieren
    disableGoogleAnalytics();
  }
};

// Google Analytics mit anonymisierter IP initialisieren
const initGoogleAnalytics = () => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4 (GA4) mit anonymisierter IP einrichten
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    const windowWithDataLayer = window as unknown as WindowWithDataLayer;
    windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];

    function gtag(...args: unknown[]): void {
      windowWithDataLayer.dataLayer.push(args);
    }

    windowWithDataLayer.gtag = gtag;
    gtag('js', new Date());

    // GA4 mit anonymisierter IP konfigurieren
    gtag('config', GA_TRACKING_ID, {
      'anonymize_ip': true,           // IP-Adresse anonymisieren
      'allow_google_signals': false,  // Google-Signale deaktivieren
      'allow_ad_personalization_signals': false, // Personalisierte Anzeigen deaktivieren
      'send_page_view': true          // Seitenaufrufe tracken
    });

    console.log('Google Analytics mit anonymisierter IP wurde initialisiert');
  }
};

// Google Analytics deaktivieren
const disableGoogleAnalytics = () => {
  if (typeof window !== 'undefined') {
    const windowWithDataLayer = window as unknown as WindowWithDataLayer;

    // GA4 deaktivieren
    windowWithDataLayer[`ga-disable-${GA_TRACKING_ID}`] = true;

    // Optional: Vorhandene GA-Cookies entfernen
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.indexOf('_ga') === 0 || cookie.indexOf('_gid') === 0 || cookie.indexOf('_gat') === 0) {
        document.cookie = cookie.split('=')[0] + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    }

    console.log('Google Analytics wurde deaktiviert');
  }
};

// Cookie Banner akzeptieren
const acceptAll = () => {
  cookieOptions.value = {
    necessary: true,
    analytics: true,
  };
  setCookieConsent(cookieOptions.value);
  isVisible.value = false;
};

// Nur notwendige Cookies akzeptieren
const acceptNecessary = () => {
  cookieOptions.value = {
    necessary: true,
    analytics: false,
  };
  setCookieConsent(cookieOptions.value);
  isVisible.value = false;
};

// Benutzerdefinierte Auswahl speichern
const savePreferences = () => {
  setCookieConsent(cookieOptions.value);
  isVisible.value = false;
};

// Cookie-Einstellungen öffnen
const openCookieSettings = () => {
  isVisible.value = true;
};


// Beim Mounten der Komponente prüfen, ob bereits Consent vorhanden
onMounted(() => {
  if (!checkCookieConsent()) {
    isVisible.value = true;
  } else {
    // Versuche gespeicherte Cookie-Optionen zu laden
    try {
      const cookieOptionsStr = document.cookie
          .split('; ')
          .find(row => row.startsWith('cookie-options='))
          ?.split('=')[1];

      if (cookieOptionsStr) {
        const savedOptions = JSON.parse(decodeURIComponent(cookieOptionsStr));
        cookieOptions.value = savedOptions;

        // Falls Analytics bereits akzeptiert wurde, initialisiere es
        if (savedOptions.analytics) {
          initGoogleAnalytics();
        }
      }
    } catch (error) {
      console.error('Fehler beim Laden der Cookie-Einstellungen:', error);
    }
  }
});
</script>

<template>
  <transition name="slide-up">
    <div v-if="isVisible" class="cookie-banner">
      <div class="cookie-content">
        <h3>{{ $t('cookie.title') }}</h3>
        <p>
          {{ $t('cookie.subtitle') }}
        </p>

        <div class="cookie-options">
          <div class="cookie-option">
            <label>
              <input type="checkbox" v-model="cookieOptions.necessary" disabled>
              <span>{{ $t('cookie.setting.required.title') }}</span>
            </label>
            <p class="option-description">{{ $t('cookie.setting.required.description') }}</p>
          </div>

          <div class="cookie-option">
            <label>
              <input type="checkbox" v-model="cookieOptions.analytics">
              <span>{{ $t('cookie.setting.analysis.title') }}</span>
            </label>
            <p class="option-description">{{ $t('cookie.setting.analysis.description') }}</p>
          </div>
        </div>

        <div class="cookie-actions">
          <button class="btn btn-outline" @click="acceptNecessary">{{ $t('cookie.deny') }}</button>
          <button class="btn btn-outline" @click="savePreferences">{{ $t('cookie.preference') }}</button>
          <button class="btn btn-primary" @click="acceptAll">{{ $t('cookie.accept') }}</button>
        </div>
      </div>
    </div>
  </transition>

  <!-- Persistenter Cookie-Einstellungen Button -->
  <button
      v-if="!isVisible"
      @click="openCookieSettings"
      class="cookie-settings-button"
      aria-label="Cookie-Einstellungen öffnen"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
    <span>Cookies</span>
  </button>

</template>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 20px;
  border-top: 1px solid #eee;
}

.cookie-content {
  max-width: 1200px;
  margin: 0 auto;
}

h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.cookie-options {
  margin: 20px 0;
}

.cookie-option {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.cookie-option label {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.cookie-option input {
  margin-right: 8px;
}

.option-description {
  margin-top: 5px;
  margin-bottom: 0;
  font-size: 0.9em;
  color: #666;
}

.cookie-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.btn-outline {
  background: transparent;
  border: 1px solid #ccc;
  color: #333;
}

.btn-outline:hover {
  background-color: #f0f0f0;
}

.btn-primary {
  background-color: #4a90e2;
  border: 1px solid #4a90e2;
  color: white;
}

.btn-primary:hover {
  background-color: #3a80d2;
}

/* Persistenter Cookie-Button */
.cookie-settings-button {
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 30px;
  padding: 8px 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 990;
  font-size: 14px;
  transition: all 0.2s ease;
}

.cookie-settings-button:hover {
  background-color: #f5f5f5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.cookie-settings-button svg {
  margin-right: 6px;
}

/* Animationen */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
