import generalIntroductionPosts from './generalIntroduction';
import privateaimInsightsPosts from './privateaimInsights.ts';
import technicalDeepDivesPosts from './technicalDeepDives';
// Import other category files as you create them

// Combine all blog posts
const allBlogPosts = [
  ...generalIntroductionPosts,
  ...privateaimInsightsPosts,
  ...technicalDeepDivesPosts,
  // Add other categories as you create them
];

// Sort them by date (newest first)
const sortedBlogPosts = allBlogPosts.sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export {
  sortedBlogPosts,
  generalIntroductionPosts,
  privateaimInsightsPosts,
  technicalDeepDivesPosts,
  // Export other categories as you create them
};
