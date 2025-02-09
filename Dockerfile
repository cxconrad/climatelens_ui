# 1️⃣ Build-Image mit Node.js
FROM node:22-alpine AS build_image

# Arbeitsverzeichnis setzen
WORKDIR /app

# Package-Files kopieren
COPY package.json package-lock.json ./

# Dependencies installieren
RUN npm ci

# Projektdateien kopieren
COPY . .

# Build-Prozess ausführen (Vite erzeugt /dist)
RUN npm run build

# 2️⃣ Produktions-Image mit Node.js + Serve
FROM node:22-alpine AS production_image

# Arbeitsverzeichnis setzen
WORKDIR /app

# Build-Output kopieren
COPY --from=build_image /app/dist ./dist

# Serve installieren, um die App bereitzustellen
RUN npm install -g serve

# Port für die App freigeben
EXPOSE 4173

# Statische Dateien aus "dist" mit serve bereitstellen
CMD ["serve", "-s", "dist", "-l", "4173"]
