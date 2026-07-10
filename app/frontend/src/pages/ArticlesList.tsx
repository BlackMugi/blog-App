import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/api';
import type { Article } from '../types/Article';

export default function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getArticles()
      .then(setArticles)
      .catch(() => setError('Impossible de charger les articles.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-gray-500">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (articles.length === 0) return <p className="text-center text-gray-500">Aucun article pour le moment.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
          <img
            src={article.imageUrl}
            alt={article.titre}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex flex-col flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">{article.titre}</h2>
            <p className="text-sm text-gray-500 mb-2">{article.datePublication}</p>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">{article.description}</p>
            <Link
              to={`/articles/${article.id}`}
              className="text-blue-600 hover:underline text-sm font-medium mt-auto"
            >
              Voir plus →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}