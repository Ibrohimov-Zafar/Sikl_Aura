export type Language = 'uz' | 'ru' | 'en';

export interface Translations {
  navbar: {
    links: {
      products: string;
      about: string;
      reviews: string;
      faq: string;
      contact: string;
    };
    orderCta: string;
    callCta: string;
    subLogo: string;
    callNow: string;
    getConsultation: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    nextSection: string;
    consultationTitle: string;
    consultationRole: string;
    consultationCta: string;
  };
  sectionTwo: {
    titleLine1: string;
    titleLine2: string;
    description: string;
    catalogCta: string;
    deliveryCta: string;
    collectionCta: string;
    capabilities: Array<{
      id: string;
      title: string;
      body: string;
    }>;
  };
  materials: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    bannerTag: string;
    bannerTitle: string;
    bannerBody: string;
    bannerStats: Array<{
      value: string;
      label: string;
    }>;
    viewCollectionCta: string;
    pillars: Array<{
      step: string;
      title: string;
      desc: string;
    }>;
  };
  assortment: {
    badge: string;
    title: string;
    description: string;
    rawTitle: string;
    rawDescription: string;
    orderCta: string;
    items: Array<{
      id: string;
      title: string;
      desc: string;
      tag: string;
      badge: string;
    }>;
    rawMaterials: Array<{
      id: string;
      title: string;
      desc: string;
      spec: string;
    }>;
  };
  collection: {
    badge: string;
    title: string;
    filterAll: string;
    filterBedding: string;
    filterGifts: string;
    atelierTag: string;
    orderCta: string;
    products: Array<{
      id: string;
      name: string;
      category: 'bedding' | 'gifts';
      tag: string;
      description: string;
      features: string[];
    }>;
  };
  reviews: {
    badge: string;
    title: string;
    description: string;
    items: Array<{
      id: string;
      name: string;
      city: string;
      role: string;
      rating: number;
      quote: string;
      product: string;
    }>;
  };
  faq: {
    badge: string;
    title: string;
    description: string;
    items: Array<{
      id: number;
      question: string;
      answer: string;
    }>;
  };
  footer: {
    brandDesc: string;
    organicBadge: string;
    sectionsTitle: string;
    catalogLink: string;
    aboutLink: string;
    reviewsLink: string;
    faqLink: string;
    personalOrderCta: string;
    contactTitle: string;
    showroomLabel: string;
    showroomAddress: string;
    factoryLabel: string;
    socialTitle: string;
    socialDesc: string;
    telegramCta: string;
    rights: string;
    handmadeTag: string;
  };
  orderModal: {
    tag: string;
    defaultTitle: string;
    subtitle: string;
    successTitle: string;
    successDescPrefix: string;
    successDescSuffix: string;
    closeBtn: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    productLabel: string;
    deliveryNotice: string;
    submitCta: string;
    clientFallback: string;
  };
}
