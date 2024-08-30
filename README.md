# Link Saver Bot


[Ссылка на рабочую версию](https://t.me/marketlab_linksaver_bot)

Для запуска `docker compose -f docker-compose.dev.yml up`. Пример env файла лежит в .env.example. После первого запуска нужно запустить миграцию `docker exec -it link-saver-bot npm run prisma:migrate`