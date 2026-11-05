# NetProfit

Адаптивный сайт студии управления репутацией. React, TypeScript, Vite.

## Локальный запуск

    npm install
    npm run dev

Открыть http://127.0.0.1:4174/.

## Сборка

    npm run build

Готовый сайт создаётся в dist/. С pnpm: pnpm install, pnpm run build.

## Публикация через Cloudflare Pages

Подключить этот репозиторий, выбрать ветку main.

- Build command: npm run build
- Build output directory: dist
- Root directory: корень репозитория
- Node.js: 22 или новее

GitHub хранит исходники; публичный сайт собирается и размещается в Cloudflare.

## Telegram

Кнопки Telegram ведут на https://t.me/svetaserm.
Форма отправляет JSON {phone,name,task} в отдельный Cloudflare Worker:
https://weathered-cell-98d7.moiseevasveta990.workers.dev/

Этот адрес уже задан в исходниках. Необязательная переменная VITE_LEAD_ENDPOINT позволяет изменить обработчик при сборке.

Токен бота и chat_id хранятся только в настройках Worker. Не добавлять их в репозиторий и переменные VITE_*.

После публикации изменить ALLOWED_ORIGIN в Worker на точный адрес сайта с протоколом, без пути и завершающего слеша. Иначе отправка формы с публичного сайта будет заблокирована. Например: https://netprofit-studio.pages.dev (использовать фактически выданный адрес).

Успех формы показывается только при успешном HTTP-ответе с {ok:true}. Сквозную доставку заявки проверить после публикации.

## Файлы

src/ — компоненты и стили. public/ — используемые изображения и дым. Исходные графические черновики, зависимости, локальные логи и секреты в репозиторий не включены.

Проверки: TypeScript и production-сборка проходят. Полная визуальная проверка в браузере была пропущена по просьбе заказчика.

## Публикация в существующий Cloudflare Workers

Для проекта Worker netprofit-studio добавлен wrangler.jsonc: публикуется папка dist как Static Assets. Отдельный обработчик заявок weathered-cell-98d7 не меняется.

Источник: moiseevasveta99-cmd/netprofit-studio, ветка main, корень репозитория.
Build command: npm run build
Deploy command: npx wrangler deploy
Root directory: корень репозитория (/).

Если Cloudflare сообщает ENOENT package.json, проверьте, что выбран именно этот репозиторий и актуальный коммит main. В корне main должны находиться package.json, src, public и wrangler.jsonc.

## GitHub Pages

Публикация настроена в .github/workflows/pages.yml. В GitHub: Settings → Pages → Build and deployment → Source: GitHub Actions. После этого запустить Publish website to GitHub Pages во вкладке Actions через Run workflow, ветка main.

До подключения собственного домена адрес сайта: https://moiseevasveta99-cmd.github.io/netprofit-studio/ . Для этого Custom domain в настройках Pages должен быть пустым. Когда домен будет подключён, workflow получает новый base_path из настроек Pages автоматически; после смены домена следует повторно запустить workflow.

Токены бота остаются в отдельном Cloudflare Worker. Адрес ALLOWED_ORIGIN для формы будет настроен отдельным шагом.

## Обновление контактов и заказов

Общие контакты заданы в src/contactChannels.ts: Telegram, MAX, Авито, WhatsApp и почта. Контакты отображаются в закреплённой шапке, отдельном блоке перед формой и в подвале; на мобильном шапка содержит логотип и меню, подвал организован в две колонки. Иконки — векторные, без фоновых плашек.

Кнопка калькулятора «Сделать заказ» переносит расчёт в форму и прокручивает к контактам. Заголовок формы — «Оставить заявку».

ПроДокторов: 400 ₽ за отзыв. Яндекс Браузер (сайт): 350 ₽ за отзыв. В блоке гарантий указана замена за наш счёт при удалении в гарантийный срок: 1 месяц для Яндекс Карт и Google Maps, для остальных площадок срок согласуется заранее.

Для отправки заявок с опубликованного сайта в Cloudflare Worker необходимо ALLOWED_ORIGIN=https://netprofit-studio.ru (без завершающего слеша). Значение для локального предпросмотра не разрешает запросы с публичного домена.
