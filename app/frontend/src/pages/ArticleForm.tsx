import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createArticle, getArticleById, updateArticle } from '../services/api';
import type { ArticleInput } from '../types/Article';

const emptyForm: ArticleInput = {
  titre: '',
  description: '',
  imageUrl: '',
  datePublication: '',
};

export default function ArticleForm() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<ArticleInput>(emptyForm);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEditMode || !id) return;
    getArticleById(Number(id))
      .then((article) =>
        setForm({
          titre: article.titre,
          description: article.description,
          imageUrl: article.imageUrl,
          datePublication: article.datePublication,
        })
      )
      .catch(() => setError('Impossible de charger cet article.'))
      .finally(() => setLoading(false));
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      if (isEditMode && id) {
        await updateArticle(Number(id), form);
        navigate(`/articles/${id}`);
      } else {
        const created = await createArticle(form);
        navigate(`/articles/${created.id}`);
      }
    } catch {
      setError("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Chargement...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-4">
        {isEditMode ? "Modifier l'article" : 'Nouvel article'}
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
          <input
            name="titre"
            value={form.titre}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL de l'image</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date de publication</label>
          <input
            type="date"
            name="datePublication"
            value={form.datePublication}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {submitting ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </form>
    </div>
  );
}