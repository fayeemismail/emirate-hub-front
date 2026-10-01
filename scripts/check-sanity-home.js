const https = require('https');

const projectId = 'yqweaq94';
const dataset = 'production';
const apiVersion = '2024-03-01';

const queries = {
  hero: `*[_type == "emirateHomeHero"][0]{
    ...,
    "backgroundImageUrl": backgroundImage.asset->url,
    "backgroundImagesUrls": backgroundImages[].asset->url
  }`,
  pricing: `*[_type == "emirateHomePricing"][0]`,
  services: `*[_type == "emirateHomeServices"][0]{
    ...,
    services[]{
      ...,
      "imageUrl": image.asset->url
    }
  }`,
  testimonials: `*[_type == "emirateHomeTestimonials"][0]{
    ...,
    testimonials[]{
      ...,
      "imageUrl": image.asset->url
    }
  }`,
  faq: `*[_type == "emirateHomeFaq"][0]{
    ...,
    "imageUrl": image.asset->url
  }`,
  blog: `*[_type == "emirateHomeBlogSection"][0]{
    ...,
    blogs[]{
      ...,
      "imageUrl": image.asset->url
    }
  }`,
  contact: `*[_type == "emirateHomeContact"][0]{
    ...,
    "advisorImageUrl": advisorImage.asset->url
  }`
};

async function fetchSanity(groq) {
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(groq)}`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.result);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('=== CHECKING SANITY DATA FOR HOME PAGE ===');
  for (const [key, groq] of Object.entries(queries)) {
    const res = await fetchSanity(groq);
    console.log(`\n--- [${key.toUpperCase()}] ---`);
    if (!res) {
      console.log('No document found (null)');
    } else {
      console.log('Document ID:', res._id);
      console.log('Active:', res.active);
      if (key === 'hero') {
        console.log('Hero heading:', res.heading);
        console.log('Hero buttonBg:', res.buttonBackgroundColor, 'buttonText:', res.buttonTextColor);
        console.log('Hero button label:', res.buttonText);
      }
      if (key === 'pricing') {
        console.log('Pricing title:', res.title, res.highlightedTitle);
        console.log('Pricing cards count:', res.cards?.length);
        if (res.cards) {
          res.cards.forEach((c, idx) => {
            console.log(`Card ${idx+1} [${c.title}]: isPopular = ${c.isPopular}, badge = "${c.badge}", icon = "${c.icon}", cardBg = "${c.cardBackgroundColor}", cardTitleColor = "${c.cardTitleColor}", cardTextColor = "${c.cardTextColor}", price = "${c.price}", buttonBg = "${c.buttonBackgroundColor}", buttonTextColor = "${c.buttonTextColor}"`);
          });
        }
      }
      if (key === 'services') {
        console.log('Services count:', res.services?.length);
        if (res.services) {
          res.services.forEach((s, idx) => {
            console.log(`Service ${idx+1}: [${s.title}] image = ${s.imageUrl}`);
          });
        }
      }
      if (key === 'testimonials') {
        console.log('Testimonials count:', res.testimonials?.length);
      }
      if (key === 'faq') {
        console.log('FAQ items count:', res.faqs?.length);
      }
      if (key === 'blog') {
        console.log('Blogs count:', res.blogs?.length);
      }
      if (key === 'contact') {
        console.log('Contact formTitle:', res.formTitle, 'advisorStatus:', res.advisorStatusText);
      }
    }
  }
}

run();
