<template>
  <div class="partners-container">
    <div class="page-header">
      <h1>{{ $t('partners.title') }}</h1>
      <p class="header-subtitle">
        {{ $t('partners.description') }}
      </p>
    </div>

    <div class="partners-content">
      <section class="partners-section">
        <h2 class="section-title">{{ $t('partners.subsection1') }}</h2>
        <div class="partners-grid">
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/BIH.png" alt="Charité Berlin" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">Charité Berlin</h3>
              <a href="https://www.bihealth.org/de/forschung/arbeitsgruppe/ag-prasser-medizininformatik" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/UKT.png" alt="Universitätsklinikum Tübingen" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">{{ $t('partners.partner.name') }} Tübingen</h3>
              <a href="https://www.medizin.uni-tuebingen.de/de/das-klinikum/einrichtungen/institute/informationstechnologie-und-medizininformatik/translationale-bioinformatik" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/TUM.svg" alt="TUM Klinikum Rechts der Isar" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">TUM Klinikum Rechts der Isar</h3>
              <a href="https://www.kiinformatik.mri.tum.de" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
        </div>
      </section>

      <section class="partners-section">
        <h2 class="section-title">{{ $t('partners.subsection2') }}</h2>
        <div class="partners-grid">
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/LMU.png" alt="Ludwig-Maximilians-Universität München" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">Ludwig-Maximilians-Universität München</h3>
              <a href="https://www.ibe.med.uni-muenchen.de/index.html" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/DKFZ.png" alt="Deutsche Krebsforschungszentrum" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">Deutsche Krebsforschungszentrum</h3>
              <a href="https://www.dkfz.de" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/EKUT.png" alt="Eberhard Karls Universität Tübingnen" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">Eberhard Karls Universität Tübingnen</h3>
              <a href="https://uni-tuebingen.de/fakultaeten/mathematisch-naturwissenschaftliche-fakultaet/fachbereiche/informatik/lehrstuehle/methods-in-medical-informatics/" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/TMF.jpg" alt="TMF" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">TMF</h3>
              <a href="https://www.tmf-ev.de" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/UKU.svg" alt="Universität Ulm" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">Universität Ulm</h3>
              <a href="https://sysbio.uni-ulm.de" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/UKER.svg" alt="Universitätsklinikum Erlangen" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">{{ $t('partners.partner.name') }} Erlangen</h3>
              <a href="https://www.imi.med.fau.de" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/UKFR.png" alt="Universitätsklinikum Freiburg" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">{{ $t('partners.partner.name') }} Freiburg</h3>
              <a href="https://www.uniklinik-freiburg.de/imbi.html" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/UKHD.png" alt="Universitätsklinikum Heidelberg" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">{{ $t('partners.partner.name') }} Heidelberg</h3>
              <a href="https://www.klinikum.uni-heidelberg.de/zentrum-fuer-innere-medizin-medizin-klinik/innere-medizin-iii-kardiologie-angiologie-und-pneumologie/forschung/forschung/klaus-tschira-institut-for-computational-cardiology" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/UKK.png" alt="Universitätsklinikum Köln" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">{{ $t('partners.partner.name') }} Köln</h3>
              <a href="https://www.uk-koeln.de/forschung/medical-data-integration-center-medic/" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/UKL.png" alt="Universitätsklinikum Leipzig" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">{{ $t('partners.partner.name') }} Leipzig</h3>
              <a href="https://www.uniklinikum-leipzig.de/einrichtungen/medical-data-science/" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/CISPA.svg" alt="CISPA" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">CISPA</h3>
              <a href="https://cispa.de/de" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/UMM.svg" alt="Universitätsmedizin Mannheim" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">Universitätsmedizin Mannheim</h3>
              <a href="https://www.umm.uni-heidelberg.de/mi3/" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Associated Partners Section -->
      <section class="partners-section">
        <h2 class="section-title">{{ $t('partners.subsection3') }}</h2>
        <div class="partners-grid">
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/IKIM.png" alt="University Hospital Essen" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">{{ $t('partners.partner.name') }} Essen</h3>
              <a href="https://www.ikim.uk-essen.de" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/UKSH.png" alt="University Hospital Schleswig-Holstein" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">{{ $t('partners.partner.name') }} Schleswig-Holstein</h3>
              <a href="https://mi-ki.eu/de/willkommen/" class="partner-link">{{ $t('partners.partner.info') }}</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Become a Partner Section -->
      <section class="become-partner">
        <div class="become-partner-content">
          <h2 class="become-partner-title">{{ $t('partners.network.title') }}</h2>
          <p class="become-partner-description">
            {{ $t('partners.network.subtitle') }}
          </p>
          <div class="partner-benefits">
            <div class="benefit">
              <h3 class="benefit-title">{{ $t('partners.network.box1.title') }}</h3>
              <p class="benefit-description">
                {{ $t('partners.network.box1.text') }}
              </p>
            </div>
            <div class="benefit">
              <h3 class="benefit-title">{{ $t('partners.network.box2.title') }}</h3>
              <p class="benefit-description">
                {{ $t('partners.network.box2.text') }}
              </p>
            </div>
            <div class="benefit">
              <h3 class="benefit-title">{{ $t('partners.network.box3.title') }}</h3>
              <p class="benefit-description">
                {{ $t('partners.network.box3.text') }}
              </p>
            </div>
          </div>
          <a href="#" class="contact-button">{{ $t('partners.network.button') }}</a>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.partners-container {
  width: 100%;
}

.page-header {
  background-color: var(--primary-color, #3182ce);
  color: white;
  padding: 4rem 1rem;
  text-align: center;
}

.page-header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.header-subtitle {
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
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
  color: var(--text-color, #1a202c);
}

.section-description {
  font-size: 1.1rem;
  color: var(--nav-text, #4a5568);
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
  background-color: var(--card-bg, #ffffff);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--border-color, #eaeaea);
  height: 100%;
}

.partner-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.partner-logo {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: var(--tag-bg, #f7fafc);
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
  color: var(--text-color, #1a202c);
}

.partner-description {
  font-size: 0.95rem;
  color: var(--nav-text, #4a5568);
  margin-bottom: 1.25rem;
  line-height: 1.6;
}

.partner-link {
  color: var(--primary-color, #3182ce);
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
  background-color: var(--tag-bg, #f7fafc);
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
  color: var(--text-color, #1a202c);
  text-align: center;
}

.become-partner-description {
  font-size: 1.1rem;
  color: var(--nav-text, #4a5568);
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
  background-color: var(--card-bg, #ffffff);
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.benefit-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-color, #1a202c);
}

.benefit-description {
  font-size: 0.95rem;
  color: var(--nav-text, #4a5568);
  line-height: 1.6;
}

.contact-button {
  display: block;
  background-color: var(--primary-color, #3182ce);
  color: white;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.875rem 1.75rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s ease;
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}

.contact-button:hover {
  background-color: #2c5282;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .partners-grid {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 2.5rem;
  }

  .become-partner {
    padding: 2rem 1.5rem;
  }
}
</style>
<script setup lang="ts">
</script>
