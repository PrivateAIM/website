<template>
  <div class="legal-container">
    <div class="page-header">
      <h1>{{ $t('imprint.title') }}</h1>
    </div>

    <div class="legal-content">
      <section class="legal-section">
        <h2>{{ $t('imprint.information.title') }}</h2>
        <p class="address">
          {{ $t('imprint.information.entity') }}<br>
          {{ $t('imprint.information.department') }}<br>
          {{ $t('imprint.information.address1') }}<br>
          {{ $t('imprint.information.address2') }}
        </p>

        <p>
          {{ $t('imprint.information.contact.phone') }}: 030 450 543 049<br>
          {{ $t('imprint.information.contact.fax') }}: 030 450 7543999<br>
          {{ $t('imprint.information.contact.email') }}: info@bih-charite.de
        </p>
      </section>

      <section class="legal-section">
        <h2>{{ $t('imprint.representation.title') }}</h2>
        <p>
          Prof. Dr. Christopher H. Baum
        </p>
      </section>

      <section class="legal-section">
        <h2>{{ $t('imprint.contact.title') }}</h2>
        <p>
          Prof. Dr. Fabian Prasser<br>
          {{ $t('imprint.contact.department') }}<br>
          {{ $t('imprint.contact.institute') }}<br>
          {{ $t('imprint.contact.address1') }}<br>
          {{ $t('imprint.contact.address2') }}<br>
          {{ $t('imprint.contact.email') }}: fabian.prasser@bih-charite.de
        </p>
      </section>

      <section class="legal-section">
        <h2>{{ $t('imprint.disclaimer.title') }}</h2>

        <h3>{{ $t('imprint.disclaimer.content.title') }}</h3>
        <p>{{ $t('imprint.disclaimer.content.text') }}</p>

        <h3>{{ $t('imprint.disclaimer.links.title') }}</h3>
        <p>{{ $t('imprint.disclaimer.links.text') }}</p>

        <h3>{{ $t('imprint.disclaimer.copyright.title') }}</h3>
        <p>{{ $t('imprint.disclaimer.copyright.text') }}</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.legal-container {
  width: 100%;
}

.page-header {
  background-color: var(--primary-color, #3182ce);
  color: white;
  padding: 3rem 1rem;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
}

.legal-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1rem 5rem;
  color: var(--text-color, #1a202c);
}

.legal-section {
  margin-bottom: 3rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-color, #1a202c);
  border-bottom: 1px solid var(--border-color, #eaeaea);
  padding-bottom: 0.5rem;
}

h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  color: var(--text-color, #1a202c);
}

p {
  margin-bottom: 1.2rem;
  line-height: 1.6;
}

.address {
  font-style: normal;
}

strong {
  font-weight: 600;
}

/* Dark mode specifics */
:global(.dark-mode) .legal-content {
  color: var(--card-bg, #ffffff);
}

:global(.dark-mode) h2,
:global(.dark-mode) h3 {
  color: var(--card-bg, #ffffff);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .page-header {
    padding: 2rem 1rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .legal-content {
    padding: 2rem 1rem 3rem;
  }
}
</style>
