# Deploy via Docker - Ecko Landing Page

## Construir e executar com Docker

### 1. Usando Docker Compose (Recomendado)

```bash
# Build e executar
docker-compose up --build -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

### 2. Build Manual Docker

```bash
# Dockerfile seguro (recomendado) - preserva todas as dependências
docker build -f Dockerfile.safe -t ecko-landing \
  --build-arg VITE_api_form=https://470187c48f0a4640803d23a0491ae11b-a421d35e00a9431bb90c3d034.fly.dev/api/leads \
  .

# Fallback: Dockerfile minimal
docker build -f Dockerfile.minimal -t ecko-landing \
  --build-arg VITE_api_form=https://470187c48f0a4640803d23a0491ae11b-a421d35e00a9431bb90c3d034.fly.dev/api/leads \
  .

# Executar
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  ecko-landing
```

### 3. Debug e Teste

```bash
# Use o script de build e teste
bash docker-build.sh

# Para debug manual
docker logs -f <container_name>
docker exec -it <container_name> sh
```

## Deploy em produção

### Variáveis de ambiente necessárias:

- `VITE_api_form`: URL da API para envio dos formulários
- `NODE_ENV`: Define o ambiente (production/development)
- `PORT`: Porta do servidor (padrão: 3000)

### Build para diferentes ambientes:

#### Produção

```bash
docker build -t ecko-landing:production .
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e VITE_api_form=SUA_API_URL_AQUI \
  ecko-landing:production
```

#### Development (para testes)

```bash
docker build -t ecko-landing:dev --target builder .
docker run -p 8080:8080 \
  -e NODE_ENV=development \
  -v $(pwd):/app \
  -v /app/node_modules \
  ecko-landing:dev npm run dev
```

## Estrutura do Dockerfile

O Dockerfile usa multi-stage build para otimização:

1. **Build stage**: Instala dependências e constrói a aplicação
2. **Production stage**: Copia apenas os arquivos necessários para produção

## Healthcheck

O container inclui um healthcheck que verifica se a aplicação está respondendo na porta 3000.

## Otimizações incluídas

- Multi-stage build para reduzir tamanho da imagem final
- Node.js Alpine para imagem mais leve
- Usuário não-root para segurança
- Cache de dependências otimizado
- .dockerignore para excluir arquivos desnecessários

## Monitoramento

Para verificar se o container está funcionando:

```bash
# Status dos containers
docker-compose ps

# Logs em tempo real
docker-compose logs -f ecko-landing

# Executar comandos dentro do container
docker-compose exec ecko-landing sh
```

## Troubleshooting

### Container não inicia

1. Verificar logs: `docker-compose logs ecko-landing`
2. Verificar variáveis de ambiente
3. Verificar se a porta 3000 não está em uso

### Problemas de rede

1. Verificar se a API está acessível
2. Verificar configurações de firewall
3. Testar conectividade: `docker-compose exec ecko-landing wget -O- http://localhost:3000`
