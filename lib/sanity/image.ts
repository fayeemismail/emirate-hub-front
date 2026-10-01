import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityConfig } from "./config";

// Type-agnostic Sanity image source
type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0];

const imageBuilder = createImageUrlBuilder({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
});

export function urlForImage(source: SanityImageSource) {
  if (!source) return "";
  return imageBuilder.image(source).auto("format").fit("max").url();
}
