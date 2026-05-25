'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye } from 'lucide-react'

declare global {
  interface Window {
    Quill: any
    flatpickr: any
  }
}

interface Category {
  id: string
  name: string
  slug: string
}

interface ArticleFormData {
  id: string
  title: string
  slug: string
  publishDate: string
  category: string
  author: string
  metaDesc: string
  content: string
  imageUrl: string
  status: string
}

export default function EditArticlePage() {
  const params = useParams()
  const router = useRouter()
  const articleId = params.id as string
  const isNewArticle = articleId === 'new'

  const [loading, setLoading] = useState(false)
  const [scriptsLoaded, setScriptsLoaded] = useState(false)
  const [quillReady, setQuillReady] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const quillRef = useRef<any>(null)
  const quillInitRef = useRef(false)
  const datePickerRef = useRef<any>(null)
  const editorWrapperRef = useRef<HTMLDivElement>(null)
  const dateInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<ArticleFormData>({
    id: '',
    title: '',
    slug: '',
    publishDate: '',
    category: '',
    author: 'Администратор',
    metaDesc: '',
    content: '',
    imageUrl: '',
    status: 'published',
  })

  // ─── 1. Загружаем только Quill CSS + flatpickr CSS (не Bootstrap!) ───────────
  useEffect(() => {
    const addedElements: HTMLElement[] = []

    const cssUrls = [
      'https://cdn.quilljs.com/1.3.6/quill.snow.css',
      'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
    ]

    cssUrls.forEach((url) => {
      if (!document.querySelector(`link[href="${url}"]`)) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = url
        link.setAttribute('data-admin-edit', 'true')
        document.head.appendChild(link)
        addedElements.push(link)
      }
    })

    // Компактные стили только для Quill-контейнера
    const style = document.createElement('style')
    style.setAttribute('data-admin-edit', 'true')
    style.textContent = `
      .ql-container { min-height: 300px; font-size: 15px; border-radius: 0 0 8px 8px !important; }
      .ql-toolbar { border-radius: 8px 8px 0 0 !important; background: #f9fafb; }
      .ql-editor { min-height: 300px; padding: 16px; }
      .ql-editor ul, .ql-editor ol { padding-left: 1.5em; }
      .ql-editor ul li { list-style-type: disc; }
      .ql-editor ol li { list-style-type: decimal; }
      .flatpickr-calendar { font-family: 'Nunito', sans-serif; }
    `
    document.head.appendChild(style)
    addedElements.push(style)

    return () => {
      addedElements.forEach((el) => {
        try { el.remove() } catch { /* ignore */ }
      })
      document.querySelectorAll('[data-admin-edit]').forEach((el) => {
        try { el.remove() } catch { /* ignore */ }
      })
    }
  }, [])

  // ─── 2. Скрипты ───────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false

    if (window.Quill && window.flatpickr) {
      setScriptsLoaded(true)
      return
    }

    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          const check = setInterval(() => {
            if (
              (src.includes('quill') && window.Quill) ||
              (src.includes('flatpickr') && window.flatpickr)
            ) {
              clearInterval(check)
              resolve()
            }
          }, 50)
          setTimeout(() => { clearInterval(check); resolve() }, 10000)
          return
        }
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = () => reject(new Error(`Failed to load: ${src}`))
        document.head.appendChild(script)
      })

    Promise.all([
      loadScript('https://cdn.quilljs.com/1.3.6/quill.js'),
      loadScript('https://cdn.jsdelivr.net/npm/flatpickr'),
    ])
      .then(() => { if (!cancelled) setScriptsLoaded(true) })
      .catch(console.error)

    return () => { cancelled = true }
  }, [])

  // ─── 3. Категории ────────────────────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data))
      .catch(console.error)
  }, [])

  // ─── 4. Загрузка статьи ──────────────────────────────────────────────────────
  useEffect(() => {
    if (isNewArticle) {
      if (categories.length > 0) {
        setFormData((prev) => ({
          ...prev,
          category: categories[0].slug,
          publishDate: new Date().toISOString(),
        }))
        setDataLoaded(true)
      }
      return
    }

    if (!articleId) return
    setLoading(true)

    fetch(`/api/posts/${articleId}`)
      .then((res) => res.json())
      .then((article: any) => {
        const categorySlug =
          article.categories?.slug ||
          categories.find((c: Category) => c.id === article.category_id)?.slug ||
          ''
        setFormData({
          id: article.id,
          title: article.title || '',
          slug: article.slug || '',
          publishDate: article.publish_date || article.created_at || new Date().toISOString(),
          category: categorySlug,
          author: article.author || 'Администратор',
          metaDesc: article.description || article.meta_description || '',
          content: article.content || '',
          imageUrl: article.image_url || '',
          status: article.status || 'published',
        })
        setDataLoaded(true)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [articleId, categories])

  // ─── 5. Quill ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!scriptsLoaded || !dataLoaded || !editorWrapperRef.current) return
    if (quillInitRef.current) return
    if (!window.Quill) return

    const editorDiv = document.createElement('div')
    editorDiv.style.height = 'auto'
    editorWrapperRef.current.appendChild(editorDiv)

    try {
      const quill = new window.Quill(editorDiv, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ color: [] }, { background: [] }],
            ['link', 'image'],
            ['clean'],
          ],
        },
        placeholder: 'Введите содержание статьи...',
      })

      if (formData.content) {
        quill.root.innerHTML = formData.content
      }

      quill.on('text-change', () => {
        setFormData((prev) => ({ ...prev, content: quill.root.innerHTML }))
      })

      quillRef.current = quill
      quillInitRef.current = true
      setQuillReady(true)
    } catch (error) {
      console.error('Error initializing Quill:', error)
    }
  }, [scriptsLoaded, dataLoaded])

  // ─── 6. Flatpickr ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!scriptsLoaded || !dataLoaded || !dateInputRef.current) return
    if (datePickerRef.current) return
    if (!window.flatpickr) return

    try {
      const fp = window.flatpickr(dateInputRef.current, {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        defaultDate: formData.publishDate || new Date(),
        time_24hr: true,
        onChange: (dates: Date[]) => {
          if (dates[0]) {
            setFormData((prev) => ({ ...prev, publishDate: dates[0].toISOString() }))
          }
        },
      })
      datePickerRef.current = fp
      if (formData.publishDate) fp.setDate(formData.publishDate)
    } catch (error) {
      console.error('Error initializing flatpickr:', error)
    }
  }, [scriptsLoaded, dataLoaded])

  // ─── 7. Cleanup ──────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (editorWrapperRef.current) editorWrapperRef.current.innerHTML = ''
      quillRef.current = null
      quillInitRef.current = false
      if (datePickerRef.current) {
        try { datePickerRef.current.destroy() } catch { /* ignore */ }
        datePickerRef.current = null
      }
      document.querySelectorAll('.flatpickr-calendar').forEach((el) => {
        try { el.remove() } catch { /* ignore */ }
      })
    }
  }, [])

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quillRef.current) return

    const content = quillRef.current.root.innerHTML
    if (!content || content === '<p><br></p>') {
      alert('Добавьте содержание статьи')
      return
    }

    setSaveStatus('saving')
    setLoading(true)

    try {
      const method = formData.id ? 'PUT' : 'POST'
      const url = formData.id ? `/api/posts/${formData.id}` : '/api/posts'

      const cleanSlug = formData.slug
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/^-+|-+$/g, '')

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title.trim(),
          content,
          publish_date: formData.publishDate || new Date().toISOString(),
          category: formData.category,
          slug: cleanSlug,
          author: formData.author.trim() || 'Администратор',
          meta_description: formData.metaDesc.trim(),
          image_url: formData.imageUrl.trim() || null,
          status: formData.status,
        }),
      })

      if (!res.ok) throw new Error('Ошибка сохранения')
      const result = await res.json()
      setSaveStatus('saved')

      if (!formData.id && result.id) {
        router.push(`/admin/edit/${result.id}`)
      }
    } catch (error) {
      console.error(error)
      setSaveStatus('error')
      alert('Ошибка при сохранении. Попробуйте ещё раз.')
    } finally {
      setLoading(false)
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData((prev) => ({ ...prev, title }))
    if (!formData.id) {
      const autoSlug = title
        .toLowerCase()
        .replace(/[^\w\s-]+/g, '')
        .replace(/\s+/g, '-')
        .trim()
      setFormData((prev) => ({ ...prev, title, slug: autoSlug }))
    }
  }

  // ─── Shared input/label styles ────────────────────────────────────────────────
  const inputClass =
    'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white'
  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка admin страницы */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft size={16} />
            К списку
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-semibold text-gray-800">
            {isNewArticle ? 'Новая статья' : 'Редактирование статьи'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {formData.slug && !isNewArticle && (
            <Link
              href={`/blog/${formData.slug}`}
              target="_blank"
              className="flex items-center gap-1.5 text-sm text-green-700 hover:text-green-800 transition-colors"
            >
              <Eye size={15} />
              Просмотр
            </Link>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading || !dataLoaded || !quillReady}
            className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white text-sm font-semibold rounded-lg hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save size={15} />
            {saveStatus === 'saving'
              ? 'Сохранение...'
              : saveStatus === 'saved'
              ? '✓ Сохранено'
              : formData.id
              ? 'Обновить'
              : 'Опубликовать'}
          </button>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">

        {(!dataLoaded || !quillReady) && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
            Загрузка редактора...
          </div>
        )}

        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Заголовок */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <label className={labelClass}>Заголовок *</label>
            <input
              type="text"
              className={inputClass + ' text-base font-medium'}
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Введите заголовок статьи"
              required
            />
          </div>

          {/* Основные поля */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Дата публикации</label>
                <input
                  ref={dateInputRef}
                  type="text"
                  className={inputClass}
                  placeholder="Выберите дату"
                />
              </div>
              <div>
                <label className={labelClass}>Категория *</label>
                <select
                  className={inputClass}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>URL (slug) *</label>
                <input
                  type="text"
                  className={inputClass + ' font-mono text-xs'}
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="url-stati"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Статус</label>
                <select
                  className={inputClass}
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="published">Опубликовано</option>
                  <option value="draft">Черновик</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Автор</label>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Meta description</label>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.metaDesc}
                  onChange={(e) => setFormData({ ...formData, metaDesc: e.target.value })}
                  placeholder="Краткое описание для поисковиков"
                />
              </div>
            </div>
          </div>

          {/* URL изображения */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <label className={labelClass}>URL обложки статьи</label>
            <input
              type="url"
              className={inputClass}
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://aopf.ru/image.jpg"
            />
            {formData.imageUrl && (
              <div className="mt-3 relative h-40 rounded-lg overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formData.imageUrl}
                  alt="Превью"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              </div>
            )}
          </div>

          {/* Редактор */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <label className={labelClass}>Содержание статьи *</label>
            {/* Quill монтируется сюда императивно — React не трогает внутренний DOM */}
            <div ref={editorWrapperRef} className="rounded-lg overflow-hidden border border-gray-300" />
          </div>

          {/* Кнопка сохранения (дублирует верхнюю, удобно при длинных статьях) */}
          <div className="flex justify-end pb-6">
            <button
              type="submit"
              disabled={loading || !dataLoaded || !quillReady}
              className="flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Save size={16} />
              {formData.id ? 'Обновить статью' : 'Опубликовать статью'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
