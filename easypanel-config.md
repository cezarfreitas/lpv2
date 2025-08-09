# Configuração para Easypanel

## ⚙️ Configuração do Projeto

### Dockerfile

Use: `Dockerfile.easyfile`

### Porta

- **Container Port:** 80
- **Public Port:** 80 (automático)

### Variáveis de Ambiente

```env
NODE_ENV=production
PORT=80
VITE_api_form=https://470187c48f0a4640803d23a0491ae11b-a421d35e00a9431bb90c3d034.fly.dev/api/leads
```

## 🚀 Passos para Deploy

1. **Conectar Repositório**

   - Conecte seu repositório Git no Easypanel

2. **Configurar Build**

   - Source: `/`
   - Dockerfile: `Dockerfile.easyfile`

3. **Configurar Porta**

   - Port: `80`
   - Protocol: `HTTP`

4. **Configurar Variáveis**

   - Adicione as variáveis de ambiente listadas acima

5. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build e deploy automático

## ✅ Verificação

Após o deploy:

- A aplicação estará disponível na URL fornecida pelo Easypanel
- Health check automático na porta 80
- Logs disponíveis no painel do Easypanel

## 🔧 Solução de Problemas

### Build Failure

- Verifique se o Dockerfile.easyfile existe
- Verifique se as dependências estão corretas no package.json

### Runtime Error

- Verifique os logs no Easypanel
- Confirme se a porta 80 está configurada
- Verifique se as variáveis de ambiente estão definidas

### Health Check Failed

- O container pode demorar até 60s para inicializar
- Verifique se a aplicação está respondendo na porta 80
