<template>
  <div class="partners-container">
    <div class="page-header">
      <h1>Our Partners</h1>
      <p class="header-subtitle">
        Collaboration is at the heart of PrivateAIM's mission. Meet the organizations working with us to advance privacy-preserving medical research.
      </p>
    </div>

    <div class="partners-content">
      <!-- Academic Partners Section -->
      <section class="partners-section">
        <h2 class="section-title">Academic Partners</h2>
        <p class="section-description">
          Leading research institutions and hospitals collaborating with PrivateAIM to advance medical knowledge while maintaining patient privacy.
        </p>

        <div class="partners-grid">
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/test.jpg" alt="University Hospital Bonn" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">University Hospital Bonn</h3>
              <p class="partner-description">
                Leading healthcare research in secure federated analytics and privacy-preserving techniques for patient data.
              </p>
              <a href="#" class="partner-link">Learn more →</a>
            </div>
          </div>

          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/test.jpg" alt="Charité Berlin" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">Charité Berlin</h3>
              <p class="partner-description">
                Developing innovative approaches to collaborative research in precision medicine and rare disease treatment.
              </p>
              <a href="#" class="partner-link">Learn more →</a>
            </div>
          </div>

          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/test.jpg" alt="University Hospital Heidelberg" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">University Hospital Heidelberg</h3>
              <p class="partner-description">
                Pioneering cancer research through privacy-preserving analytics across multiple institutions.
              </p>
              <a href="#" class="partner-link">Learn more →</a>
            </div>
          </div>

          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/test.jpg" alt="Medical Informatics Initiative" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">Medical Informatics Initiative</h3>
              <p class="partner-description">
                National consortium advancing digital infrastructure for privacy-preserving medical research.
              </p>
              <a href="#" class="partner-link">Learn more →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Technical Partners Section -->
      <section class="partners-section">
        <h2 class="section-title">Technical Partners</h2>
        <p class="section-description">
          Organizations providing technological expertise and infrastructure to support PrivateAIM's mission.
        </p>

        <div class="partners-grid">
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/test.jpg" alt="Technical University Munich" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">Technical University Munich</h3>
              <p class="partner-description">
                Providing expertise in cryptographic techniques and machine learning optimization for federated systems.
              </p>
              <a href="#" class="partner-link">Learn more →</a>
            </div>
          </div>

          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/test.jpg" alt="German Research Center for Artificial Intelligence" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">German Research Center for AI</h3>
              <p class="partner-description">
                Developing advanced AI models optimized for privacy-preserving medical research.
              </p>
              <a href="#" class="partner-link">Learn more →</a>
            </div>
          </div>

          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/test.jpg" alt="European Secure Computing Consortium" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">European Secure Computing Consortium</h3>
              <p class="partner-description">
                Supporting secure computation infrastructure for cross-border medical research.
              </p>
              <a href="#" class="partner-link">Learn more →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Funding Partners Section -->
      <section class="partners-section">
        <h2 class="section-title">Funding Partners</h2>
        <p class="section-description">
          Organizations providing financial support to make PrivateAIM's work possible.
        </p>

        <div class="partners-grid">
          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/test.jpg" alt="European Research Council" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">European Research Council</h3>
              <p class="partner-description">
                Supporting groundbreaking research in privacy-preserving technologies for healthcare.
              </p>
              <a href="#" class="partner-link">Learn more →</a>
            </div>
          </div>

          <div class="partner-card">
            <div class="partner-logo">
              <img src="/images/partners/test.jpg" alt="German Ministry of Education and Research" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">German Ministry of Education and Research</h3>
              <p class="partner-description">
                Funding innovative approaches to secure medical collaboration and research.
              </p>
              <a href="#" class="partner-link">Learn more →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Become a Partner Section -->
      <section class="become-partner">
        <div class="become-partner-content">
          <h2 class="become-partner-title">Join Our Network</h2>
          <p class="become-partner-description">
            Interested in collaborating with PrivateAIM? We're always looking to expand our network of partners who share our vision of privacy-preserving medical research.
          </p>
          <div class="partner-benefits">
            <div class="benefit">
              <h3 class="benefit-title">Access to Cutting-Edge Technology</h3>
              <p class="benefit-description">
                Work with our team to implement state-of-the-art federated learning systems.
              </p>
            </div>
            <div class="benefit">
              <h3 class="benefit-title">Collaborative Research Opportunities</h3>
              <p class="benefit-description">
                Participate in multi-institutional studies without compromising data sovereignty.
              </p>
            </div>
            <div class="benefit">
              <h3 class="benefit-title">Shape the Future of Medical Research</h3>
              <p class="benefit-description">
                Help define standards and best practices for privacy-preserving analytics.
              </p>
            </div>
          </div>
          <a href="#" class="contact-button">Contact Us to Discuss Partnership</a>
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
