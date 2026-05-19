// Админ-панель работает без хедера/футера сайта.
// AdminAuth уже предоставляет кнопку выхода.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
