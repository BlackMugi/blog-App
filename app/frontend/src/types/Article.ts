export interface Article {
  id: number;
  titre: string;
  description: string;
  imageUrl: string;
  datePublication: string;
}

export interface ArticleInput {
  titre: string;
  description: string;
  imageUrl: string;
  datePublication: string;
}