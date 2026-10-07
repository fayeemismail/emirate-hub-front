import { GlobalSeoData } from "@/types/seo";

interface AnalyticsProps {
  seoData?: GlobalSeoData | null;
}

function getGtmConfig(seoData?: GlobalSeoData | null) {
  if (!seoData) return null;

  const isEnabled = seoData.gtmEnabled !== false;
  const rawGtmId =
    typeof seoData.gtmContainerId === "string" ? seoData.gtmContainerId.trim() : "";

  if (!isEnabled || !rawGtmId) {
    return null;
  }

  const cleanGtmId = rawGtmId.toUpperCase().startsWith("GTM-")
    ? rawGtmId.toUpperCase()
    : `GTM-${rawGtmId.toUpperCase()}`;

  if (!/^GTM-[A-Z0-9]+$/i.test(cleanGtmId)) {
    return null;
  }

  const cleanGaId =
    typeof seoData.gaMeasurementId === "string"
      ? seoData.gaMeasurementId.trim()
      : "";

  return { cleanGtmId, cleanGaId };
}

/**
 * Standard Google Tag Manager script placed in <head>.
 * Matches Google's exact snippet structure so Google Tag Assistant and Google tag scanners detect it immediately.
 */
export function AnalyticsHead({ seoData }: AnalyticsProps) {
  const config = getGtmConfig(seoData);
  if (!config) return null;

  const { cleanGtmId, cleanGaId } = config;

  const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'${
    cleanGaId ? `,'ga_measurement_id':'${cleanGaId}'` : ""
  }});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${cleanGtmId}');`;

  return (
    <script
      id="google-tag-manager"
      dangerouslySetInnerHTML={{ __html: gtmScript }}
    />
  );
}

/**
 * Standard Google Tag Manager (noscript) iframe placed immediately after the opening <body> tag.
 */
export function AnalyticsBody({ seoData }: AnalyticsProps) {
  const config = getGtmConfig(seoData);
  if (!config) return null;

  const { cleanGtmId } = config;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${cleanGtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}

/**
 * Default compound component supporting unified or separated usage.
 */
export default function Analytics({ seoData }: AnalyticsProps) {
  return (
    <>
      <AnalyticsHead seoData={seoData} />
      <AnalyticsBody seoData={seoData} />
    </>
  );
}
