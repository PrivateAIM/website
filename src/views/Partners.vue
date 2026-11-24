<template>
    <div class="partners-container">
        <PageHeader
            :title="title"
            :subtitle="subtitle"
        />

        <div class="partners-content">
            <section class="partners-intro">
                <p class="intro-text">
                    {{ description }}
                </p>
                <PartnerMap />
            </section>

            <section class="partners-section">
                <h2 class="section-title">
                    <ITranslate path="partners.subsection1" />
                </h2>
                <div class="partners-grid">
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/CHARITE.svg"
                                alt="Charité Berlin"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                Charité Berlin
                            </h3>
                            <a
                                href="https://mi.bihealth.org"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/UKT.webp"
                                alt="Universitätsklinikum Tübingen"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                <ITranslate path="partners.partner.name" /> Tübingen
                            </h3>
                            <a
                                href="https://www.medizin.uni-tuebingen.de/de/das-klinikum/einrichtungen/institute/informationstechnologie-und-medizininformatik/translationale-bioinformatik"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/TUM.svg"
                                alt="TUM Klinikum Rechts der Isar"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                TUM Klinikum Rechts der Isar
                            </h3>
                            <a
                                href="https://www.kiinformatik.mri.tum.de"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="partners-section">
                <h2 class="section-title">
                    <ITranslate path="partners.subsection2" />
                </h2>
                <div class="partners-grid">
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/LMU.webp"
                                alt="Ludwig-Maximilians-Universität München"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                Ludwig-Maximilians-Universität München
                            </h3>
                            <a
                                href="https://www.ibe.med.uni-muenchen.de/index.html"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/DKFZ.webp"
                                alt="Deutsches Krebsforschungszentrum"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                Deutsches Krebsforschungszentrum
                            </h3>
                            <a
                                href="https://www.dkfz.de"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/EKUT.webp"
                                alt="Eberhard Karls Universität Tübingen"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                Eberhard Karls Universität Tübingen
                            </h3>
                            <a
                                href="https://uni-tuebingen.de/fakultaeten/mathematisch-naturwissenschaftliche-fakultaet/fachbereiche/informatik/lehrstuehle/methods-in-medical-informatics/"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/TMF.webp"
                                alt="TMF"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                TMF
                            </h3>
                            <a
                                href="https://www.tmf-ev.de"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/UKU.svg"
                                alt="Universität Ulm"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                Universität Ulm
                            </h3>
                            <a
                                href="https://sysbio.uni-ulm.de"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/UKER.svg"
                                alt="Universitätsklinikum Erlangen"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                <ITranslate path="partners.partner.name" /> Erlangen
                            </h3>
                            <a
                                href="https://www.imi.med.fau.de"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/UKFR.webp"
                                alt="Universitätsklinikum Freiburg"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                <ITranslate path="partners.partner.name" /> Freiburg
                            </h3>
                            <a
                                href="https://www.uniklinik-freiburg.de/imbi.html"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/UKHD.webp"
                                alt="Universitätsklinikum Heidelberg"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                <ITranslate path="partners.partner.name" /> Heidelberg
                            </h3>
                            <a
                                href="https://www.klinikum.uni-heidelberg.de/zentrum-fuer-innere-medizin-medizin-klinik/innere-medizin-iii-kardiologie-angiologie-und-pneumologie/forschung/forschung/klaus-tschira-institut-for-computational-cardiology"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/UKK.webp"
                                alt="Universitätsklinikum Köln"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                <ITranslate path="partners.partner.name" /> Köln
                            </h3>
                            <a
                                href="https://www.uk-koeln.de/forschung/medical-data-integration-center-medic/"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/UKL.webp"
                                alt="Universitätsklinikum Leipzig"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                <ITranslate path="partners.partner.name" /> Leipzig
                            </h3>
                            <a
                                href="https://www.uniklinikum-leipzig.de/einrichtungen/medical-data-science/"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/CISPA.svg"
                                alt="CISPA"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                CISPA
                            </h3>
                            <a
                                href="https://cispa.de/de"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/UMM.svg"
                                alt="Universitätsmedizin Mannheim"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                Universitätsmedizin Mannheim
                            </h3>
                            <a
                                href="https://www.umm.uni-heidelberg.de/mi3/"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Associated Partners Section -->
            <section class="partners-section">
                <h2 class="section-title">
                    <ITranslate path="partners.subsection3" />
                </h2>
                <div class="partners-grid">
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/IKIM.webp"
                                alt="University Hospital Essen"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                <ITranslate path="partners.partner.name" /> Essen
                            </h3>
                            <a
                                href="https://www.ikim.uk-essen.de"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                    <div class="partner-card">
                        <div class="partner-logo">
                            <img
                                loading="lazy"
                                decoding="async"
                                src="/images/partners/UKSH.webp"
                                alt="University Hospital Schleswig-Holstein"
                            >
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">
                                <ITranslate path="partners.partner.name" /> Schleswig-Holstein
                            </h3>
                            <a
                                href="https://mi-ki.eu/"
                                class="partner-link"
                            ><ITranslate path="partners.partner.info" /></a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Become a Partner Section -->
            <section class="become-partner">
                <div class="become-partner-content">
                    <h2 class="become-partner-title">
                        <ITranslate path="partners.network.title" />
                    </h2>
                    <p class="become-partner-description">
                        <ITranslate path="partners.network.subtitle" />
                    </p>
                    <div class="partner-benefits">
                        <div class="benefit">
                            <h3 class="benefit-title">
                                <ITranslate path="partners.network.box1.title" />
                            </h3>
                            <p class="benefit-description">
                                <ITranslate path="partners.network.box1.text" />
                            </p>
                        </div>
                        <div class="benefit">
                            <h3 class="benefit-title">
                                <ITranslate path="partners.network.box2.title" />
                            </h3>
                            <p class="benefit-description">
                                <ITranslate path="partners.network.box2.text" />
                            </p>
                        </div>
                        <div class="benefit">
                            <h3 class="benefit-title">
                                <ITranslate path="partners.network.box3.title" />
                            </h3>
                            <p class="benefit-description">
                                <ITranslate path="partners.network.box3.text" />
                            </p>
                        </div>
                    </div>
                    <a
                        href="https://docs.privateaim.net/getting-started/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="contact-button"
                    ><ITranslate path="partners.network.button" /></a>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import PageHeader from '../components/PageHeader.vue';
