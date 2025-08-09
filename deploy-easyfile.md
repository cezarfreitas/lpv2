# Guia de Deploy para EasyFile

## Configuração Recomendada

### 1. Dockerfile

Use o arquivo `Dockerfile.easyfile` para o deploy:

```bash
# Na EasyFile, especifique:
Dockerfile: Dockerfile.easyfile
```

### 2. Variáveis de Ambiente

Configure essas variáveis no Easypanel:

```env
NODE_ENV=production
PORT=80
VITE_api_form=https://470187c48f0a4640803d23a0491ae11b-a421d35e00a9431bb90c3d034.fly.dev/api/leads
```

### 3. Porta de Exposição

- **Porta interna do container:** 80 (padrão Easypanel)
- **Porta externa:** 80 (configuração automática do Easypanel)

### 4. Health Check

O container inclui health check automático:

- Verifica se a aplicação responde na porta 80
- Intervalo: 30 segundos
- Timeout: 10 segundos
- Período inicial: 60 segundos
- Tentativas: 5

### 5. Problemas Comuns e Soluções

#### Erro de Build

Se o build falhar:

1. Verifique se a EasyFile tem memória suficiente (recomendado: min 1GB)
2. Use `Dockerfile.safe` se houver problemas com dependências

#### Erro de Runtime

Se o container não iniciar:

1. Verifique as variáveis de ambiente
2. Certifique-se de que a porta 80 está sendo exposta
3. Verifique os logs do container no Easypanel

#### Alternativas de Dockerfile

Se `Dockerfile.easyfile` não funcionar, tente na ordem:

1. `Dockerfile.safe` (mais conservador)
2. `Dockerfile.simple` (mais básico)
3. `Dockerfile` (padrão)

### 6. Comandos de Teste Local (se disponível)

```bash
# Build local
docker build -f Dockerfile.easyfile -t ecko-landing:easyfile .

# Test local
docker run -p 80:80 -e NODE_ENV=production ecko-landing:easyfile

# Verificar se está funcionando
curl http://localhost:80
```

### 7. Arquivos Importantes

- `dist/server/node-build.mjs`: Servidor principal
- `dist/spa/`: Arquivos estáticos do frontend
- `package.json`: Dependências e scripts

### 8. Logs para Debug

Se houver problemas, verifique:

- Logs de build na EasyFile
- Logs de runtime do container
- Health check status
