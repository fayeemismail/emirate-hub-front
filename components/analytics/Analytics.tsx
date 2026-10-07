import { GoogleTagManager } from "@next/third-parties/google";
import { GlobalSeoData } from "@/types/seo";

interface AnalyticsProps {
  seoData?: GlobalSeoData | null;
}

export default function Analytics({ seoData }: AnalyticsProps) {
  if (!seoData) return null;

  const { gtmEnabled, gtmContainerId, gaMeasurementId } = seoData;

  // Validate GTM ID format (e.g. GTM-XXXXXXX)
  const isValidGtmId =
    Boolean(gtmEnabled) &&
    typeof gtmContainerId === "string" &&
    /^GTM-[A-Z0-9]+$/i.test(gtmContainerId.trim());

  if (!isValidGtmId || !gtmContainerId) {
    return null;
  }

  const cleanGtmId = gtmContainerId.trim();
  const cleanGaId = gaMeasurementId?.trim();

  // Supply dataLayer configuration with GA4 ID accessible to GTM tags and variables
  const dataLayerPayload = cleanGaId
    ? {
        ga_measurement_id: cleanGaId,
        site_name: seoData.siteName || "Emirate Hub",
      }
    : undefined;

  return (
    <GoogleTagManager
      gtmId={cleanGtmId}
      dataLayer={dataLayerPayload}
    />
  );
}
