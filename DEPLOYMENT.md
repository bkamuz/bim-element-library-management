# BIM Element Library - Docker Deployment Guide

## Структура проекта

Убедитесь, что у вас есть следующие файлы для Docker развертывания:

```
├── Dockerfile              # Многоступенчатая сборка React + nginx
├── docker-compose.yml      # Конфигурация для запуска
├── nginx.conf              # Настройки nginx для SPA
├── .dockerignore           # Исключения для Docker контекста
├── package.json            # Зависимости и скрипты
└── src/                    # Исходный код приложения
```

## Развертывание на Ubuntu сервере

### 1. Подготовка сервера

```bash
# Обновляем систему
sudo apt update && sudo apt upgrade -y

# Устанавливаем Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Добавляем пользователя в группу docker
sudo usermod -aG docker $USER

# Устанавливаем Docker Compose
sudo apt install docker-compose-plugin -y

# Перезагружаемся для применения изменений группы
sudo reboot
```

### 2. Загрузка файлов на сервер

Есть несколько способов загрузить файлы:

**Вариант A: SCP (с Windows)**
```powershell
# Создаем архив проекта
Compress-Archive -Path "C:\Users\awada\Desktop\BIM Element Library Management\*" -DestinationPath "bim-library.zip"

# Копируем на сервер (замените username и server_ip)
scp bim-library.zip username@10.10.1.189:~/
```

**Вариант B: Git (рекомендуется)**
```bash
# На сервере клонируем репозиторий
git clone <your-repo-url>
cd bim-element-library-management
```

**Вариант C: Прямая загрузка файлов**
```bash
# На сервере создаем директорию
mkdir -p ~/bim-library
cd ~/bim-library

# Копируем файлы через scp или sftp
```

### 3. Сборка и запуск

```bash
# Переходим в директорию проекта
cd ~/bim-library

# Собираем Docker образ
docker build -t bim-library .

# Запускаем через docker-compose
docker compose up -d

# Или запускаем напрямую
docker run -d --name bim-library -p 80:80 --restart unless-stopped bim-library
```

### 4. Проверка работы

```bash
# Проверяем статус контейнера
docker ps

# Смотрим логи
docker logs bim-library

# Тестируем доступность
curl http://localhost/health
curl http://localhost/
```

### 5. Доступ из интернета

Ваш сайт будет доступен по адресу: **http://10.10.1.189**

Если нужен доменное имя:
1. Купите домен
2. Настройте A-запись на IP 10.10.1.189
3. Установите SSL сертификат

### 6. SSL сертификат (опционально)

```bash
# Устанавливаем Certbot
sudo apt install certbot python3-certbot-nginx -y

# Получаем сертификат (замените your-domain.com)
sudo certbot --nginx -d your-domain.com

# Автоматическое обновление
sudo crontab -e
# Добавьте строку:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## Обновление приложения

```bash
# Останавливаем контейнер
docker stop bim-library

# Удаляем старый контейнер
docker rm bim-library

# Пересобираем образ
docker build -t bim-library .

# Запускаем новый контейнер
docker run -d --name bim-library -p 80:80 --restart unless-stopped bim-library
```

## Мониторинг

```bash
# Статистика использования ресурсов
docker stats bim-library

# Логи в реальном времени
docker logs -f bim-library

# Информация о контейнере
docker inspect bim-library
```

## Резервное копирование

```bash
# Сохраняем образ
docker save bim-library > bim-library-backup.tar

# Восстанавливаем образ
docker load < bim-library-backup.tar
```

---

**Контакты для поддержки:**
- IP сервера: 10.10.1.189
- Порт: 80 (HTTP)
- Health check: http://10.10.1.189/health