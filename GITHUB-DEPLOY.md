# GitHub Deployment Guide

Этот проект настроен для автоматического развертывания через GitHub с Docker.

## 🚀 Пошаговый план развертывания:

### 1. Загрузка проекта на GitHub

```bash
# В папке проекта инициализируем Git
git init
git add .
git commit -m "Initial commit: BIM Element Library Management"

# Создайте репозиторий на GitHub, затем добавьте remote
git remote add origin https://github.com/YOUR_USERNAME/bim-element-library-management.git
git branch -M main
git push -u origin main
```

### 2. Автоматическая сборка

После push в GitHub:
- ✅ GitHub Actions автоматически соберет Docker образ  
- ✅ Образ будет опубликован в GitHub Container Registry
- ✅ Образ будет доступен по адресу: `ghcr.io/YOUR_USERNAME/bim-element-library-management:latest`

### 3. Развертывание на Ubuntu сервере

**Вариант A: Автоматический скрипт**
```bash
# Загрузите deploy.sh на сервер
wget https://raw.githubusercontent.com/YOUR_USERNAME/bim-element-library-management/main/deploy.sh
chmod +x deploy.sh

# Отредактируйте переменные в скрипте
nano deploy.sh  # замените YOUR_USERNAME на ваш GitHub username

# Запустите развертывание
./deploy.sh
```

**Вариант B: Ручная команда**
```bash
# Установите Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Запустите контейнер
docker run -d --name bim-library -p 80:80 --restart unless-stopped \
  ghcr.io/YOUR_USERNAME/bim-element-library-management:latest
```

### 4. Доступ к сайту

Ваш сайт будет доступен по адресу:
- **http://10.10.1.189** (ваш сервер IP)

## 🔄 Обновление

Для обновления просто:
1. Внесите изменения в код
2. Сделайте git push
3. GitHub Actions пересоберет образ
4. На сервере выполните: `./deploy.sh`

## 📋 Полезные команды

```bash
# Статус контейнера
docker ps

# Логи
docker logs bim-library

# Остановить
docker stop bim-library

# Перезапустить
docker restart bim-library

# Обновить до последней версии
docker pull ghcr.io/YOUR_USERNAME/bim-element-library-management:latest
docker stop bim-library && docker rm bim-library
docker run -d --name bim-library -p 80:80 --restart unless-stopped ghcr.io/YOUR_USERNAME/bim-element-library-management:latest
```

## 🎯 Что нужно изменить перед загрузкой:

1. **В README.md**: замените `YOUR_USERNAME` на ваш GitHub username
2. **В deploy.sh**: замените `YOUR_USERNAME` на ваш GitHub username  
3. **В .github/workflows/docker-build.yml**: проверьте настройки (должно работать автоматически)

## 🔒 Приватность

- Репозиторий может быть публичным или приватным
- Docker образы в GitHub Container Registry могут быть публичными или приватными
- Для приватных образов нужна аутентификация: `docker login ghcr.io`