import { useState, useEffect } from "react";
import {
  MdStar,
  MdAttachMoney,
  MdHeadset,
  MdWorkspacePremium,
} from "react-icons/md";
import {
  FaFacebook,
  FaInstagram,
  FaStore,
  FaArrowRight,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function Index() {
  const [showCnpjField, setShowCnpjField] = useState(false);
  const [selectedCnpj, setSelectedCnpj] = useState("");
  const [showCouponMessage, setShowCouponMessage] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Estados para validação de formulário
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formValues, setFormValues] = useState({
    name: "",
    whatsapp: "",
    cnpj: "",
  });

  // Configurações de tracking via .env
  const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
  const META_ACCESS_TOKEN = import.meta.env.VITE_META_ACCESS_TOKEN;
  const META_CONVERSION_NAME =
    import.meta.env.VITE_META_CONVERSION_NAME || "Lead";
  const META_API_VERSION = import.meta.env.VITE_META_API_VERSION || "v18.0";
  const GOOGLE_ADS_CONVERSION_ID = import.meta.env
    .VITE_GOOGLE_ADS_CONVERSION_ID;
  const GOOGLE_ADS_CONVERSION_LABEL = import.meta.env
    .VITE_GOOGLE_ADS_CONVERSION_LABEL;

  // Inicializar tracking na página
  useEffect(() => {
    // Marcar início do tempo para cálculo de completion time
    window.formStartTime = performance.now();

    // Inicializar Google Analytics 4
    if (GA4_MEASUREMENT_ID) {
      // Carregar script do GA4
      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
      document.head.appendChild(gaScript);

      // Configurar gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function (...args: any[]) {
        window.dataLayer.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA4_MEASUREMENT_ID, {
        page_title: "Seja Lojista Oficial Ecko",
        page_location: window.location.href,
        custom_map: {
          custom_parameter_1: "traffic_source",
          custom_parameter_2: "lead_type",
          custom_parameter_3: "lead_quality",
        },
      });
    }

    // Inicializar Facebook Pixel
    if (META_PIXEL_ID) {
      // Carregar script do Facebook Pixel
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js",
      );

      // Aguardar script carregar e inicializar
      setTimeout(() => {
        if (window.fbq) {
          window.fbq("init", META_PIXEL_ID);
          window.fbq("track", "PageView");
        }
      }, 100);
    }

    // Registrar pageview customizado
    const pageviewData = {
      event: "pageview",
      page: "/",
      title: "Seja Lojista Oficial Ecko",
      ...getAnalyticsData(),
    };

    // Log para debug
    console.log("Pageview tracked:", pageviewData);

    // Enviar pageview customizado
    trackEvent("pageview", pageviewData);

    // Cleanup no unmount
    return () => {
      delete window.formStartTime;
    };
  }, [GA4_MEASUREMENT_ID, META_PIXEL_ID]);

  const api_form =
    import.meta.env.VITE_api_form ||
    "https://470187c48f0a4640803d23a0491ae11b-a421d35e00a9431bb90c3d034.fly.dev/api/leads";

  // Função para capturar dados de visitação e analytics
  const getAnalyticsData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer || "direct";

    return {
      // UTM Parameters
      utm_source: urlParams.get("utm_source") || null,
      utm_medium: urlParams.get("utm_medium") || null,
      utm_campaign: urlParams.get("utm_campaign") || null,
      utm_term: urlParams.get("utm_term") || null,
      utm_content: urlParams.get("utm_content") || null,

      // Traffic Source
      referrer: referrer,
      traffic_source:
        referrer === ""
          ? "direct"
          : referrer.includes("google")
            ? "google_organic"
            : referrer.includes("facebook")
              ? "facebook"
              : referrer.includes("instagram")
                ? "instagram"
                : referrer.includes("whatsapp")
                  ? "whatsapp"
                  : referrer.includes("youtube")
                    ? "youtube"
                    : referrer.includes("tiktok")
                      ? "tiktok"
                      : urlParams.get("utm_source")
                        ? "paid_campaign"
                        : "referral",

      // Page Information
      page_url: window.location.href,
      page_title: document.title,
      landing_page: window.location.pathname,

      // Device/Browser Information
      user_agent: navigator.userAgent,
      language: navigator.language || navigator.languages?.[0] || "pt-BR",
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

      // Session Information
      session_id:
        sessionStorage.getItem("session_id") ||
        (() => {
          const id =
            Date.now().toString(36) + Math.random().toString(36).substr(2);
          sessionStorage.setItem("session_id", id);
          return id;
        })(),

      // Timing
      page_load_time: performance.now(),
      timestamp: new Date().toISOString(),
      local_time: new Date().toLocaleString("pt-BR"),

      // Additional tracking
      is_mobile: /Mobi|Android/i.test(navigator.userAgent),
      is_tablet: /Tablet|iPad/i.test(navigator.userAgent),
      is_desktop: !/Mobi|Android|Tablet|iPad/i.test(navigator.userAgent),
      browser: navigator.userAgent.includes("Chrome")
        ? "Chrome"
        : navigator.userAgent.includes("Firefox")
          ? "Firefox"
          : navigator.userAgent.includes("Safari")
            ? "Safari"
            : navigator.userAgent.includes("Edge")
              ? "Edge"
              : "Other",

      // Marketing tags
      gclid: urlParams.get("gclid") || null, // Google Ads
      fbclid: urlParams.get("fbclid") || null, // Facebook Ads

      // Cookie consent (se houver)
      cookie_consent: localStorage.getItem("cookie_consent") || null,
    };
  };

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Marcos Silva",
      store: "Street Style Store - São Paulo, SP",
      avatar: "M",
      text: "Trabalhar com a Ecko foi um divisor de águas para minha loja. As margens são excelentes e os produtos saem rapidamente. Meus clientes sempre perguntam pelos lançamentos da marca.",
    },
    {
      id: 2,
      name: "Amanda Costa",
      store: "Urban Fashion - Rio de Janeiro, RJ",
      avatar: "A",
      text: "O suporte da equipe Ecko é incrível. Eles nos ajudam com materiais de marketing e sempre estão disponíveis para dúvidas. Recomendo para qualquer lojista sério.",
    },
    {
      id: 3,
      name: "Rafael Oliveira",
      store: "Streetwear BH - Belo Horizonte, MG",
      avatar: "R",
      text: "Em 2 anos como parceiro Ecko, tripliquei meu faturamento. A marca tem um apelo incrível com o público jovem e as peças têm qualidade excepcional.",
    },
    {
      id: 4,
      name: "Carla Santos",
      store: "Fashion Hub - Curitiba, PR",
      avatar: "C",
      text: "A Ecko transformou minha loja multimarca. Agora somos referência em streetwear na cidade. O processo de se tornar parceiro foi super tranquilo e rápido.",
    },
  ];

  // Slider functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.ceil(testimonials.length / 2) - 1 : prev - 1,
    );
  };

  const nextSlideMobile = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlideMobile = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Função para trackear eventos específicos
  const trackEvent = (eventName: string, eventData: any = {}) => {
    const fullEventData = {
      event: eventName,
      timestamp: new Date().toISOString(),
      session_id: sessionStorage.getItem("session_id"),
      page: window.location.pathname,
      ...eventData,
    };

    console.log(`Event tracked: ${eventName}`, fullEventData);

    // Google Analytics 4
    if (GA4_MEASUREMENT_ID && window.gtag) {
      window.gtag("event", eventName, {
        event_category: "Lead Generation",
        event_label: fullEventData.lead_type || "unknown",
        value: fullEventData.engagement_score || 1,
        custom_parameters: fullEventData,
        session_id: fullEventData.session_id,
        traffic_source: fullEventData.traffic_source,
        lead_quality: fullEventData.lead_quality,
      });

      // Google Ads Conversion Tracking
      if (
        eventName === "form_submission_success" &&
        GOOGLE_ADS_CONVERSION_ID &&
        GOOGLE_ADS_CONVERSION_LABEL
      ) {
        window.gtag("event", "conversion", {
          send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
          value: fullEventData.engagement_score || 1,
          currency: "BRL",
          transaction_id: fullEventData.session_id,
          custom_parameters: {
            lead_type: fullEventData.lead_type,
            traffic_source: fullEventData.traffic_source,
            lead_quality: fullEventData.lead_quality,
          },
        });
      }
    }

    // Facebook Pixel
    if (META_PIXEL_ID && window.fbq) {
      const pixelData = {
        content_category: "Lojistas",
        content_name: "Ecko Lojista Registration",
        lead_type: fullEventData.lead_type || "unknown",
        traffic_source: fullEventData.traffic_source || "unknown",
        value: fullEventData.engagement_score || 1,
        currency: "BRL",
        custom_data: fullEventData,
      };

      // Eventos específicos do Facebook
      if (eventName === "form_submission_success") {
        window.fbq("track", META_CONVERSION_NAME, pixelData);
        // Também enviar via API de conversão
        sendMetaConversionAPI(eventName, pixelData, fullEventData);
      } else {
        window.fbq("trackCustom", eventName, pixelData);
      }
    }
  };

  // Função para API de conversão Meta
  const sendMetaConversionAPI = async (
    eventName: string,
    pixelData: any,
    fullEventData: any,
  ) => {
    if (!META_ACCESS_TOKEN || !META_PIXEL_ID) return;

    try {
      const conversionData = {
        data: [
          {
            event_name: META_CONVERSION_NAME,
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            event_source_url: window.location.href,
            user_data: {
              client_ip_address: null, // Será preenchido automaticamente
              client_user_agent: navigator.userAgent,
              fbc: getCookie("_fbc"), // Facebook click ID
              fbp: getCookie("_fbp"), // Facebook browser ID
            },
            custom_data: {
              content_category: "Lojistas",
              content_name: "Ecko Lojista Registration",
              lead_type: fullEventData.lead_type,
              traffic_source: fullEventData.traffic_source,
              value: fullEventData.engagement_score || 1,
              currency: "BRL",
            },
            event_id: fullEventData.session_id + "_" + Date.now(), // Para deduplicação
          },
        ],
        access_token: META_ACCESS_TOKEN,
      };

      const response = await fetch(
        `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(conversionData),
        },
      );

      if (response.ok) {
        console.log("Meta Conversion API: Success");
      } else {
        console.error("Meta Conversion API: Error", await response.text());
      }
    } catch (error) {
      console.error("Meta Conversion API: Network error", error);
    }
  };

  // Função auxiliar para pegar cookies
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  // Funções de formatação
  const formatWhatsApp = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");

    // Aplica a máscara (XX) XXXXX-XXXX
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const formatCNPJ = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");

    // Aplica a máscara XX.XXX.XXX/XXXX-XX
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 5) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    } else if (numbers.length <= 8) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    } else if (numbers.length <= 12) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    } else {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
    }
  };

  // Funções de validação
  const validateName = (name: string) => {
    if (!name.trim()) return "Nome é obrigatório";
    if (name.trim().length < 2) return "Nome deve ter pelo menos 2 caracteres";
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) return "Nome deve conter apenas letras";
    return "";
  };

  const validateWhatsApp = (phone: string) => {
    const numbers = phone.replace(/\D/g, "");
    if (!numbers) return "WhatsApp é obrigatório";
    if (numbers.length < 10) return "WhatsApp deve ter pelo menos 10 dígitos";
    if (numbers.length < 11 && !numbers.startsWith("11"))
      return "WhatsApp deve ter 11 dígitos para celular";
    if (numbers.length > 11) return "WhatsApp não pode ter mais de 11 dígitos";
    return "";
  };

  const validateCNPJ = (cnpj: string) => {
    const numbers = cnpj.replace(/\D/g, "");
    if (!numbers) return "CNPJ é obrigatório";
    if (numbers.length !== 14) return "CNPJ deve ter 14 dígitos";

    // Validação de CNPJ
    if (numbers === "00000000000000") return "CNPJ inválido";

    // Algoritmo de validação de CNPJ
    let sum = 0;
    let weight = 2;

    for (let i = 11; i >= 0; i--) {
      sum += parseInt(numbers.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }

    const digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(numbers.charAt(12)) !== digit1) return "CNPJ inválido";

    sum = 0;
    weight = 2;

    for (let i = 12; i >= 0; i--) {
      sum += parseInt(numbers.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }

    const digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(numbers.charAt(13)) !== digit2) return "CNPJ inválido";

    return "";
  };

  // Função para validar campo em tempo real
  const validateField = (fieldName: string, value: string) => {
    let error = "";

    switch (fieldName) {
      case "name":
        error = validateName(value);
        break;
      case "whatsapp":
        error = validateWhatsApp(value);
        break;
      case "cnpj":
        error = validateCNPJ(value);
        break;
    }

    setFormErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));

    return error === "";
  };

  const handleCnpjRadioChange = (value: string) => {
    setSelectedCnpj(value);
    setShowCnpjField(value === "sim");
    setShowCouponMessage(value === "nao-consumidor");

    // Track evento de seleção CNPJ
    trackEvent("cnpj_selection", {
      selection: value,
      has_cnpj: value === "sim",
      lead_type: value === "sim" ? "business" : "consumer",
    });
  };

  // Handlers para campos do formulário
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormValues((prev) => ({ ...prev, name: value }));

    // Validar após delay para n��o validar a cada tecla
    setTimeout(() => validateField("name", value), 500);
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatWhatsApp(value);

    // Prevenir input além do limite
    if (formatted.length <= 15) {
      e.target.value = formatted;
      setFormValues((prev) => ({ ...prev, whatsapp: formatted }));

      // Validar após delay
      setTimeout(() => validateField("whatsapp", formatted), 500);
    } else {
      e.preventDefault();
    }
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatCNPJ(value);

    // Prevenir input além do limite
    if (formatted.length <= 18) {
      e.target.value = formatted;
      setFormValues((prev) => ({ ...prev, cnpj: formatted }));

      // Validar após delay
      setTimeout(() => validateField("cnpj", formatted), 500);
    } else {
      e.preventDefault();
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Validar todos os campos antes de enviar
    const nameValue = formData.get("name") as string;
    const whatsappValue = formData.get("whatsapp") as string;
    const cnpjValue = formData.get("cnpj-number") as string;

    const nameError = validateName(nameValue);
    const whatsappError = validateWhatsApp(whatsappValue);
    const cnpjError = showCnpjField ? validateCNPJ(cnpjValue) : "";

    // Atualizar erros
    setFormErrors({
      name: nameError,
      whatsapp: whatsappError,
      cnpj: cnpjError,
    });

    // Se houver erros, não enviar
    if (nameError || whatsappError || cnpjError) {
      trackEvent("form_validation_error", {
        errors: {
          name: !!nameError,
          whatsapp: !!whatsappError,
          cnpj: !!cnpjError,
        },
      });
      return;
    }

    const analyticsData = getAnalyticsData();

    const payload = {
      // Dados do formulário
      name: formData.get("name"),
      whatsapp: formData.get("whatsapp"),
      hasCnpj: selectedCnpj,
      cnpj: showCnpjField ? formData.get("cnpj-number") : null,

      // Dados da marca/campanha
      marca: "Ecko",
      origem: "Landing Page Lojistas",
      campaign_type: "Lead Generation",
      lead_source: "Website Form",

      // Analytics e tracking completo
      ...analyticsData,

      // Dados específicos do lead
      lead_quality: selectedCnpj === "sim" ? "high" : "medium",
      lead_type: selectedCnpj === "sim" ? "business" : "consumer",
      form_completion_time:
        performance.now() - (window.formStartTime || performance.now()),

      // Informações de conversão
      conversion_page: "/",
      conversion_element: "main_form",
      conversion_position: "hero_section",

      // Dados de interesse
      interest_level: "high", // Preencheu formulário completo
      engagement_score: selectedCnpj === "sim" ? 10 : 7, // Score baseado no tipo

      // Timestamps diferentes
      form_timestamp: new Date().toISOString(),
      server_timestamp: null, // Será preenchido no backend
    };

    console.log("Payload sendo enviado:", payload);

    try {
      const response = await fetch(api_form, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Track sucesso do envio
        trackEvent("form_submission_success", {
          lead_type: selectedCnpj === "sim" ? "business" : "consumer",
          form_completion_time: performance.now() - (window.formStartTime || 0),
          has_cnpj: selectedCnpj === "sim",
        });

        // Se for consumidor, abre WhatsApp após enviar dados
        if (selectedCnpj === "nao-consumidor") {
          alert(
            "Dados enviados! Redirecionando para receber seu cupom de desconto.",
          );

          // Track clique do WhatsApp
          trackEvent("whatsapp_redirect", {
            reason: "coupon_request",
            lead_type: "consumer",
          });

          window.open(
            "https://wa.me/5511999999999?text=Olá, quero receber o cupom de 10% de desconto!",
            "_blank",
          );
        } else {
          alert(
            "Formulário enviado com sucesso! Entraremos em contato em breve.",
          );
        }

        e.currentTarget.reset();
        setSelectedCnpj("");
        setShowCnpjField(false);
        setShowCouponMessage(false);
      } else {
        // Track erro do envio
        trackEvent("form_submission_error", {
          error_status: response.status,
          error_type: "http_error",
          form_data: {
            has_name: !!formData.get("name"),
            has_whatsapp: !!formData.get("whatsapp"),
            cnpj_selection: selectedCnpj,
          },
        });

        alert("Erro ao enviar formul��rio. Tente novamente.");
      }
    } catch (error) {
      // Track erro de conex��o
      trackEvent("form_submission_error", {
        error_type: "network_error",
        error_message: error?.message || "Unknown error",
        form_data: {
          has_name: !!formData.get("name"),
          has_whatsapp: !!formData.get("whatsapp"),
          cnpj_selection: selectedCnpj,
        },
      });

      console.error("Erro ao enviar formulário:", error);
      alert(
        "Erro ao enviar formulário. Verifique sua conexão e tente novamente.",
      );
    }
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Landing Page Principal */}
      <header className="relative h-screen w-full overflow-hidden">
        <img
          src="/images/hero/hero-background.webp"
          alt="Lojistas Ecko Oficiais - Maior Marca de Streetwear do Brasil"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Enhanced Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-8">
          {/* Logo */}
          <div className="mb-12 animate-fade-in">
            <img
              src="/images/brand/ecko-logo.webp"
              alt="Logo Ecko - Líder em Streetwear e Moda Urbana no Brasil"
              className="h-20 md:h-24 lg:h-28 w-auto mx-auto drop-shadow-2xl"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          {/* Main Heading - H1 for SEO - Otimizado para mobile */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-4 sm:mb-6 max-w-6xl leading-tight tracking-tight animate-slide-up px-2 uppercase">
            <span className="block mb-1 sm:mb-2 drop-shadow-2xl">
              SEJA UM LOJISTA
            </span>
            <span className="block drop-shadow-2xl">
              OFICIAL <span className="text-primary">ECKO</span>
            </span>
          </h1>

          {/* Subtítulo de Destaque */}
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white/95 mb-8 sm:mb-10 max-w-4xl leading-tight animate-slide-up px-2">
            A maior marca de moda urbana do Brasil e reconhecida mundialmente
            agora na sua loja
          </h2>

          {/* Call to Action Button - Otimizado para mobile */}
          <a
            href="#cadastro-lojistas"
            className="group inline-flex items-center justify-center bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 sm:px-7 py-3 sm:py-4 rounded-xl text-base sm:text-lg md:text-xl font-black transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl animate-fade-in uppercase tracking-wide mx-4 sm:mx-0 gap-2"
          >
            CADASTRE-SE AGORA
            <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>

          {/* Indicador para rolar para baixo */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
            <div
              className="flex flex-col items-center text-white/90 cursor-pointer hover:text-white transition-colors duration-300"
              onClick={() =>
                document
                  .getElementById("cadastro-lojistas")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="text-xs sm:text-sm font-medium mb-2 uppercase tracking-wide animate-fade-in">
                Role para baixo
              </span>
              <FaChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-scroll-bounce" />
            </div>
          </div>
        </div>
      </header>

      {/* Cadastro de Lojistas - Formulário de Parceria - Otimizado para mobile */}
      <section
        className="py-12 sm:py-20 md:py-32 bg-white"
        id="cadastro-lojistas"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto items-center">
            {/* Text/CTA Column - Otimizado para mobile */}
            <div className="space-y-6 sm:space-y-10">
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Cadastre-se e Seja um Lojista Oficial
                  <span className="block text-primary">Ecko Agora Mesmo</span>
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-800 leading-relaxed font-medium">
                    Faça parte da rede de distribuidores oficiais da maior marca
                    de moda urbana do Brasil, reconhecida mundialmente.
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                    Condições exclusivas para lojistas parceiros e processo 100%
                    digital.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Column - Otimizado para mobile */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-8 shadow-lg">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    Solicite Seu Atendimento
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Preencha o formulário e um analista da Ecko entrará em
                    contato para apresentar nosso catálogo digital exclusivo com
                    preços e condições especiais para lojistas oficiais.
                  </p>
                </div>

                <form
                  className="space-y-4 sm:space-y-5"
                  onSubmit={handleFormSubmit}
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-900"
                    >
                      Nome *
                    </label>
                    <div className="relative">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className={`w-full px-4 py-4 sm:py-3 pr-12 rounded-lg border bg-background text-gray-900 placeholder:text-gray-900/70 focus:ring-2 focus:border-transparent transition-all text-base sm:text-sm ${
                          formErrors.name
                            ? "border-red-500 focus:ring-red-500"
                            : formValues.name && !formErrors.name
                              ? "border-green-500 focus:ring-green-500"
                              : "border-input focus:ring-primary"
                        }`}
                        placeholder="Seu nome completo"
                        value={formValues.name}
                        onChange={handleNameChange}
                        onFocus={() =>
                          trackEvent("form_field_focus", {
                            field: "name",
                            step: 1,
                          })
                        }
                        onBlur={(e) => {
                          validateField("name", e.target.value);
                          e.target.value &&
                            trackEvent("form_field_complete", {
                              field: "name",
                              step: 1,
                            });
                        }}
                      />
                      {/* Ícone de validação */}
                      {formValues.name && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {formErrors.name ? (
                            <FaExclamationTriangle className="w-5 h-5 text-red-500" />
                          ) : (
                            <FaCheck className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="whatsapp"
                      className="text-sm font-medium text-gray-900"
                    >
                      WhatsApp *
                    </label>
                    <div className="relative">
                      <input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        required
                        className={`w-full px-4 py-4 sm:py-3 pr-12 rounded-lg border bg-background text-gray-900 placeholder:text-gray-900/70 focus:ring-2 focus:border-transparent transition-all text-base sm:text-sm ${
                          formErrors.whatsapp
                            ? "border-red-500 focus:ring-red-500"
                            : formValues.whatsapp && !formErrors.whatsapp
                              ? "border-green-500 focus:ring-green-500"
                              : "border-input focus:ring-primary"
                        }`}
                        placeholder="(11) 99999-9999"
                        maxLength={15}
                        onChange={handleWhatsAppChange}
                        onFocus={() =>
                          trackEvent("form_field_focus", {
                            field: "whatsapp",
                            step: 2,
                          })
                        }
                        onBlur={(e) => {
                          validateField("whatsapp", e.target.value);
                          e.target.value &&
                            trackEvent("form_field_complete", {
                              field: "whatsapp",
                              step: 2,
                            });
                        }}
                      />
                      {/* Ícone de validação */}
                      {formValues.whatsapp && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {formErrors.whatsapp ? (
                            <FaExclamationTriangle className="w-5 h-5 text-red-500" />
                          ) : (
                            <FaCheck className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {formErrors.whatsapp && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.whatsapp}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-900">
                      Sua loja possui CNPJ? *
                    </label>
                    <div className="flex gap-4 sm:gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="cnpj"
                          value="sim"
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                          required
                          onChange={(e) =>
                            handleCnpjRadioChange(e.target.value)
                          }
                        />
                        <span className="text-sm sm:text-base text-gray-900">
                          ✅ Sim, sou lojista com CNPJ
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="cnpj"
                          value="nao-consumidor"
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                          required
                          onChange={(e) =>
                            handleCnpjRadioChange(e.target.value)
                          }
                        />
                        <span className="text-sm sm:text-base text-gray-900">
                          ❌ Não, sou consumidor
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Mensagem de Cupom para Consumidores */}
                  {showCouponMessage && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="text-center space-y-3">
                        <p className="text-gray-900 font-medium">
                          Este cadastro é exclusivo para lojistas com CNPJ
                        </p>
                        <p className="text-gray-700">
                          Mas não fique triste! Temos um cupom com{" "}
                          <span className="font-bold text-primary">
                            10% de desconto
                          </span>{" "}
                          para você
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Campo CNPJ Condicional */}
                  {showCnpjField && (
                    <div className="space-y-2">
                      <label
                        htmlFor="cnpj-number"
                        className="text-sm font-medium text-gray-900"
                      >
                        Agora precisamos do seu CNPJ *
                      </label>
                      <div className="relative">
                        <input
                          id="cnpj-number"
                          name="cnpj-number"
                          type="text"
                          required
                          className={`w-full px-4 py-4 sm:py-3 pr-12 rounded-lg border bg-background text-gray-900 placeholder:text-gray-900/70 focus:ring-2 focus:border-transparent transition-all text-base sm:text-sm ${
                            formErrors.cnpj
                              ? "border-red-500 focus:ring-red-500"
                              : formValues.cnpj && !formErrors.cnpj
                                ? "border-green-500 focus:ring-green-500"
                                : "border-input focus:ring-primary"
                          }`}
                          placeholder="00.000.000/0000-00"
                          maxLength={18}
                          onChange={handleCnpjChange}
                          onFocus={() =>
                            trackEvent("form_field_focus", {
                              field: "cnpj",
                              step: 3,
                            })
                          }
                          onBlur={(e) => {
                            validateField("cnpj", e.target.value);
                            e.target.value &&
                              trackEvent("form_field_complete", {
                                field: "cnpj",
                                step: 3,
                              });
                          }}
                        />
                        {/* Ícone de validação */}
                        {formValues.cnpj && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {formErrors.cnpj ? (
                              <FaExclamationTriangle className="w-5 h-5 text-red-500" />
                            ) : (
                              <FaCheck className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {formErrors.cnpj && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.cnpj}
                        </p>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-red-600 text-white py-4 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-colors duration-300 mt-6 min-h-[48px]"
                  >
                    {showCouponMessage
                      ? "Receber Cupom de 10% Desconto"
                      : "CADASTRE-SE AGORA"}
                  </button>

                  <p className="text-xs text-gray-900/70 text-center">
                    Ao enviar, você concorda em receber informações comerciais
                    da Ecko. Seus dados estão seguros conosco.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios para Lojistas Ecko */}
      <section
        className="py-20 md:py-32 relative bg-gray-50"
        id="beneficios-lojistas"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/benefits/background.webp"
            alt="Produtos Ecko Streetwear - Qualidade e Estilo"
            className="w-full h-full object-cover opacity-10"
            loading="lazy"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">
                Vantagens de Ser Lojista{" "}
                <span className="text-primary bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                  Oficial Ecko
                </span>
              </h2>
              <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                4 benefícios exclusivos que aumentam a lucratividade do seu
                negócio de moda.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Reason 1 */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <div className="mb-5 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MdStar className="w-14 sm:w-16 h-14 sm:h-16 text-primary mx-auto" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">
                  Produtos Exclusivos
                </h3>
                <p className="text-gray-900/80 text-sm leading-relaxed text-center">
                  Acesso prioritário a coleções limitadas, lançamentos
                  exclusivos e produtos especiais disponíveis apenas para
                  lojistas oficiais. Seja o primeiro a oferecer novidades aos
                  seus clientes.
                </p>
              </div>

              {/* Reason 2 */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <div className="mb-5 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MdAttachMoney className="w-14 sm:w-16 h-14 sm:h-16 text-primary mx-auto" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">
                  Margens Atrativas
                </h3>
                <p className="text-gray-900/80 text-sm leading-relaxed text-center">
                  Condições comerciais diferenciadas, com margens competitivas e
                  flexibilidade de pagamento. Mais lucro para sua loja com
                  preços especiais para parceiros oficiais.
                </p>
              </div>

              {/* Reason 3 */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <div className="mb-5 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MdHeadset className="w-14 sm:w-16 h-14 sm:h-16 text-primary mx-auto" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">
                  Suporte Completo
                </h3>
                <p className="text-gray-900/80 text-sm leading-relaxed text-center">
                  Treinamento especializado, materiais de marketing exclusivos,
                  suporte técnico e consultoria para potencializar suas vendas e
                  crescimento.
                </p>
              </div>

              {/* Reason 4 */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <div className="mb-5 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MdWorkspacePremium className="w-14 sm:w-16 h-14 sm:h-16 text-primary mx-auto" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">
                  Prestígio da Marca
                </h3>
                <p className="text-gray-900/80 text-sm leading-relaxed text-center">
                  Associe-se a uma das marcas de moda urbana mais reconhecidas
                  do Brasil e do mundo. Credibilidade que fortalece seu negócio
                  e atrai mais clientes para sua loja.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <button className="bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-gray-900 px-12 py-4 rounded-xl text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                Quero Ser Parceiro Agora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria de Produtos Ecko Streetwear - Otimizado para mobile */}
      <section
        className="py-12 sm:py-20 md:py-32 bg-white"
        id="galeria-produtos"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">
                Coleções Exclusivas
                <span className="block text-primary bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                  Ecko
                </span>
              </h2>
              <p className="text-gray-600 text-base sm:text-xl max-w-2xl mx-auto px-4">
                Descubra as coleções oficiais Ecko, com design autêntico e
                qualidade premium. Produtos únicos que valorizam sua loja e
                encantam seus clientes.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
              {/* Photo 1 */}
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/gallery/collection-1.webp"
                  alt="Coleção Ecko Streetwear"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 2 */}
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/gallery/urban-style.webp"
                  alt="Estilo Urbano Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 3 */}
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/gallery/urban-fashion.webp"
                  alt="Moda Urbana Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 4 */}
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/gallery/streetwear-premium.webp"
                  alt="Streetwear Premium Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 5 */}
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/gallery/lifestyle.webp"
                  alt="Lifestyle Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 6 */}
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/gallery/products-exclusive.webp"
                  alt="Produtos Exclusivos Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 7 */}
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/gallery/complete-collection.webp"
                  alt="Coleção Completa Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Photo 8 */}
              <div className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <img
                  src="/images/gallery/premium-quality.webp"
                  alt="Qualidade Premium Ecko"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <a
                href="#cadastro-lojistas"
                className="inline-block bg-primary hover:bg-red-600 text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors duration-300"
              >
                Quero Ser Lojista Oficial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos de Lojistas Parceiros Ecko - Otimizado para mobile */}
      <section
        className="py-12 sm:py-20 md:py-32 bg-gray-100"
        id="depoimentos-lojistas"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">
                Depoimentos de Lojistas
                <span className="block text-primary bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                  Ecko Oficiais
                </span>
              </h2>
              <p className="text-gray-600 text-base sm:text-xl max-w-2xl mx-auto px-4">
                Histórias reais de sucesso de parceiros que triplicaram o
                faturamento com a Ecko
              </p>
            </div>

            {/* Slider Container */}
            <div className="relative">
              {/* Desktop Navigation Arrows */}
              <div className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
                <button
                  onClick={prevSlide}
                  className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-300 -ml-6"
                  aria-label="Depoimento anterior"
                >
                  <FaChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
                <button
                  onClick={nextSlide}
                  className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-300 -mr-6"
                  aria-label="Próximo depoimento"
                >
                  <FaChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Mobile Navigation Arrows */}
              <div className="flex md:hidden absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
                <button
                  onClick={prevSlideMobile}
                  className="bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors duration-300"
                  aria-label="Depoimento anterior"
                >
                  <FaChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="flex md:hidden absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
                <button
                  onClick={nextSlideMobile}
                  className="bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors duration-300"
                  aria-label="Próximo depoimento"
                >
                  <FaChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Desktop Slider Content - 2 columns */}
              <div className="hidden md:block overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {Array.from({
                    length: Math.ceil(testimonials.length / 2),
                  }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-2 gap-8">
                        {testimonials
                          .slice(slideIndex * 2, slideIndex * 2 + 2)
                          .map((testimonial) => (
                            <div
                              key={testimonial.id}
                              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <div className="space-y-6">
                                <div className="flex items-center space-x-1 text-primary">
                                  <span className="text-2xl">★★★★★</span>
                                </div>
                                <blockquote className="text-lg text-gray-900 leading-relaxed italic">
                                  "{testimonial.text}"
                                </blockquote>
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-gray-900 font-bold text-lg">
                                      {testimonial.avatar}
                                    </span>
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-gray-900">
                                      {testimonial.name}
                                    </h3>
                                    <p className="text-sm text-gray-900/70">
                                      {testimonial.store}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Slider Content - 1 column */}
              <div className="md:hidden overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                        <div className="space-y-6">
                          <div className="flex items-center space-x-1 text-primary">
                            <span className="text-2xl">★★★★★</span>
                          </div>
                          <blockquote className="text-base text-gray-900 leading-relaxed italic">
                            "{testimonial.text}"
                          </blockquote>
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-gray-900 font-bold text-lg">
                                {testimonial.avatar}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">
                                {testimonial.name}
                              </h3>
                              <p className="text-sm text-gray-900/70">
                                {testimonial.store}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Navigation - Desktop (paired slides) */}
              <div className="hidden md:flex justify-center mt-8 space-x-2">
                {Array.from({ length: Math.ceil(testimonials.length / 2) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-12 h-12 rounded-full transition-colors duration-300 flex items-center justify-center ${
                        currentSlide === index
                          ? "bg-primary"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Ir para slide ${index + 1}`}
                      title={`Ir para slide ${index + 1}`}
                    >
                      <span
                        className={`w-3 h-3 rounded-full ${
                          currentSlide === index ? "bg-white" : "bg-gray-600"
                        }`}
                      ></span>
                    </button>
                  ),
                )}
              </div>

              {/* Dots Navigation - Mobile (single slides) */}
              <div className="flex md:hidden justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-12 h-12 rounded-full transition-colors duration-300 flex items-center justify-center ${
                      currentSlide === index
                        ? "bg-primary"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Ir para depoimento ${index + 1}`}
                    title={`Ir para depoimento ${index + 1}`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full ${
                        currentSlide === index ? "bg-white" : "bg-gray-600"
                      }`}
                    ></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <p className="text-lg text-gray-600 mb-6">
                Junte-se a mais de 500 lojistas parceiros de sucesso
              </p>
              <a
                href="#cadastro-lojistas"
                className="inline-block bg-primary hover:bg-red-600 text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors duration-300"
              >
                Quero Ser o Próximo Parceiro de Sucesso
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* História da Marca Ecko - Líder em Streetwear - Otimizado para mobile */}
      <section className="py-12 sm:py-20 md:py-32 bg-white" id="sobre-ecko">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                    História da Marca
                    <span className="block text-primary">Ecko</span>
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed">
                    Há mais de duas décadas, a Ecko é líder absoluta em
                    streetwear e moda urbana no Brasil. Nascida da cultura de
                    rua, a marca revolucionou o mercado de moda jovem
                    brasileira.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                    Com produtos autênticos que refletem a essência do street
                    style brasileiro, a Ecko conquistou milhões de consumidores
                    e se estabeleceu como a maior marca de streetwear do país.
                    Nossos lojistas parceiros fazem parte dessa trajet��ria de
                    sucesso.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      20+
                    </div>
                    <div className="text-gray-900/80 text-sm">
                      Anos de Mercado
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      500+
                    </div>
                    <div className="text-gray-900/80 text-sm">
                      Lojistas Parceiros
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      1M+
                    </div>
                    <div className="text-gray-900/80 text-sm">
                      Clientes Satisfeitos
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      #1
                    </div>
                    <div className="text-gray-900/80 text-sm">
                      Marca de Streetwear
                    </div>
                  </div>
                </div>
              </div>

              {/* Imagem da Marca */}
              <div className="text-center lg:text-right">
                <div className="inline-block">
                  <img
                    src="/images/brand/brand-story.webp"
                    alt="Ecko Streetwear - Autenticidade da Marca"
                    className="w-full max-w-md rounded-xl shadow-2xl"
                    loading="lazy"
                  />
                  <div className="mt-8 space-y-4">
                    <p className="text-gray-900/60 text-sm italic">
                      "Autenticidade que conecta com a rua"
                    </p>
                    <div className="w-16 h-0.5 bg-primary mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Accessible Version with Proper Contrast */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              {/* Brand Section */}
              <div className="space-y-6 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-3">
                  <img
                    src="/images/brand/ecko-logo.webp"
                    alt="Logo Ecko - Marca de Streetwear"
                    className="h-12 w-auto"
                    loading="lazy"
                  />
                  <span className="text-2xl font-bold text-white">Ecko</span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  A maior marca de streetwear do Brasil. Conectando a cultura
                  urbana através da moda autêntica.
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://www.facebook.com/ecko"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                    aria-label="Siga a Ecko no Facebook - Abre em nova aba"
                    title="Siga a Ecko no Facebook"
                  >
                    <FaFacebook className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="https://www.instagram.com/ecko"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                    aria-label="Siga a Ecko no Instagram - Abre em nova aba"
                    title="Siga a Ecko no Instagram"
                  >
                    <FaInstagram className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                    aria-label="Entre em contato via WhatsApp - Abre em nova aba"
                    title="Entre em contato via WhatsApp"
                  >
                    <FaStore className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-gray-300 text-sm">
                  © 2024 Ecko. Todos os direitos reservados.
                </div>
                <div className="flex space-x-6 text-sm">
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Política de Privacidade
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Termos de Uso
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Política de Cookies
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
