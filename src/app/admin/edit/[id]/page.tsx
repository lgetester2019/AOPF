'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import NextLink from 'next/link'

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
    status: 'published'
  })

  // ═══════════════════════════════════════════════════════
  // 1. CSS: добавляем в <head> при mount, убираем при unmount
  //    ЭТО ГЛАВНОЕ ИСПРАВЛЕНИЕ — раньше <link> и <style>
  //    оставались после навигации и ломали другие страницы
  // ═══════════════════════════════════════════════════════
  useEffect(() => {
    const addedElements: HTMLElement[] = []

    // Внешние стили — добавляем программно, чтобы убрать при уходе
    const cssUrls = [
      'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
      'https://cdn.quilljs.com/1.3.6/quill.snow.css',
      'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css'
    ]

    cssUrls.forEach(url => {
      if (!document.querySelector(`link[href="${url}"]`)) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = url
        link.setAttribute('data-admin-edit', 'true')
        document.head.appendChild(link)
        addedElements.push(link)
      }
    })

    // Стили страницы (scoped через .admin-edit-page)
    const style = document.createElement('style')
    style.setAttribute('data-admin-edit', 'true')
    style.textContent = `
      @keyframes admin-spin { to { transform: rotate(360deg) } }

      .admin-edit-page .edit-container { max-width: 1000px; margin: 0 auto; }

      .admin-edit-page .back-link a {
        color: white; background: rgba(255,255,255,0.2);
        padding: 8px 16px; border-radius: 20px;
        text-decoration: none; display: inline-block;
        transition: background 0.2s;
      }
      .admin-edit-page .back-link a:hover { background: rgba(255,255,255,0.3); }

      .admin-edit-page .edit-card {
        background: white; border-radius: 20px;
        overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      }
      .admin-edit-page .edit-card-header {
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white; padding: 20px 30px;
      }
      .admin-edit-page .edit-card-header h2 { margin: 0; }

      .admin-edit-page .ql-container { min-height: 300px; font-size: 16px; }

      .admin-edit-page .btn-save {
        background: linear-gradient(45deg, #667eea, #764ba2);
        border: none; color: white; padding: 12px 40px;
        border-radius: 10px; cursor: pointer; font-size: 16px;
      }
      .admin-edit-page .btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
      .admin-edit-page .btn-save:hover:not(:disabled) { opacity: 0.9; }

      .admin-edit-page .loading-spinner {
        width: 3rem; height: 3rem;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #667eea;
        border-radius: 50%;
        animation: admin-spin 1s linear infinite;
      }
    `
    document.head.appendChild(style)
    addedElements.push(style)

    // Body — сохраняем оригинальные стили, ставим свои
    const origBg = document.body.style.background
    const origPadding = document.body.style.padding
    const origMinHeight = document.body.style.minHeight
    document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    document.body.style.padding = '20px'
    document.body.style.minHeight = '100vh'

    return () => {
      // Убираем все добавленные элементы
      addedElements.forEach(el => {
        try { el.remove() } catch (e) { /* ignore */ }
      })
      // Страховка — убираем по data-атрибуту
      document.querySelectorAll('[data-admin-edit]').forEach(el => {
        try { el.remove() } catch (e) { /* ignore */ }
      })
      // Восстанавливаем body
      document.body.style.background = origBg
      document.body.style.padding = origPadding
      document.body.style.minHeight = origMinHeight
    }
  }, [])

  // ═══════════════════════════════════════════════════════
  // 2. Скрипты: загружаем вручную (не через next/script,
  //    т.к. onLoad не всегда срабатывает при повторной навигации)
  // ═══════════════════════════════════════════════════════
  useEffect(() => {
    let cancelled = false

    // Если скрипты уже загружены (повторная навигация)
    if (window.Quill && window.flatpickr) {
      setScriptsLoaded(true)
      return
    }

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          // Тег уже есть — ждём появления глобальной переменной
          const check = setInterval(() => {
            if ((src.includes('quill') && window.Quill) ||
                (src.includes('flatpickr') && window.flatpickr)) {
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
    }

    Promise.all([
      loadScript('https://cdn.quilljs.com/1.3.6/quill.js'),
      loadScript('https://cdn.jsdelivr.net/npm/flatpickr')
    ]).then(() => {
      if (!cancelled) setScriptsLoaded(true)
    }).catch(console.error)

    return () => { cancelled = true }
  }, [])

  // ═══════════════════════════════════════════════════════
  // 3. Категории
  // ═══════════════════════════════════════════════════════
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then((data: Category[]) => setCategories(data))
      .catch(console.error)
  }, [])

  // ═══════════════════════════════════════════════════════
  // 4. Загрузка статьи
  // ═══════════════════════════════════════════════════════
  useEffect(() => {
    if (isNewArticle) {
      if (categories.length > 0) {
        setFormData(prev => ({
          ...prev,
          category: categories[0].slug,
          publishDate: new Date().toISOString()
        }))
        setDataLoaded(true)
      }
      return
    }

    if (!articleId) return

    setLoading(true)
    fetch(`/api/posts/${articleId}`)
      .then(res => res.json())
      .then((article: any) => {
        const categorySlug = article.categories?.slug ||
          categories.find((c: Category) => c.id === article.category_id)?.slug || ''

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
          status: article.status || 'published'
        })
        setDataLoaded(true)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [articleId, categories])

  // ═══════════════════════════════════════════════════════
  // 5. Quill — создаём editor-div ИМПЕРАТИВНО (вне React DOM).
  //    React не знает об этом div → не пытается его удалять →
  //    нет ошибки "removeChild"
  // ═══════════════════════════════════════════════════════
  useEffect(() => {
    if (!scriptsLoaded || !dataLoaded || !editorWrapperRef.current) return
    if (quillInitRef.current) return
    if (!window.Quill) return

    // Создаём div вне React
    const editorDiv = document.createElement('div')
    editorDiv.style.height = '400px'
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
            ['clean']
          ]
        },
        placeholder: 'Содержание статьи...'
      })

      if (formData.content) {
        quill.root.innerHTML = formData.content
      }

      quill.on('text-change', () => {
        setFormData(prev => ({ ...prev, content: quill.root.innerHTML }))
      })

      quillRef.current = quill
      quillInitRef.current = true
      setQuillReady(true)
    } catch (error) {
      console.error('Error initializing Quill:', error)
    }
  }, [scriptsLoaded, dataLoaded])

  // ═══════════════════════════════════════════════════════
  // 6. Flatpickr — используем ref вместо id-селектора
  // ═══════════════════════════════════════════════════════
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
            setFormData(prev => ({ ...prev, publishDate: dates[0].toISOString() }))
          }
        }
      })
      datePickerRef.current = fp
      if (formData.publishDate) {
        fp.setDate(formData.publishDate)
      }
    } catch (error) {
      console.error('Error initializing flatpickr:', error)
    }
  }, [scriptsLoaded, dataLoaded])

  // ═══════════════════════════════════════════════════════
  // 7. Cleanup при unmount — уничтожаем Quill и Flatpickr
  //    Отдельный эффект с [] — запускается ТОЛЬКО при unmount
  // ═══════════════════════════════════════════════════════
  useEffect(() => {
    return () => {
      // Quill: очищаем wrapper (удаляет toolbar + editor)
      if (editorWrapperRef.current) {
        editorWrapperRef.current.innerHTML = ''
      }
      quillRef.current = null
      quillInitRef.current = false

      // Flatpickr: .destroy() корректно удаляет календарь из body
      if (datePickerRef.current) {
        try { datePickerRef.current.destroy() } catch (e) { /* ignore */ }
        datePickerRef.current = null
      }

      // Страховка: убираем оставшиеся календари
      document.querySelectorAll('.flatpickr-calendar').forEach(el => {
        try { el.remove() } catch (e) { /* ignore */ }
      })
    }
  }, [])

  // ═══════════════════════════════════════════════════════
  // Handlers
  // ═══════════════════════════════════════════════════════
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quillRef.current) {
      alert('Редактор еще не готов')
      return
    }

    const content = quillRef.current.root.innerHTML
    if (!content || content === '<p><br></p>') {
      alert('Добавьте содержание статьи')
      return
    }

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
          status: formData.status
        })
      })

      if (!res.ok) throw new Error('Ошибка сохранения')
      const result = await res.json()

      if (!formData.id && result.id) {
        router.push(`/admin/edit/${result.id}`)
      }
    } catch (error) {
      console.error(error)
      alert('Ошибка при сохранении')
    } finally {
      setLoading(false)
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData(prev => ({ ...prev, title }))
    if (!formData.id) {
      setFormData(prev => ({
        ...prev,
        slug: title
          .toLowerCase()
          .replace(/[^\w\s-]+/g, '')
          .replace(/\s+/g, '-')
          .trim()
      }))
    }
  }

  // ═══════════════════════════════════════════════════════
  // Render — никаких <link>, <style>, <Script> в JSX!
  // ═══════════════════════════════════════════════════════
  return (
    <div className="admin-edit-page">
      {loading && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(255,255,255,0.9)',
          zIndex: 9999,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div className="loading-spinner" />
        </div>
      )}

      <div className="edit-container py-4">
        <div className="back-link mb-3">
          <NextLink href="/admin">← Назад к списку</NextLink>
        </div>

        <div className="edit-card">
          <div className="edit-card-header">
            <h2>{isNewArticle ? '📝 Новая статья' : '📝 Редактирование'}</h2>
          </div>

          <div className="card-body p-4">
            {(!dataLoaded || !quillReady) && (
              <div className="alert alert-info mb-3">
                ⏳ Загрузка редактора... Пожалуйста, подождите.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Заголовок *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={handleTitleChange}
                  required
                />
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Дата публикации</label>
                  <input
                    ref={dateInputRef}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Категория</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="">Выберите категорию</option>
                    {categories.map((c: Category) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-8">
                  <label className="form-label fw-bold">URL (slug) *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold">Статус</label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="published">Опубликовано</option>
                    <option value="draft">Черновик</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Автор</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Meta description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.metaDesc}
                    onChange={e => setFormData({ ...formData, metaDesc: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Содержание *</label>
                {/* Пустой div-обёртка — Quill создаёт DOM внутри императивно,
                    React не трогает содержимое → нет "removeChild" ошибок */}
                <div ref={editorWrapperRef} />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">URL изображения</label>
                <input
                  type="url"
                  className="form-control"
                  value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <button
                type="submit"
                className="btn-save"
                disabled={loading || !dataLoaded || !quillReady}
              >
                {formData.id ? '✏️ Обновить статью' : '💾 Опубликовать статью'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
