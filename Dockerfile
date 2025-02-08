FROM node:20 as build
# Package-Files kopieren
COPY package.json package-lock.json ./

# Dependencies installieren
RUN npm ci

# Projektdateien kopieren
COPY . .

# Port für Vite exponieren
EXPOSE 5173

# Entwicklungsserver starten
CMD ["npm", "run", "dev"]