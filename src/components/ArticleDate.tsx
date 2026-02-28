'use client';

interface ArticleDateProps {
  date: string; // ISO date string
  format?: 'full' | 'short' | 'long';
  className?: string;
}

export default function ArticleDate({ date, format = 'full', className = '' }: ArticleDateProps) {
  if (!date) return null;

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    
    // Проверка на валидность даты
    if (isNaN(d.getTime())) {
      console.error('Invalid date:', dateString);
      return 'Дата не указана';
    }

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    if (format === 'full') {
      options.hour = '2-digit';
      options.minute = '2-digit';
    } else if (format === 'short') {
      options.month = 'numeric';
    }

    return d.toLocaleDateString('ru-RU', options);
  };

  const formattedDate = formatDate(date);

  return (
    <time dateTime={date} className={`text-gray-500 ${className}`}>
      📅 {formattedDate}
    </time>
  );
}
