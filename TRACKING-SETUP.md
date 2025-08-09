# Configuração de Tracking - GA4, Meta Pixel e API de Conversão

## 🎯 **Variáveis de Ambiente Necessárias**

### **1. Google Analytics 4**

```env
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

- **Como obter**: Google Analytics > Admin > Propriedade > Fluxos de dados > Stream da Web
- **Formato**: Sempre começa com "G-"

### **2. Google Ads (Opcional)**

```env
VITE_GOOGLE_ADS_CONVERSION_ID=AW-123456789
VITE_GOOGLE_ADS_CONVERSION_LABEL=AbCdEfGhIj_example
```

- **Como obter**: Google Ads > Ferramentas > Conversões > Nova conversão
- **Uso**: Tracking de conversões paid

### **3. Facebook/Meta Pixel**

```env
VITE_META_PIXEL_ID=123456789012345
VITE_META_CONVERSION_NAME=Lead
```

- **Como obter**: Meta Business > Gerenciador de eventos > Pixels
- **PIXEL_ID**: Número de 15 dígitos
- **CONVERSION_NAME**: Nome personalizado do evento (ex: "LeadLojista", "CadastroEcko")

### **4. Meta API de Conversão (Recomendado)**

```env
VITE_META_ACCESS_TOKEN=your_access_token_here
VITE_META_API_VERSION=v18.0
```

- **Como obter**: Meta Business > Configurações do sistema > Tokens de acesso
- **Benefício**: Melhor tracking, reduz perda de iOS 14.5+

## 🚀 **Implementação Automática**

### **Scripts Carregados Automaticamente**

1. **GA4**: `gtag.js` carregado dinamicamente
2. **Facebook Pixel**: `fbevents.js` carregado dinamicamente
3. **API de Conversão**: Enviado via fetch para Graph API

### **Eventos Trackados**

#### **PageView (Automático)**

```javascript
// GA4
gtag("config", "G-XXXXXXXXXX");

// Facebook Pixel
fbq("track", "PageView");
```

#### **Form Submission Success**

```javascript
// GA4
gtag('event', 'form_submission_success', {
  event_category: 'Lead Generation',
  event_label: 'business|consumer',
  value: 10, // engagement_score
  custom_parameters: { /* dados completos */ }
});

// Google Ads
gtag('event', 'conversion', {
  'send_to': 'AW-123456789/AbCdEfGhIj_example',
  'value': 10,
  'currency': 'BRL',
  'transaction_id': 'session_id_12345'
});

// Facebook Pixel
fbq('track', 'Lead', {
  content_category: 'Lojistas',
  lead_type: 'business',
  value: 10,
  currency: 'BRL'
});

// Meta API de Conversão (duplicação automática)
POST https://graph.facebook.com/v18.0/{pixel-id}/events
```

#### **Custom Events**

- `cnpj_selection`: Quando usuário seleciona tipo de lead
- `form_field_focus`: Quando usuário clica em campo
- `form_field_complete`: Quando usuário completa campo
- `whatsapp_redirect`: Quando consumidor vai para WhatsApp

## 📊 **Dados Enviados**

### **GA4 Custom Parameters**

```javascript
{
  traffic_source: 'facebook|google_organic|direct',
  lead_type: 'business|consumer',
  lead_quality: 'high|medium|low',
  session_id: 'abc123def456',
  utm_source: 'facebook',
  utm_campaign: 'lojistas_q4'
}
```

### **Facebook Custom Data**

```javascript
{
  content_category: 'Lojistas',
  content_name: 'Ecko Lojista Registration',
  lead_type: 'business|consumer',
  traffic_source: 'facebook',
  value: 10,
  currency: 'BRL'
}
```

### **Meta API de Conversão**

```javascript
{
  event_name: 'Lead', // ou nome personalizado
  action_source: 'website',
  user_data: {
    client_user_agent: navigator.userAgent,
    fbc: '_fbc_cookie_value',
    fbp: '_fbp_cookie_value'
  },
  custom_data: {
    content_category: 'Lojistas',
    lead_type: 'business',
    value: 10,
    currency: 'BRL'
  }
}
```

## 🔧 **Setup Passo a Passo**

### **1. Google Analytics 4**

1. Criar conta GA4
2. Copiar Measurement ID (G-XXXXXXXXXX)
3. Adicionar `VITE_GA4_MEASUREMENT_ID` no .env
4. ✅ Pronto! Script carrega automaticamente

### **2. Facebook Pixel**

1. Criar Pixel no Meta Business
2. Copiar Pixel ID (15 dígitos)
3. Adicionar `VITE_META_PIXEL_ID` no .env
4. Personalizar `VITE_META_CONVERSION_NAME` (opcional)
5. ✅ Pronto! Script carrega automaticamente

### **3. Meta API de Conversão (Recomendado)**

1. Gerar Access Token no Meta Business
2. Adicionar `VITE_META_ACCESS_TOKEN` no .env
3. ✅ Pronto! API é chamada automaticamente

### **4. Google Ads (Opcional)**

1. Criar conversão no Google Ads
2. Copiar Conversion ID e Label
3. Adicionar variáveis no .env
4. ✅ Pronto! Conversões trackadas automaticamente

## 🎯 **Benefícios da Implementação**

### **Tracking Robusto**

- ✅ **GA4**: Analytics completo + Custom Parameters
- ✅ **Facebook Pixel**: Otimização de campanhas
- ✅ **Meta API**: Bypass das limitações iOS 14.5+
- ✅ **Google Ads**: ROI preciso das campanhas paid

### **Dados Enriquecidos**

- ✅ **UTM Tracking**: Origem completa das campanhas
- ✅ **Lead Scoring**: Qualificação automática (business vs consumer)
- ✅ **Device Data**: Mobile/desktop, browser, resolução
- ✅ **Timing**: Tempo de preenchimento, página load time

### **Deduplicação Automática**

- ✅ **Event ID**: Evita duplicação Pixel vs API
- ✅ **Session ID**: Tracking único por sessão
- ✅ **Timestamp**: Precisão temporal

## ⚡ **Modo Debug**

### **Verificar no Console**

```javascript
// Ver eventos trackados
console.log("Event tracked: form_submission_success", eventData);

// Verificar configuração
console.log("GA4 ID:", VITE_GA4_MEASUREMENT_ID);
console.log("Meta Pixel ID:", VITE_META_PIXEL_ID);
```

### **Ferramentas de Debug**

- **GA4**: Google Tag Assistant
- **Facebook**: Meta Pixel Helper (Chrome Extension)
- **Google Ads**: Google Ads Debug Mode

## 🔐 **Segurança**

### **Tokens Sensíveis**

- ✅ `META_ACCESS_TOKEN`: Somente em produção via DevServerControl
- ✅ Não commitar tokens no git
- ✅ Usar variáveis de ambiente

### **GDPR/LGPD**

- ✅ Scripts carregam somente se configurados
- ✅ Dados anonimizados por padrão
- ✅ Compatível com cookie consent

Configuração completa e pronta para produção! 🚀
