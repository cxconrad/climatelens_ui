FROM node:20 as build

# Package-Files kopieren
COPY package.json package-lock.json ./

# Dependencies installieren
RUN npm ci

# Projektdateien kopieren
COPY . .

# Build-Prozess ausführen
RUN npm run build

# Port für Vite exponieren
EXPOSE 3000

# Entwicklungsserver starten
CMD ["npm", "run", "dev"]