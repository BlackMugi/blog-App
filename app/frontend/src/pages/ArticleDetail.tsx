import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { deleteArticle, getArticleById } from '../services/api';
import type { Article } from '../types/Article';

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getArticleById(Number(id))
      .then(setArticle)
      .catch(() => setError('Article introuvable.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!id || !confirm('Supprimer cet article ?')) return;
    await deleteArticle(Number(id));
    navigate('/');
  };

  if (loading) return <p className="text-center text-gray-500">Chargement...</p>;
  if (error || !article) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <img src={article.imageUrl} alt={article.titre} className="w-full h-80 object-cover" />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{article.titre}</h1>
        <p className="text-sm text-gray-500 mb-4">{article.datePublication}</p>
        <p className="text-gray-700 whitespace-pre-line mb-6">{article.description}</p>

        <div className="flex gap-3">
          <Link
            to={`/articles/${article.id}/edit`}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Modifier
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Supprimer
          </button>
          <Link to="/" className="ml-auto text-blue-600 hover:underline self-center">
            ← Retour à la liste
          </Link>
        </div>
      </div>
    </div>
  );
}