# Sistema de Analytics e Tracking - Ecko Landing Page

## 📊 Dados de Visitação e Origem de Tráfego

### 🎯 **Dados Capturados Automaticamente**

#### **1. UTM Parameters (Campanhas)**

```javascript
{
  utm_source: 'google|facebook|instagram',      // Origem da campanha
  utm_medium: 'cpc|social|email',               // Meio/canal
  utm_campaign: 'campanha_lojistas_q4',         // Nome da campanha
  utm_term: 'lojista+ecko',                     // Palavras-chave
  utm_content: 'banner_azul'                    // Variação do anúncio
}
```

#### **2. Origem de Tráfego**

```javascript
{
  referrer: 'https://google.com/search',        // URL de origem
  traffic_source: 'google_organic',             // Classificação automática:
                                                // - direct
                                                // - google_organic
                                                // - facebook
                                                // - instagram
                                                // - whatsapp
                                                // - youtube
                                                // - tiktok
                                                // - paid_campaign
                                                // - referral
}
```

#### **3. Dados de Sessão**

```javascript
{
  session_id: 'abc123def456',                   // ID único da sessão
  page_url: 'https://site.com/?utm_source=fb',  // URL completa
  page_title: 'Seja Lojista Oficial Ecko',     // Título da página
  landing_page: '/',                            // Página de entrada
  page_load_time: 1234.56,                     // Tempo de carregamento (ms)
}
```

#### **4. Informações do Dispositivo**

```javascript
{
  user_agent: 'Mozilla/5.0...',                // String completa do navegador
  language: 'pt-BR',                            // Idioma do navegador
  screen_resolution: '1920x1080',              // Resolução da tela
  viewport_size: '1200x800',                   // Tamanho da janela
  timezone: 'America/Sao_Paulo',               // Fuso horário
  is_mobile: true,                             // Dispositivo móvel?
  is_tablet: false,                            // Tablet?
  is_desktop: false,                           // Desktop?
  browser: 'Chrome'                            // Navegador detectado
}
```

#### **5. Dados de Marketing**

```javascript
{
  gclid: 'abc123',                             // Google Ads Click ID
  fbclid: 'def456',                            // Facebook Click ID
  cookie_consent: 'accepted'                    // Status do consentimento
}
```

### 🎯 **Dados de Formulário e Conversão**

#### **6. Qualificação do Lead**

```javascript
{
  lead_quality: 'high|medium|low',             // Baseado no CNPJ
  lead_type: 'business|consumer',              // Tipo de lead
  engagement_score: 10,                       // Score de 1-10
  interest_level: 'high',                     // Nível de interesse
}
```

#### **7. Dados de Conversão**

```javascript
{
  conversion_page: '/',                        // Página da conversão
  conversion_element: 'main_form',             // Elemento que converteu
  conversion_position: 'hero_section',        // Posição na página
  form_completion_time: 45.2,                 // Tempo para completar (segundos)
}
```

## 📈 **Eventos Trackados**

### **1. PageView**

Disparado quando a página carrega:

```javascript
{
  event: 'pageview',
  page: '/',
  title: 'Seja Lojista Oficial Ecko',
  // + todos os dados de analytics
}
```

### **2. Form Field Events**

```javascript
// Quando usuário clica em um campo
{
  event: 'form_field_focus',
  field: 'name|whatsapp|cnpj',
  step: 1 // Ordem do campo
}

// Quando usuário preenche um campo
{
  event: 'form_field_complete',
  field: 'name|whatsapp|cnpj',
  step: 1
}
```

### **3. CNPJ Selection**

```javascript
{
  event: 'cnpj_selection',
  selection: 'sim|nao-consumidor',
  has_cnpj: true,
  lead_type: 'business|consumer'
}
```

### **4. Form Submission**

```javascript
// Sucesso
{
  event: 'form_submission_success',
  lead_type: 'business|consumer',
  form_completion_time: 45.2,
  has_cnpj: true
}

// Erro
{
  event: 'form_submission_error',
  error_status: 400,
  error_type: 'http_error|network_error',
  error_message: 'Network error',
  form_data: {
    has_name: true,
    has_whatsapp: true,
    cnpj_selection: 'sim'
  }
}
```

### **5. WhatsApp Redirect**

```javascript
{
  event: 'whatsapp_redirect',
  reason: 'coupon_request',
  lead_type: 'consumer'
}
```

## 🔧 **Implementação no Backend**

### **Payload Completo Enviado**

O payload enviado para a API incluirá todos os dados:

```javascript
{
  // Dados do formulário
  name: "João Silva",
  whatsapp: "11999999999",
  hasCnpj: "sim",
  cnpj: "12.345.678/0001-90",

  // Dados da campanha
  marca: "Ecko",
  origem: "Landing Page Lojistas",
  campaign_type: "Lead Generation",
  lead_source: "Website Form",

  // Analytics completos (40+ campos)
  utm_source: "facebook",
  utm_campaign: "lojistas_q4",
  traffic_source: "facebook",
  referrer: "https://facebook.com",
  session_id: "abc123",
  user_agent: "Mozilla/5.0...",
  is_mobile: true,
  browser: "Chrome",
  // ... todos os outros campos

  // Qualificação
  lead_quality: "high",
  lead_type: "business",
  engagement_score: 10,

  // Timestamps
  form_timestamp: "2024-01-01T10:00:00Z",
  server_timestamp: null // Preenchido no backend
}
```

## 📊 **Integrações Sugeridas**

### **Google Analytics 4**

```javascript
gtag("config", "GA_MEASUREMENT_ID", {
  custom_map: {
    custom_parameter_1: "traffic_source",
    custom_parameter_2: "lead_type",
  },
});

gtag("event", "form_submission_success", {
  event_category: "Lead Generation",
  event_label: lead_type,
  value: engagement_score,
});
```

### **Facebook Pixel**

```javascript
fbq("track", "Lead", {
  content_category: "Lojistas",
  lead_type: lead_type,
  traffic_source: traffic_source,
  value: engagement_score,
});
```

### **Google Ads**

```javascript
gtag("event", "conversion", {
  send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
  value: 1.0,
  currency: "BRL",
  transaction_id: session_id,
});
```

## 🎯 **Análises Possíveis**

### **1. Origem de Tráfego**

- Qual canal gera mais leads qualificados?
- ROI por canal de marketing
- Performance por campanha UTM

### **2. Comportamento do Usuário**

- Tempo médio de preenchimento do formulário
- Taxa de abandono por campo
- Dispositivos que mais convertem

### **3. Qualificação de Leads**

- % de leads business vs consumer
- Score médio de engagement
- Conversão por origem de tráfego

### **4. Performance Técnica**

- Tempo de carregamento da página
- Taxa de erro de formulário
- Performance por dispositivo/navegador

Todos esses dados permitirão otimizações precisas de marketing e UX! 🚀
