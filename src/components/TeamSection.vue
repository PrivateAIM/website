<template>
  <section class="team-section">
    <div class="team-container">
      <h2 class="section-title">Our Team</h2>
      <p class="section-subtitle">
        Meet the experts behind PrivateAIM who are dedicated to advancing privacy-preserving technologies in medical research.
      </p>

      <div class="team-grid">
        <!-- Core Team Members -->
        <div class="team-member">
          <div class="member-photo">
            <img src="/images/team/test.jpg" alt="Test Test" />
          </div>
          <div class="member-info">
            <h3 class="member-name">Test Test</h3>
            <p class="member-title">Cryptography Specialist</p>
            <p class="member-description">
              Leading the development of homomorphic encryption and secure multi-party computation protocols for PrivateAIM.
            </p>
            <div class="member-links">
              <a href="https://github.com/" target="_blank" class="member-link">
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/" target="_blank" class="member-link">
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div class="team-member">
          <div class="member-photo">
            <img src="/images/team/test.jpg" alt="Test Test" />
          </div>
          <div class="member-info">
            <h3 class="member-name">Test Test</h3>
            <p class="member-title">AI Researcher</p>
            <p class="member-description">
              Specializing in decentralized AUC computation and federated learning algorithms for healthcare applications.
            </p>
            <div class="member-links">
              <a href="https://github.com/" target="_blank" class="member-link">
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/" target="_blank" class="member-link">
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div class="team-member">
          <div class="member-photo">
            <img src="/images/team/test.jpg" alt="Test Test" />
          </div>
          <div class="member-info">
            <h3 class="member-name">Test Test</h3>
            <p class="member-title">Healthcare Innovation Lead</p>
            <p class="member-description">
              Bridging the gap between medical research needs and federated learning implementation.
            </p>
            <div class="member-links">
              <a href="https://github.com/" target="_blank" class="member-link">
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/" target="_blank" class="member-link">
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div class="team-member">
          <div class="member-photo">
            <img src="/images/team/test.jpg" alt="Test Test" />
          </div>
          <div class="member-info">
            <h3 class="member-name">Test Test</h3>
            <p class="member-title">Software Engineer</p>
            <p class="member-description">
              Developing FLAME platform architecture and infrastructure for secure federated learning.
            </p>
            <div class="member-links">
              <a href="https://github.com/" target="_blank" class="member-link">
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/" target="_blank" class="member-link">
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div class="team-member">
          <div class="member-photo">
            <img src="/images/team/test.jpg" alt="Test Test" />
          </div>
          <div class="member-info">
            <h3 class="member-name">Test Test</h3>
            <p class="member-title">Security Architect</p>
            <p class="member-description">
              Ensuring robust security across all aspects of the PrivateAIM platform.
            </p>
            <div class="member-links">
              <a href="https://github.com/" target="_blank" class="member-link">
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/" target="_blank" class="member-link">
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div class="team-member">
          <div class="member-photo">
            <img src="/images/team/test.jpg" alt="Test Test" />
          </div>
          <div class="member-info">
            <h3 class="member-name">Test Test</h3>
            <p class="member-title">Privacy Researcher</p>
            <p class="member-description">
              Focusing on differential privacy techniques and privacy-preserving data analysis.
            </p>
            <div class="member-links">
              <a href="https://github.com/" target="_blank" class="member-link">
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/" target="_blank" class="member-link">
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Academic Partners Section -->
      <div class="partners-section">
        <h3 class="partners-title">Academic Partners</h3>
        <div class="partners-grid">
          <div class="partner">
            <img src="/images/partners/test.jpg" alt="University Hospital Bonn" class="partner-logo" />
            <h4 class="partner-name">University Hospital Bonn</h4>
          </div>
          <div class="partner">
            <img src="/images/partners/test.jpg" alt="Charité Berlin" class="partner-logo" />
            <h4 class="partner-name">Charité Berlin</h4>
          </div>
          <div class="partner">
            <img src="/images/partners/test.jpg" alt="University Hospital Heidelberg" class="partner-logo" />
            <h4 class="partner-name">University Hospital Heidelberg</h4>
          </div>
        </div>
      </div>

      <!-- Join Us Section -->
      <div class="join-section">
        <h3 class="join-title">Join Our Team</h3>
        <p class="join-description">
          We're always looking for talented individuals passionate about privacy-preserving AI in healthcare.
          Check out our open positions or reach out to discuss collaboration opportunities.
        </p>
        <a href="#" class="join-button">View Open Positions</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-section {
  padding: 4rem 0;
  background-color: var(--tag-bg, #f7fafc);
}

.team-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-color, #1a202c);
}

.section-subtitle {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  font-size: 1.25rem;
  color: var(--nav-text, #4a5568);
  line-height: 1.6;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
}

.team-member {
  background-color: var(--card-bg, #ffffff);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--border-color, #eaeaea);
}

.team-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.member-photo {
  height: 250px;
  overflow: hidden;
}

.member-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.team-member:hover .member-photo img {
  transform: scale(1.05);
}

.member-info {
  padding: 1.5rem;
}

.member-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-color, #1a202c);
}

.member-title {
  font-size: 0.95rem;
  color: var(--primary-color, #3182ce);
  margin-bottom: 1rem;
}

.member-description {
  font-size: 0.95rem;
  color: var(--nav-text, #4a5568);
  margin-bottom: 1.25rem;
  line-height: 1.6;
}

.member-links {
  display: flex;
  gap: 1rem;
}

.member-link {
  font-size: 0.9rem;
  color: var(--nav-text, #4a5568);
  text-decoration: none;
}

.member-link:hover {
  color: var(--primary-color, #3182ce);
}

/* Partners Section */
.partners-section {
  margin-bottom: 4rem;
}

.partners-title {
  font-size: 1.75rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color, #1a202c);
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-items: center;
}

.partner {
  text-align: center;
  padding: 1.5rem;
  background-color: var(--card-bg, #ffffff);
  border-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
  border: 1px solid var(--border-color, #eaeaea);
}

.partner-logo {
  height: 80px;
  width: auto;
  margin-bottom: 1rem;
  object-fit: contain;
}

.partner-name {
  font-size: 1.1rem;
  color: var(--text-color, #1a202c);
}

/* Join Us Section */
.join-section {
  text-align: center;
  background-color: var(--card-bg, #ffffff);
  padding: 3rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color, #eaeaea);
}

.join-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-color, #1a202c);
}

.join-description {
  max-width: 700px;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
  color: var(--nav-text, #4a5568);
  line-height: 1.6;
}

.join-button {
  display: inline-block;
  background-color: var(--primary-color, #3182ce);
  color: white;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.join-button:hover {
  background-color: #2c5282;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
  }

  .join-section {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .team-grid {
    grid-template-columns: 1fr;
  }

  .partners-grid {
    grid-template-columns: 1fr;
  }
}
</style>
<script setup lang="ts">
</script>
