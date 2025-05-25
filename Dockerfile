# Stage 1: Build da aplicação com Node
FROM node:18-alpine AS build-stage

WORKDIR /app

# Copia package.json e package-lock.json (se houver) para instalar dependências
COPY package*.json ./

RUN npm install

# Copia o código-fonte da aplicação
COPY . .

# Build da aplicação para produção
RUN npm run build

# Stage 2: Servir os arquivos com Nginx
FROM nginx:stable-alpine AS production-stage

# Remove o conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o build da aplicação para o diretório padrão do Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copia um arquivo de configuração customizado do Nginx (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expõe a porta 80
EXPOSE 80

# Comando padrão para rodar o Nginx no foreground
CMD ["nginx", "-g", "daemon off;"]
