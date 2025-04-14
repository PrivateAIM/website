export interface Author {
  name: string;
  role?: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;  // Keeping your original field name
  author: Author;
  date: string;
  content: string;
  image?: string;
  tags: string[];
  category: string | BlogCategory;
  featured?: boolean;
  readTime?: number;  // Keeping as optional as in your original
}

// Categories for organization
export type BlogCategory =
  | 'General Introduction'
  | 'PrivateAIM Insights'
  | 'Technical Deep Dives'
  | 'Challenges and Solutions'
  | 'Tutorials and Guides'
  | 'Ethical and Social Aspects'
  | 'PrivateAIM Case Studies'
  | 'Future Directions'
  | 'Thought Leadership';
