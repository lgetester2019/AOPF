'use client';

import { useState, useEffect, useRef } from 'react';

interface YandexMapLazyProps {
  src: string;
  title?: string;
  className?: string;
  width?: string;
  height?: string;
}

export default function YandexMapLazy({
  src,
  title = 'Яндекс Карта',
  className = '',
  width = '100%',
  height = '400px',
}: YandexMapLazyProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded]   = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Следим за появлением блока в зоне видимости
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height, position: 'relative', overflow: 'hidden' }}
    >
      {/* Заглушка до тех пор, пока блок не появился в зоне видимости */}
      {!isVisible && (
        <div style={styles.placeholder}>
          <span style={styles.placeholderText}>Карта загружается...</span>
        </div>
      )}

      {isVisible && (
        <>
          {/* iframe всегда видим — НЕ используем display:none,
              иначе onLoad не срабатывает в некоторых браузерах.
              Пока карта грузится, поверх лежит оверлей-заглушка. */}
          <iframe
            src={src}
            title={title}
            width="100%"
            height="100%"
            style={{
              border: 'none',
              display: 'block',
              // Карта уже рендерится, но пользователь видит её
              // только после того, как onLoad снимет оверлей
            }}
            loading="lazy"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          />

          {/* Оверлей поверх iframe — исчезает после загрузки карты */}
          {!isLoaded && (
            <div style={styles.overlay}>
              <div style={styles.spinner} />
              <span style={styles.overlayText}>Загружаем карту...</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Стили ────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  placeholder: {
    width: '100%',
    height: '100%',
    background: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#9ca3af',
    fontSize: '14px',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: '#f3f4f6',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    // Поверх iframe
    zIndex: 10,
  },
  overlayText: {
    color: '#6b7280',
    fontSize: '14px',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #d1d5db',
    borderTopColor: '#16a34a',   // зелёный — под цвет сайта
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};
