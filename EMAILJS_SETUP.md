# Настройка отправки формы через EmailJS

## Шаг 1: Регистрация на EmailJS

1. Перейдите на сайт [https://www.emailjs.com/](https://www.emailjs.com/)
2. Зарегистрируйтесь (бесплатный план позволяет отправлять до 200 писем в месяц)
3. Войдите в свой аккаунт

## Шаг 2: Создание Email Service

1. В панели управления перейдите в раздел **Email Services**
2. Нажмите **Add New Service**
3. Выберите ваш почтовый провайдер (Gmail, Outlook и т.д.)
4. Следуйте инструкциям для подключения вашего email аккаунта
5. После подключения вы получите **Service ID** (например: `service_xxxxxxx`)

## Шаг 3: Создание Email Template

1. Перейдите в раздел **Email Templates**
2. Нажмите **Create New Template**
3. Используйте следующий шаблон:

**Subject:**
```
Новая заявка с сайта от {{from_name}}
```

**Content:**
```
Имя: {{from_name}}
Email: {{from_email}}
Телефон: {{phone}}

Сообщение:
{{message}}

---
Это сообщение отправлено с сайта a1-telecom.ru
```

4. Сохраните шаблон и скопируйте **Template ID** (например: `template_xxxxxxx`)

## Шаг 4: Получение Public Key

1. Перейдите в раздел **Account** → **General**
2. Найдите **Public Key** и скопируйте его (например: `xxxxxxxxxxxxxxx`)

## Шаг 5: Настройка в коде

Откройте файл `src/Telecom/TelecomContacts/TelecomContacts.tsx` и замените следующие значения:

1. `YOUR_SERVICE_ID` - замените на ваш Service ID
2. `YOUR_TEMPLATE_ID` - замените на ваш Template ID  
3. `YOUR_PUBLIC_KEY` - замените на ваш Public Key (в двух местах)

Пример:
```typescript
const result = await emailjs.send(
  'service_abc123', // Ваш Service ID
  'template_xyz789', // Ваш Template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    message: formData.message,
    to_email: 'info@a1-telecom.ru'
  },
  'public_key_12345' // Ваш Public Key
);
```

## Альтернативный вариант: Использование переменных окружения

Для большей безопасности можно использовать переменные окружения:

1. Создайте файл `.env` в корне проекта:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

2. Обновите код в `TelecomContacts.tsx`:
```typescript
const result = await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    message: formData.message,
    to_email: 'info@a1-telecom.ru'
  },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);
```

## Проверка работы

После настройки:
1. Заполните форму на сайте
2. Нажмите "Отправить заявку"
3. Проверьте почту info@a1-telecom.ru - должно прийти письмо с данными формы

## Важно

- Не публикуйте ваш Public Key в публичных репозиториях
- Используйте переменные окружения для production
- Бесплатный план EmailJS ограничен 200 письмами в месяц
