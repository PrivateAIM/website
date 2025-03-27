<template>
  <div class="news-container">
    <div class="page-header">
      <h1>Latest News</h1>
      <p class="header-subtitle">
        Stay updated with the latest developments and announcements from PrivateAIM
      </p>
    </div>

    <div class="news-content">
      <!-- Featured News -->
      <div class="featured-news">
        <div class="featured-news-image">
          <img src="/images/news/test.jpg" alt="PrivateAIM Launches FLAME Platform" />
        </div>
        <div class="featured-news-content">
          <div class="news-date">March 10, 2025</div>
          <h2 class="featured-news-title">PrivateAIM Launches FLAME Platform for Secure Medical Research</h2>
          <p class="featured-news-summary">
            PrivateAIM has officially launched the FLAME (Federated Learning and Analysis in Medicine) platform,
            enabling secure and privacy-preserving medical research across institutions.
          </p>
          <a href="#" class="read-more-link">Read full announcement →</a>
        </div>
      </div>

      <!-- News Grid -->
      <div class="news-grid">
        <!-- News Item 1 -->
        <div class="news-item">
          <div class="news-item-image">
            <img src="/images/news/test.jpg" alt="New Partnership Announcement" />
          </div>
          <div class="news-item-content">
            <div class="news-date">February 25, 2025</div>
            <h3 class="news-item-title">PrivateAIM Announces Partnership with Leading Medical Research Institutions</h3>
            <p class="news-item-summary">
              Five top university hospitals have joined the PrivateAIM network, expanding the reach of privacy-preserving analytics.
            </p>
            <a href="#" class="read-more-link">Read more →</a>
          </div>
        </div>

        <!-- News Item 2 -->
        <div class="news-item">
          <div class="news-item-image">
            <img src="/images/news/test.jpg" alt="Research Grant Awarded" />
          </div>
          <div class="news-item-content">
            <div class="news-date">February 12, 2025</div>
            <h3 class="news-item-title">PrivateAIM Receives Major Research Grant for Federated Learning Advances</h3>
            <p class="news-item-summary">
              The project has been awarded a €2.5M grant to further develop differential privacy techniques in federated learning.
            </p>
            <a href="#" class="read-more-link">Read more →</a>
          </div>
        </div>

        <!-- News Item 3 -->
        <div class="news-item">
          <div class="news-item-image">
            <img src="/images/news/test.jpg" alt="Conference Presentation" />
          </div>
          <div class="news-item-content">
            <div class="news-date">January 30, 2025</div>
            <h3 class="news-item-title">PrivateAIM Presents at International Medical Informatics Conference</h3>
            <p class="news-item-summary">
              Team members showcased the latest advances in privacy-preserving healthcare analytics at the IMIA conference.
            </p>
            <a href="#" class="read-more-link">Read more →</a>
          </div>
        </div>

        <!-- News Item 4 -->
        <div class="news-item">
          <div class="news-item-image">
            <img src="/images/news/test.jpg" alt="New Team Members" />
          </div>
          <div class="news-item-content">
            <div class="news-date">January 15, 2025</div>
            <h3 class="news-item-title">PrivateAIM Expands Team with Privacy and AI Experts</h3>
            <p class="news-item-summary">
              Three new researchers specializing in cryptography and healthcare AI have joined the project.
            </p>
            <a href="#" class="read-more-link">Read more →</a>
          </div>
        </div>

        <!-- News Item 5 -->
        <div class="news-item">
          <div class="news-item-image">
            <img src="/images/news/test.jpg" alt="Software Release" />
          </div>
          <div class="news-item-content">
            <div class="news-date">December 8, 2024</div>
            <h3 class="news-item-title">PrivateAIM Releases Open-Source Privacy Toolkit for Researchers</h3>
            <p class="news-item-summary">
              A new set of tools for implementing differential privacy in medical research is now available on GitHub.
            </p>
            <a href="#" class="read-more-link">Read more →</a>
          </div>
        </div>

        <!-- News Item 6 -->
        <div class="news-item">
          <div class="news-item-image">
            <img src="/images/news/test.jpg" alt="Workshop Announcement" />
          </div>
          <div class="news-item-content">
            <div class="news-date">November 15, 2024</div>
            <h3 class="news-item-title">PrivateAIM to Host Workshop on Federated Learning in Healthcare</h3>
            <p class="news-item-summary">
              Registration is now open for the virtual workshop featuring speakers from leading medical and AI institutions.
            </p>
            <a href="#" class="read-more-link">Read more →</a>
          </div>
        </div>
      </div>

      <!-- Newsletter Signup -->
      <div class="newsletter-section">
        <h2 class="newsletter-title">Stay Updated</h2>
        <p class="newsletter-description">
          Subscribe to our newsletter to receive the latest news and updates from PrivateAIM directly in your inbox.
        </p>
        <div class="newsletter-form">
          <input type="email" placeholder="Your email address" class="newsletter-input" />
          <button class="newsletter-button">Subscribe</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-container {
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
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.news-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

/* Featured News */
.featured-news {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  background-color: var(--card-bg, #ffffff);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color, #eaeaea);
}

.featured-news-image {
  height: 100%;
  width: 100%;
}

.featured-news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-news-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.news-date {
  font-size: 0.9rem;
  color: var(--footer-text, #718096);
  margin-bottom: 0.75rem;
}

.featured-news-title {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: var(--text-color, #1a202c);
  line-height: 1.3;
}

.featured-news-summary {
  font-size: 1.1rem;
  color: var(--nav-text, #4a5568);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
}

.read-more-link {
  color: var(--primary-color, #3182ce);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  margin-top: auto;
}

.read-more-link:hover {
  text-decoration: underline;
}

/* News Grid */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.news-item {
  background-color: var(--card-bg, #ffffff);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--border-color, #eaeaea);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.news-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.news-item-image {
  height: 200px;
  overflow: hidden;
}

.news-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-item:hover .news-item-image img {
  transform: scale(1.05);
}

.news-item-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.news-item-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--text-color, #1a202c);
  line-height: 1.4;
}

.news-item-summary {
  font-size: 0.95rem;
  color: var(--nav-text, #4a5568);
  margin-bottom: 1.25rem;
  line-height: 1.6;
  flex-grow: 1;
}

/* Newsletter Section */
.newsletter-section {
  text-align: center;
  background-color: var(--tag-bg, #f7fafc);
  padding: 3rem;
  border-radius: 0.75rem;
  margin-top: 3rem;
}

.newsletter-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-color, #1a202c);
}

.newsletter-description {
  max-width: 600px;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
  color: var(--nav-text, #4a5568);
  line-height: 1.6;
}

.newsletter-form {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-input {
  flex-grow: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color, #eaeaea);
  border-radius: 0.5rem 0 0 0.5rem;
  font-size: 1rem;
}

.newsletter-button {
  background-color: var(--primary-color, #3182ce);
  color: white;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.newsletter-button:hover {
  background-color: #2c5282;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .featured-news {
    grid-template-columns: 1fr;
  }

  .featured-news-image {
    height: 300px;
  }

  .news-grid {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 2.5rem;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-input {
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .newsletter-button {
    border-radius: 0.5rem;
    width: 100%;
  }
}
</style>
