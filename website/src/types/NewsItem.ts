export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  image: string;
  imageAlt: string;
  link: string;
  featured?: boolean;
}
