FROM node:20-alpine AS builder

# Package-Files kopieren
COPY package.json package-lock.json ./

# Dependencies installieren
RUN npm ci

# Projektdateien kopieren
COPY . .

# Build-Prozess ausführen
RUN npm run build

# Port für Vite exponieren
EXPOSE 5173

# Entwicklungsserver starten
CMD ["npm", "run", "dev"]