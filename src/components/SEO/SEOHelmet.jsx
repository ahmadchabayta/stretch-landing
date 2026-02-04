// eslint-disable-next-line import/namespace
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../../context/LanguageContext";

const SEO_DATA = {
  en: {
    title: "Stretch | Cross-Channel Attribution, Audience Matching & Offline Measurement",
    description:
      "Unify fragmented media data with Stretch. Match audiences across Meta, TikTok, DV360 & more, eliminate duplication, retarget smarter, and prove real impact with offline attribution.",
  },
  ar: {
    title: "ستريتش | الإسناد عبر القنوات، مطابقة الجماهير وقياس الأداء خارج الإنترنت",
    description:
      "وحّد بيانات الوسائط المتفرقة باستخدام ستريتش. طابق الجماهير عبر Meta وTikTok وDV360 وغيرها، أزل التكرار، أعد الاستهداف بذكاء، وأثبت الأثر الحقيقي من خلال الإسناد خارج الإنترنت.",
  },
};

export const SEOHelmet = () => {
  const { language } = useLanguage();
  const seo = SEO_DATA[language];

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="twitter:title" content={seo.title} />
      <meta property="twitter:description" content={seo.description} />
    </Helmet>
  );
};