import PartnerMap from '../components/PartnerMap.vue';
import { useTranslation } from '@/i18n';

const title = useTranslation('partners.title');
const subtitle = useTranslation('partners.subtitle');
const description = useTranslation('partners.description');
</script>
<style scoped>
.partners-container {
  width: 100%;
}

.partners-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

/* Partners Section */
.partners-section {
  margin-bottom: 5rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.section-description {
  font-size: 1.1rem;
  color: var(--nav-text);
  margin-bottom: 2.5rem;
  max-width: 800px;
  line-height: 1.6;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.partner-card {
  background-color: var(--card-bg);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px color-mix(in srgb, var(--shadow-color) 5%, transparent);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--border-color);
  height: 100%;
}

.partner-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px color-mix(in srgb, var(--shadow-color) 10%, transparent);
}

.partner-logo {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.0rem;
  background-color: var(--logo-plate);
  border-radius: 0.75rem 0.75rem 0 0;
}

.partner-logo img {
  max-width: 80%;
  max-height: 100px;
  object-fit: contain;

}

.partner-info {
  padding: 1.5rem;
}

.partner-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.partner-description {
  font-size: 0.95rem;
  color: var(--nav-text);
  margin-bottom: 1.25rem;
  line-height: 1.6;
}

.partner-link {
  display: inline-block;
  padding-block: 5px;
  color: var(--link-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
}

.partner-link:hover {
  text-decoration: underline;
}

/* Become a Partner Section */
.become-partner {
  margin-top: 4rem;
  padding: 3rem;
  background-color: var(--tag-bg);
  border-radius: 1rem;
}

.become-partner-content {
  max-width: 900px;
  margin: 0 auto;
}

.become-partner-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-color);
  text-align: center;
}

.become-partner-description {
  font-size: 1.1rem;
  color: var(--nav-text);
  margin-bottom: 2.5rem;
  text-align: center;
  line-height: 1.6;
}

.partner-benefits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.benefit {
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 4px color-mix(in srgb, var(--shadow-color) 5%, transparent);
}

.benefit-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.benefit-description {
  font-size: 0.95rem;
  color: var(--nav-text);
  line-height: 1.6;
}

.partners-intro {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 2.5rem;
  align-items: center;
  margin-bottom: 3rem;
}

.intro-text {
  white-space: pre-line;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-color);
}

.contact-button {
  display: block;
  max-width: 320px;
  margin: 2rem auto 0;
  padding: 0.875rem 1.75rem;
  border-radius: 0.5rem;
  background-color: var(--primary-color);
  color: var(--on-primary);
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.contact-button:hover {
  background-color: var(--primary-hover);
}

@media (max-width: 860px) {
  .partners-intro {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .partners-grid {
    grid-template-columns: 1fr;
  }

  .become-partner {
    padding: 2rem 1.5rem;
  }
}
</style>
