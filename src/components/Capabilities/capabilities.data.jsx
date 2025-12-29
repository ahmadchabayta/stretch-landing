import {
  AudienceRetargetingIcon,
  EnrichmentIcon,
  RetargetingIcon,
  OfflineAttributionIcon,
} from "./Icons";

export const capability_url_links = [
  "cross-channel-audience-matching",
  "audience-data-enrichment",
  "audience-retargeting",
  "offline-attribution",
];

export const capability_data = {
  languages: {
    en: {
      title: "CAPABILITIES OVERVIEW",
      subtitle: "Stretch powers four",
      subtitle_highlighted: "core capabilities",
      button_label: "Book a Demo",
      cards: [
        {
          id: "cross-channel",
          title: "Cross-Channel Audience Match",
        },
        {
          id: "enrichment",
          title: "Audience Data Enrichment",
        },
        {
          id: "retargeting",
          title: "Audience Retargeting",
        },
        {
          id: "attribution",
          title: "Offline Attribution",
        },
      ],
    },
    ar: {
      title: "نظرة عامة على القدرات",
      subtitle: "Stretch تقدم أربع",
      subtitle_highlighted: "قدرات أساسية",
      button_label: "احجز عرضًا تجريبيًا",
      cards: [
        {
          id: "cross-channel",
          title: "مطابقة الجمهور عبر القنوات",
        },
        {
          id: "enrichment",
          title: "إثراء بيانات الجمهور",
        },
        {
          id: "retargeting",
          title: "إعادة استهداف الجمهور",
        },
        {
          id: "attribution",
          title: "نسب غير متصل بالإنترنت",
        },
      ],
    },
  },
  cards: [
    {
      id: "cross-channel",
      icon: AudienceRetargetingIcon,
      sizeClassName: "object-contain w-[81px] h-[55px] lg:w-[155px] lg:h-[105px]",
      active: true,
    },
    {
      id: "enrichment",
      icon: EnrichmentIcon,
      sizeClassName: "object-contain w-[52.495px] h-[55.119px] lg:w-[100px] lg:h-[105px]",
      active: false,
    },
    {
      id: "retargeting",
      icon: RetargetingIcon,
      sizeClassName: "object-contain w-[41px] h-[58px] lg:w-[130px] lg:h-[105px]",
      active: false,
    },
    {
      id: "attribution",
      icon: OfflineAttributionIcon,
      sizeClassName: "object-contain w-[40.946px] h-[58.269px] lg:w-[78px] lg:h-[111px]",
      active: false,
    },
  ],
};
