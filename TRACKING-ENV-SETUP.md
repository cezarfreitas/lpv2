# Configuração de Variáveis de Ambiente - Tracking

## 🚀 **Setup via DevServerControl (Recomendado)**

Para configurar as variáveis de ambiente usando o DevServerControl:

### **1. Google Analytics 4**

```bash
# No terminal ou via DevServerControl
set_env_variable VITE_GA4_MEASUREMENT_ID G-XXXXXXXXXX
```

### **2. Facebook/Meta Pixel**

```bash
set_env_variable VITE_META_PIXEL_ID 123456789012345
set_env_variable VITE_META_CONVERSION_NAME LeadLojista
```

### **3. Meta API de Conversão (Sensível)**

```bash
# TOKEN SENSÍVEL - usar DevServerControl para não commitar
set_env_variable VITE_META_ACCESS_TOKEN your_long_access_token_here
set_env_variable VITE_META_API_VERSION v18.0
```

### **4. Google Ads (Opcional)**

```bash
set_env_variable VITE_GOOGLE_ADS_CONVERSION_ID AW-123456789
set_env_variable VITE_GOOGLE_ADS_CONVERSION_LABEL AbCdEfGhIj_example
```

## 📋 **Exemplo de Arquivo .env**

```env
# API Principal
VITE_api_form=https://470187c48f0a4640803d23a0491ae11b-a421d35e00a9431bb90c3d034.fly.dev/api/leads

# Google Analytics 4
VITE_GA4_MEASUREMENT_ID=G-ABC123DEF456

# Facebook/Meta Pixel
VITE_META_PIXEL_ID=123456789012345
VITE_META_CONVERSION_NAME=LeadLojista
VITE_META_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_META_API_VERSION=v18.0

# Google Ads
VITE_GOOGLE_ADS_CONVERSION_ID=AW-987654321
VITE_GOOGLE_ADS_CONVERSION_LABEL=aBcDeFgHiJ_conversion

# Server
NODE_ENV=production
PORT=80
```

## ✅ **Como Obter Cada ID**

### **Google Analytics 4**

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Admin → Propriedade → Fluxos de dados
3. Clique no seu site
4. Copie o "ID de medição" (formato: G-XXXXXXXXXX)

### **Facebook Pixel ID**

1. Acesse [Meta Business](https://business.facebook.com/)
2. Gerenciador de eventos → Fontes de dados
3. Clique no seu Pixel
4. Copie o "ID do pixel" (15 dígitos)

### **Meta Access Token**

1. Acesse [Meta for Developers](https://developers.facebook.com/)
2. Minhas apps → Sua app → Ferramentas → Explorador da API do Graph
3. Gere um token de acesso de longa duração
4. Permissões necessárias: `ads_management`, `business_management`

### **Google Ads Conversion**

1. Acesse [Google Ads](https://ads.google.com/)
2. Ferramentas → Medição → Conversões
3. Clique em "+ Nova conversão"
4. Configure conversão de site
5. Copie o ID (AW-XXXXXXXXX) e Label do código de tracking

## 🎯 **Nomes de Conversão Personalizados**

### **Meta Conversion Name**

Personalize o nome do evento para suas campanhas:

```env
# Exemplos de nomes personalizados
VITE_META_CONVERSION_NAME=LeadLojista        # Lead de lojista
VITE_META_CONVERSION_NAME=CadastroEcko       # Cadastro Ecko
VITE_META_CONVERSION_NAME=ParceiroOficial    # Parceiro oficial
VITE_META_CONVERSION_NAME=SolicitacaoComercial  # Solicitação comercial
```

**Benefícios do nome personalizado:**

- ✅ Facilita identificação nas campanhas
- ✅ Permite múltiplas landing pages
- ✅ Otimização específica por tipo de lead

## 🔐 **Segurança**

### **Variáveis Públicas (VITE\_)**

- `GA4_MEASUREMENT_ID` ✅ Seguro expor
- `META_PIXEL_ID` ✅ Seguro expor
- `GOOGLE_ADS_CONVERSION_ID` ✅ Seguro expor

### **Variáveis Sensíveis**

- `META_ACCESS_TOKEN` ⚠️ **NUNCA** commitar no git
- Use DevServerControl para definir em produção
- Regenere tokens regularmente

## 🧪 **Modo Debug**

### **Verificar Configuração**

Adicione no console do navegador:

```javascript
// Verificar se variáveis estão carregadas
console.log("GA4:", window.gtag ? "Loaded" : "Not loaded");
console.log("Meta Pixel:", window.fbq ? "Loaded" : "Not loaded");

// Ver eventos sendo enviados
window.dataLayer; // GA4 events
window.fbq.queue; // Meta events (se houver)
```

### **Ferramentas de Debug**

- **GA4**: [Google Tag Assistant](https://tagassistant.google.com/)
- **Meta**: [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper)
- **Google Ads**: Ativar modo debug no painel

## 🚀 **Deploy em Produção**

### **1. Via DevServerControl (Recomendado)**

```bash
# Configurar todas as variáveis via interface
DevServerControl → set_env_variable → [NOME] → [VALOR]
```

### **2. Via Dockerfile**

```dockerfile
# No Dockerfile
ENV VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
ENV VITE_META_PIXEL_ID=123456789012345
# NÃO colocar tokens sensíveis no Dockerfile
```

### **3. Via Plataforma de Deploy**

- **Vercel**: Settings → Environment Variables
- **Netlify**: Site settings → Environment variables
- **Heroku**: Settings → Config Vars

## ✅ **Checklist Pré-Deploy**

- [ ] `VITE_GA4_MEASUREMENT_ID` configurado
- [ ] `VITE_META_PIXEL_ID` configurado
- [ ] `VITE_META_CONVERSION_NAME` personalizado
- [ ] `VITE_META_ACCESS_TOKEN` configurado (via DevServerControl)
- [ ] Google Ads IDs configurados (se usar paid ads)
- [ ] Testar eventos no modo debug
- [ ] Verificar que tokens não estão no git

**Configuração completa = tracking perfeito! 📊🚀**
