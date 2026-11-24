<template>
    <div class="legal-container">
        <PageHeader :title="pageTitle" />

        <div class="legal-content">
            <section class="legal-section">
                <p class="address">
                    <b><ITranslate path="imprint.information.entity" /></b><br>
                    <ITranslate path="imprint.information.department" /><br>
                    <ITranslate path="imprint.information.address1" /><br>
                    <ITranslate path="imprint.information.address2" />
                </p>

                <p>
                    <ITranslate path="imprint.information.contact.phone" />: 030 450 543 049<br>
                    <ITranslate path="imprint.information.contact.fax" />: 030 450 7543999<br>
                    <ITranslate path="imprint.information.contact.email" />: info@bih-charite.de
                </p>
            </section>

            <section class="legal-section">
                <h2><ITranslate path="imprint.representation.title" /></h2>
                <p>
                    Prof. Dr. Christopher H. Baum
                </p>
            </section>

            <section class="legal-section">
                <h2><ITranslate path="imprint.contact.title" /></h2>
                <p>
                    Prof. Dr. Fabian Prasser<br>
                    <ITranslate path="imprint.contact.department" /><br>
                    <ITranslate path="imprint.contact.institute" /><br>
                    <ITranslate path="imprint.contact.address1" /><br>
                    <ITranslate path="imprint.contact.address2" /><br>
                    <ITranslate path="imprint.contact.email" />: fabian.prasser@bih-charite.de
                </p>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import { useTranslation } from '@/i18n';

const pageTitle = useTranslation('imprint.title');
</script>

<style scoped>
.legal-container {
  width: 100%;
}



.legal-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1rem 5rem;
  color: var(--text-color);
}

.legal-section {
  margin-bottom: 3rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
}

h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  color: var(--text-color);
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

/* Responsive adjustments */
@media (max-width: 768px) {


  .legal-content {
    padding: 2rem 1rem 3rem;
  }
}
</style>
