const fs = require('fs');
const path = require('path');

function h(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function copyBtn(val) {
  if (val === null || val === undefined || val === '') return '';
  const escapedAttr = h(String(val));
  return `<button class="copy-btn" onclick="copyText(this)" data-copy="${escapedAttr}" title="Copy to clipboard">Copy</button>`;
}

function tr(fieldName, label, type, value, instructions) {
  const isColor = type === 'hexColor' || (typeof value === 'string' && value.startsWith('#') && (value.length === 7 || value.length === 4));
  let valDisplay = '';
  
  if (isColor) {
    valDisplay = `<div class="color-cell">
      <span class="color-swatch" style="background-color: ${h(value)};"></span>
      <code class="val-code">${h(value)}</code>
      ${copyBtn(value)}
    </div>`;
  } else if (typeof value === 'boolean') {
    valDisplay = `<div class="val-cell"><span class="badge-bool ${value ? 'bool-true' : 'bool-false'}">${value ? 'true (ON)' : 'false (OFF)'}</span> ${copyBtn(value)}</div>`;
  } else if (Array.isArray(value)) {
    valDisplay = `<div class="val-cell"><span class="val-array">${value.map((v) => `<span class="array-item"><code>${h(v)}</code>${copyBtn(v)}</span>`).join('')}</span></div>`;
  } else {
    valDisplay = `<div class="val-cell">
      <span class="val-text">${h(value)}</span>
      ${copyBtn(value)}
    </div>`;
  }

  return `<tr>
    <td class="col-name"><div class="code-copy"><code>${h(fieldName)}</code>${copyBtn(fieldName)}</div></td>
    <td class="col-meta"><span class="field-label">${h(label)}</span><span class="badge-type">${h(type)}</span></td>
    <td class="col-val">${valDisplay}</td>
    <td class="col-notes">${h(instructions || '')}</td>
  </tr>`;
}

function sectionCard(id, title, docType, deskLocation, sourceFile, rowsHtml, extraContentHtml = '') {
  return `
  <section class="doc-card" id="${id}">
    <div class="doc-header">
      <div class="doc-title-row">
        <h2 class="doc-title">${h(title)}</h2>
        <span class="doc-type-badge"><code>${h(docType)}</code> ${copyBtn(docType)}</span>
      </div>
      <div class="doc-meta-row">
        <span class="meta-item"><span class="meta-icon">📁</span> <strong>Desk Location:</strong> ${h(deskLocation)}</span>
        <span class="meta-item"><span class="meta-icon">📄</span> <strong>Source:</strong> <code>${h(sourceFile)}</code></span>
      </div>
    </div>
    <div class="table-responsive">
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 22%;">Field Key</th>
            <th style="width: 22%;">Label &amp; Type</th>
            <th style="width: 36%;">Exact Value to Enter in Sanity</th>
            <th style="width: 20%;">Instructions</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
    ${extraContentHtml}
  </section>`;
}

function subItemCard(itemTitle, rowsHtml) {
  return `
  <div class="sub-item-card">
    <div class="sub-item-header">
      <h4>${h(itemTitle)}</h4>
    </div>
    <div class="table-responsive">
      <table class="data-table sub-table">
        <thead>
          <tr>
            <th style="width: 22%;">Sub-Field</th>
            <th style="width: 22%;">Label &amp; Type</th>
            <th style="width: 36%;">Value to Enter</th>
            <th style="width: 20%;">Instructions</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  </div>`;
}

// ==================== 1. HOME HERO ====================
const homeHeroRows = [
  tr('active', 'Section Active', 'boolean', true, 'Toggle Switch ON'),
  tr('backgroundColor', 'Section Background Color', 'hexColor', '#000000', 'Enter HEX #000000 (Hero panorama dark backdrop)'),
  tr('headingColor', 'Heading Text Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (text-white)'),
  tr('highlightColor', 'Highlight Accent Color', 'hexColor', '#E02126', 'Enter HEX #E02126 (Brand Red text-[#E02126])'),
  tr('subheadingColor', 'Subheading Text Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (text-white/90)'),
  tr('descriptionColor', 'Description Text Color', 'hexColor', '#D1D5DB', 'Enter HEX #D1D5DB (text-white/75)'),
  tr('buttonBackgroundColor', 'CTA Button Background Color', 'hexColor', '#07172E', 'Background color of the hero CTA button (Enter HEX #07172E)'),
  tr('buttonTextColor', 'CTA Button Text Color', 'hexColor', '#FFFFFF', 'Text color of the hero CTA button (Enter HEX #FFFFFF)'),
  tr('backgroundImage', 'Primary Panorama Image', 'image', 'emirate-front/public/images/hero-panorama.jpg', 'Upload local image file'),
  tr('backgroundImages', 'Additional Panorama Loop Stills', 'array of images', ['hero-panorama.jpg', 'hero-panorama-marina.jpg', 'hero-panorama-abudhabi.jpg', 'hero-panorama-creek.jpg'], 'Upload 4 stills in order from emirate-front/public/images/'),
  tr('heading.prefix', 'Heading Prefix', 'string', 'Your', 'Enter text'),
  tr('heading.boldKeyword', 'Bold Keyword', 'string', 'Search', 'Enter text (font-extrabold italic text-white)'),
  tr('heading.middle', 'Middle Text', 'string', 'for the right', 'Enter text'),
  tr('heading.highlightedText', 'Highlighted Text', 'string', 'UAE business license', 'Enter text (rendered in highlightColor #E02126)'),
  tr('heading.suffix', 'Heading Suffix', 'string', ' ends here.', 'Enter text with leading space'),
  tr('subheading', 'Subheading', 'string', 'Get the most cost-effective mainland or free zone setup with a partner you can trust.', 'Enter text'),
  tr('description', 'Hero Description', 'text', 'We deliver comprehensive, end-to-end solutions spanning business setup, licensing, visa processing, compliance, and corporate service equipping you to establish, expand, and maintain a thriving business in the UAE.', 'Paste paragraph text'),
  tr('buttonText', 'CTA Button Text', 'string', 'REQUEST INFORMATION', 'Button label'),
  tr('buttonHref', 'CTA Button URL', 'string', '/#contact-us', 'Enter URL anchor')
].join('\n');

const homeHeroSection = sectionCard(
  'home-hero',
  '1.1 Home: Hero Section',
  'emirateHomeHero',
  '🌐 Emirate Hub Public Website > Home Page Sections > Hero Panorama Section',
  'emirate-front/data/home/hero.json & components/home/Hero.tsx',
  homeHeroRows
);

// ==================== 1.2 HOME PRICING ====================
// EXACT CODE: <section className="py-16 md:py-24 bg-[#F8F6FB] overflow-hidden">
const homePricingRows = [
  tr('active', 'Section Active', 'boolean', true, 'Toggle Switch ON'),
  tr('backgroundColor', 'Section Background Color', 'hexColor', '#F8F6FB', 'Enter HEX #F8F6FB (Exact code: bg-[#F8F6FB])'),
  tr('titleColor', 'Section Title Color', 'hexColor', '#111827', 'Enter HEX #111827 (Exact code: text-gray-900)'),
  tr('highlightColor', 'Highlighted Title Color', 'hexColor', '#E02126', 'Enter HEX #E02126 (Exact code: text-primary #E02126)'),
  tr('descriptionColor', 'Description Text Color', 'hexColor', '#6B7280', 'Enter HEX #6B7280 (Exact code: text-gray-500)'),
  tr('highlightedCardColor', 'Featured Card Background', 'hexColor', '#E02126', 'Enter HEX #E02126 (Exact code: bg-primary for featured card)'),
  tr('highlightedCardTextColor', 'Featured Card Text Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (Exact code: text-white on popular card)'),
  tr('badge', 'Section Badge', 'string', 'PRICING PACKAGES', 'Enter badge string (text-gray-400 uppercase tracking-[0.25em])'),
  tr('title', 'Section Title', 'string', 'Transparent Pricing for', 'Enter title text'),
  tr('highlightedTitle', 'Highlighted Title', 'string', 'Your Success', 'Enter highlighted keyword'),
  tr('description', 'Description', 'text', 'Choose the ideal license package designed to fast-track your business setup in Dubai and across the UAE with zero hidden costs.', 'Paste paragraph text')
].join('\n');

const pricingCard1Rows = [
  tr('badge', 'Card Badge', 'string', 'FAST SETUP', 'Badge label on card top'),
  tr('isPopular', 'Highlighted / Popular', 'boolean', false, 'Toggle OFF (Standard white card)'),
  tr('cardBackgroundColor', 'Card Background Override', 'hexColor', '#FFFFFF', 'Card surface color (Exact code: bg-white)'),
  tr('cardTitleColor', 'Card Title Color Override', 'hexColor', '#111827', 'Package heading color (Exact code: text-gray-900)'),
  tr('cardTextColor', 'Card Body Text Color Override', 'hexColor', '#6B7280', 'Features, tagline, and details color (text-gray-500 / text-gray-700)'),
  tr('featuresTextColor', 'Features List Text Color', 'hexColor', '#374151', 'Checklist items text color (Exact code: text-gray-700)'),
  tr('priceColor', 'Price Color Override', 'hexColor', '#111827', 'Amount and currency color (text-gray-900)'),
  tr('buttonBackgroundColor', 'Button Background Color', 'hexColor', '#FFFFFF', 'Button background color (white outline)'),
  tr('buttonTextColor', 'Button Text Color', 'hexColor', '#111827', 'Button text color (text-secondary #111827)'),
  tr('buttonBorderColor', 'Button Border Color', 'hexColor', '#111827', 'Button outline border color'),
  tr('icon', 'Card Icon Identifier', 'string', 'briefcase', 'Lucide icon name (LuBriefcaseBusiness)'),
  tr('title', 'Package Title', 'string', 'Business License', 'Package headline'),
  tr('tagline', 'Tagline', 'string', 'Launch your business in the UAE with ease', 'Subtitle under title'),
  tr('startingAt', 'Starting At Label', 'string', 'Starting at', 'Prefix before price'),
  tr('currency', 'Currency', 'string', 'AED', 'Currency symbol'),
  tr('price', 'Price Amount', 'string', '3,999', 'Formatted price text'),
  tr('featuresHeading', 'Features Heading', 'string', 'What\'s Included:', 'Label above check-list'),
  tr('features', 'Included Features List', 'array of strings', ['100% Foreign Ownership', '10 Business Activities', 'Fast Processing', 'Bank Account Opening Assistance'], 'Add 4 items in order'),
  tr('buttonText', 'Button Text', 'string', 'ENQUIRE NOW', 'Button CTA'),
  tr('buttonHref', 'Button URL', 'string', '/#contact-us', 'Target anchor')
].join('\n');

const pricingCard2Rows = [
  tr('badge', 'Card Badge', 'string', 'MOST POPULAR', 'Badge label on card top (bg-white text-primary sparkles tag)'),
  tr('isPopular', 'Highlighted / Popular', 'boolean', true, 'MUST BE TOGGLED ON! Enables featured floating MOST POPULAR sparkles badge, white typography, and white CTA button. (If OFF, text appears dark on red)'),
  tr('cardBackgroundColor', 'Card Background Override', 'hexColor', '#E02126', 'Card surface color (Exact code: bg-primary #E02126)'),
  tr('cardTitleColor', 'Card Title Color Override', 'hexColor', '#FFFFFF', 'Text color on red background (Exact code: text-white)'),
  tr('cardTextColor', 'Card Body Text Color Override', 'hexColor', '#FFFFFF', 'Tagline and body color on red background (Exact code: text-white / text-white/85)'),
  tr('featuresTextColor', 'Features List Text Color', 'hexColor', '#FFFFFF', 'Checklist items text color on red background (Exact code: text-white)'),
  tr('priceColor', 'Price Color Override', 'hexColor', '#FFFFFF', 'Price amount color on red background (Exact code: text-white)'),
  tr('buttonBackgroundColor', 'Button Background Color', 'hexColor', '#FFFFFF', 'Featured button solid background (Exact code: bg-white)'),
  tr('buttonTextColor', 'Button Text Color', 'hexColor', '#E02126', 'Featured button text color (Exact code: text-primary #E02126)'),
  tr('buttonBorderColor', 'Button Border Color', 'hexColor', '#000000', 'Featured button border outline (Exact code: border-black)'),
  tr('icon', 'Card Icon Identifier', 'string', 'building', 'Lucide icon name (LuBuilding2)'),
  tr('title', 'Package Title', 'string', 'Dubai Mainland License', 'Package headline'),
  tr('tagline', 'Tagline', 'string', 'Direct access to UAE local & global markets', 'Subtitle under title'),
  tr('startingAt', 'Starting At Label', 'string', 'Starting at', 'Prefix before price'),
  tr('currency', 'Currency', 'string', 'AED', 'Currency symbol'),
  tr('price', 'Price Amount', 'string', '15,000', 'Formatted price text'),
  tr('featuresHeading', 'Features Heading', 'string', 'What\'s Included:', 'Label above check-list'),
  tr('features', 'Included Features List', 'array of strings', ['Trade Anywhere in the UAE & Worldwide', 'No Minimum Paid-Up Capital Required', 'Dedicated Corporate Banking Support', 'Unlimited Employment Visa Quotas'], 'Add 4 items in order'),
  tr('buttonText', 'Button Text', 'string', 'ENQUIRE NOW', 'Button CTA'),
  tr('buttonHref', 'Button URL', 'string', '/#contact-us', 'Target anchor')
].join('\n');

const pricingCard3Rows = [
  tr('badge', 'Card Badge', 'string', 'BEST VALUE', 'Badge label on card top'),
  tr('isPopular', 'Highlighted / Popular', 'boolean', false, 'Toggle OFF (Standard white card)'),
  tr('cardBackgroundColor', 'Card Background Override', 'hexColor', '#FFFFFF', 'Card surface color (Exact code: bg-white)'),
  tr('cardTitleColor', 'Card Title Color Override', 'hexColor', '#111827', 'Package heading color (Exact code: text-gray-900)'),
  tr('cardTextColor', 'Card Body Text Color Override', 'hexColor', '#6B7280', 'Features, tagline, and details color (text-gray-500 / text-gray-700)'),
  tr('featuresTextColor', 'Features List Text Color', 'hexColor', '#374151', 'Checklist items text color (Exact code: text-gray-700)'),
  tr('priceColor', 'Price Color Override', 'hexColor', '#111827', 'Amount and currency color (text-gray-900)'),
  tr('buttonBackgroundColor', 'Button Background Color', 'hexColor', '#FFFFFF', 'Button background color (white outline)'),
  tr('buttonTextColor', 'Button Text Color', 'hexColor', '#111827', 'Button text color (text-secondary #111827)'),
  tr('buttonBorderColor', 'Button Border Color', 'hexColor', '#111827', 'Button outline border color'),
  tr('icon', 'Card Icon Identifier', 'string', 'badge-check', 'Lucide icon name (LuBadgeCheck) — Exact: badge-check (NO trailing space!)'),
  tr('title', 'Package Title', 'string', 'Freezone & Lifetime Visa', 'Package headline'),
  tr('tagline', 'Tagline', 'string', 'All-in-one package with residency', 'Subtitle under title'),
  tr('startingAt', 'Starting At Label', 'string', 'Starting at', 'Prefix before price'),
  tr('currency', 'Currency', 'string', 'AED', 'Currency symbol'),
  tr('price', 'Price Amount', 'string', '8,888', 'Formatted price text'),
  tr('featuresHeading', 'Features Heading', 'string', 'What\'s Included:', 'Label above check-list'),
  tr('features', 'Included Features List', 'array of strings', ['Business license', 'Residency visa', '100% Capital & Profit Repatriation', 'Fast-Track Emirates ID & Medicals'], 'Add 4 items in order'),
  tr('buttonText', 'Button Text', 'string', 'ENQUIRE NOW', 'Button CTA'),
  tr('buttonHref', 'Button URL', 'string', '/#contact-us', 'Target anchor')
].join('\n');

const homePricingSection = sectionCard(
  'home-pricing',
  '1.2 Home: Pricing Packages',
  'emirateHomePricing',
  '🌐 Emirate Hub Public Website > Home Page Sections > Pricing Packages',
  'emirate-front/data/home/pricing.json & components/home/PriceCards.tsx',
  homePricingRows,
  `<div class="sub-items-container">
    <h3>Pricing Cards Array (<code>cards</code>)</h3>
    ${subItemCard('Pricing Card 1: Business License', pricingCard1Rows)}
    ${subItemCard('Pricing Card 2: Dubai Mainland License (Featured)', pricingCard2Rows)}
    ${subItemCard('Pricing Card 3: Freezone & Lifetime Visa', pricingCard3Rows)}
  </div>`
);

// ==================== 1.3 HOME SERVICES ====================
// EXACT CODE: <section className="py-16 md:py-24 lg:py-28 bg-[#F2F3EE]/50 overflow-hidden">
const homeServicesRows = [
  tr('active', 'Section Active', 'boolean', true, 'Toggle Switch ON'),
  tr('backgroundColor', 'Section Background Color', 'hexColor', '#F2F3EE', 'Enter HEX #F2F3EE (Exact code: bg-[#F2F3EE]/50)'),
  tr('titleColor', 'Title Text Color', 'hexColor', '#111827', 'Enter HEX #111827 (Exact code: text-gray-900)'),
  tr('highlightColor', 'Highlight Keyword Color', 'hexColor', '#E02126', 'Enter HEX #E02126 (Exact code: text-primary #E02126)'),
  tr('descriptionColor', 'Description Text Color', 'hexColor', '#6B7280', 'Enter HEX #6B7280 (Exact code: text-gray-500)'),
  tr('badge', 'Badge Label', 'string', 'SERVICES', 'Enter badge string (text-gray-400 uppercase tracking-[0.25em])'),
  tr('titlePrefix', 'Title Prefix', 'string', 'What ', 'Enter text with trailing space'),
  tr('highlightedTitle', 'Highlighted Title', 'string', 'Emirate Hub', 'Enter highlighted name (in red)'),
  tr('titleSuffix', 'Title Suffix', 'string', ' can do for you', 'Enter text with leading space'),
  tr('description', 'Description', 'text', 'Emirate Hub provides premium standards of business setup solutions for SMEs through our wide network of Professional Partners and Business Communities.', 'Paste description text'),
  tr('viewAllButtonText', 'View All Button Text', 'string', 'VIEW ALL SERVICES', 'Button text (border border-primary text-primary)'),
  tr('viewAllButtonHref', 'View All Button URL', 'string', '/services', 'Target URL')
].join('\n');

const serviceCard1Rows = [
  tr('slug', 'Service Slug', 'string', 'business-incorporation', 'Slug identifier'),
  tr('number', 'Index Number', 'string', '01', 'Card number label (text-primary #E02126)'),
  tr('tag', 'Service Category Tag', 'string', 'COMPANY FORMATION', 'Category badge text (text-gray-400)'),
  tr('title', 'Service Title', 'string', 'Business Incorporation', 'Card title text (text-gray-900)'),
  tr('cardBackgroundColor', 'Card Background Override', 'hexColor', '#18181B', 'Card background color (defaults to #18181B dark surface)'),
  tr('cardTagColor', 'Card Tag Color Override', 'hexColor', '#E02126', 'Category tag color (defaults to #E02126)'),
  tr('cardTitleColor', 'Card Title Color Override', 'hexColor', '#111827', 'Heading color on card (Exact code: text-gray-900)'),
  tr('cardTextColor', 'Card Text Color Override', 'hexColor', '#4B5563', 'Body text color on card (Exact code: text-gray-600)'),
  tr('image', 'Featured Image', 'image', 'emirate-front/public/images/service-2.jpg', 'Upload local image'),
  tr('description', 'Card Summary', 'text', 'We have streamlined the complexities of incorporating a company in Dubai so entrepreneurs and businesses can quickly establish their presence. From initial name reservation to final trade license issuance, our specialists deliver seamless guidance.', 'Paste card text'),
  tr('buttonText', 'Button CTA Text', 'string', 'LEARN MORE', 'Button label (text-primary)'),
  tr('active', 'Card Visibility', 'boolean', true, 'Toggle ON')
].join('\n');

const serviceCard2Rows = [
  tr('slug', 'Service Slug', 'string', 'visa-services', 'Slug identifier'),
  tr('number', 'Index Number', 'string', '02', 'Card number label (text-primary #E02126)'),
  tr('tag', 'Service Category Tag', 'string', 'VISA & IMMIGRATION', 'Category badge text (text-gray-400)'),
  tr('title', 'Service Title', 'string', 'Visa Services', 'Card title text (text-gray-900)'),
  tr('cardBackgroundColor', 'Card Background Override', 'hexColor', '#18181B', 'Card background color (defaults to #18181B dark surface)'),
  tr('cardTagColor', 'Card Tag Color Override', 'hexColor', '#E02126', 'Category tag color (defaults to #E02126)'),
  tr('cardTitleColor', 'Card Title Color Override', 'hexColor', '#111827', 'Heading color on card (Exact code: text-gray-900)'),
  tr('cardTextColor', 'Card Text Color Override', 'hexColor', '#4B5563', 'Body text color on card (Exact code: text-gray-600)'),
  tr('image', 'Featured Image', 'image', 'emirate-front/public/images/service-1.jpg', 'Upload local image'),
  tr('description', 'Card Summary', 'text', 'We offer end‑to‑end visa and immigration services for companies in UAE mainland and free zones, handling employment visas, family sponsorship, visit visas, Emirates ID, medical coordination and establishment card renewals. Our team manages all government liaison with GDRFA, ICP, MOHRE and free zone authorities, from document preparation and application submission to status tracking and final delivery, ensuring compliance, timely processing and minimal disruption to your business.', 'Paste card text'),
  tr('buttonText', 'Button CTA Text', 'string', 'LEARN MORE', 'Button label (text-primary)'),
  tr('active', 'Card Visibility', 'boolean', true, 'Toggle ON')
].join('\n');

const serviceCard3Rows = [
  tr('slug', 'Service Slug', 'string', 'pro-government-liaison', 'Slug identifier'),
  tr('number', 'Index Number', 'string', '03', 'Card number label (text-primary #E02126)'),
  tr('tag', 'Service Category Tag', 'string', 'GOVERNMENT RELATIONS', 'Category badge text (text-gray-400)'),
  tr('title', 'Service Title', 'string', 'PRO & Government Liaison Services', 'Card title text (text-gray-900)'),
  tr('cardBackgroundColor', 'Card Background Override', 'hexColor', '#18181B', 'Card background color (defaults to #18181B dark surface)'),
  tr('cardTagColor', 'Card Tag Color Override', 'hexColor', '#E02126', 'Category tag color (defaults to #E02126)'),
  tr('cardTitleColor', 'Card Title Color Override', 'hexColor', '#111827', 'Heading color on card (Exact code: text-gray-900)'),
  tr('cardTextColor', 'Card Text Color Override', 'hexColor', '#4B5563', 'Body text color on card (Exact code: text-gray-600)'),
  tr('image', 'Featured Image', 'image', 'emirate-front/public/images/service-3.jpg', 'Upload local image'),
  tr('description', 'Card Summary', 'text', 'Dedicated corporate PRO services managing all official documentation and administrative liaison with GDRFA, MOHRE, Dubai Courts, Municipality, and Free Zone authorities with zero delays.', 'Paste card text'),
  tr('buttonText', 'Button CTA Text', 'string', 'LEARN MORE', 'Button label (text-primary)'),
  tr('active', 'Card Visibility', 'boolean', true, 'Toggle ON')
].join('\n');

const homeServicesSection = sectionCard(
  'home-services',
  '1.3 Home: Services Overview',
  'emirateHomeServices',
  '🌐 Emirate Hub Public Website > Home Page Sections > Services Overview',
  'emirate-front/data/home/service.json & components/home/Service.tsx',
  homeServicesRows,
  `<div class="sub-items-container">
    <h3>Featured Services Array (<code>services</code>)</h3>
    ${subItemCard('Featured Service 1: Business Incorporation', serviceCard1Rows)}
    ${subItemCard('Featured Service 2: Visa Services', serviceCard2Rows)}
    ${subItemCard('Featured Service 3: PRO & Government Liaison Services', serviceCard3Rows)}
  </div>`
);

// ==================== 1.4 HOME CONTACT ====================
// EXACT CODE: <section className="py-16 md:py-24 bg-linear-to-b from-[#F8F6FB] via-white to-[#F8F6FB] ...">
const homeContactRows = [
  tr('active', 'Section Active', 'boolean', true, 'Toggle Switch ON'),
  tr('backgroundColor', 'Section Background Color', 'hexColor', '#F8F6FB', 'Enter HEX #F8F6FB (Exact code: bg-[#F8F6FB])'),
  tr('titleColor', 'Title Text Color', 'hexColor', '#111827', 'Enter HEX #111827 (Exact code: text-gray-900)'),
  tr('highlightColor', 'Highlight Title Color', 'hexColor', '#E02126', 'Enter HEX #E02126 (Exact code: text-primary #E02126)'),
  tr('descriptionColor', 'Description Text Color', 'hexColor', '#6B7280', 'Enter HEX #6B7280 (Exact code: text-gray-500)'),
  tr('formBackgroundColor', 'Form Background Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (Exact code: bg-white container)'),
  tr('formTitleColor', 'Form Title Color', 'hexColor', '#111827', 'Enter HEX #111827 (Exact code: text-gray-900)'),
  tr('formTextColor', 'Form Subtitle/Text Color', 'hexColor', '#6B7280', 'Enter HEX #6B7280 (Exact code: text-gray-500)'),
  tr('submitButtonBackgroundColor', 'Submit Button Background', 'hexColor', '#E02126', 'Color of contact form submit button (Enter HEX #E02126)'),
  tr('submitButtonTextColor', 'Submit Button Text Color', 'hexColor', '#FFFFFF', 'Color of submit button text (Enter HEX #FFFFFF)'),
  tr('badge', 'Section Badge', 'string', 'LET\'S TALK BUSINESS', 'Enter badge string (text-gray-400 uppercase tracking-[0.25em])'),
  tr('titlePrefix', 'Title Prefix', 'string', 'Connect With Our ', 'Enter text with trailing space'),
  tr('highlightedTitle', 'Highlighted Title', 'string', 'Experts', 'Enter highlighted word'),
  tr('description', 'Description', 'text', 'Have questions about setting up your company in the UAE? Send us a message and our certified setup advisors will get back to you promptly.', 'Paste description text'),
  tr('formTitle', 'Form Heading', 'string', 'Send Us a Message', 'Form header text'),
  tr('formDescription', 'Form Subtitle', 'string', 'Fill out the form below and our team will get in touch with you shortly.', 'Form subtitle text'),
  tr('advisorImage', 'Advisor Photo', 'image', 'emirate-front/public/images/contact-person.jpg', 'Upload advisor image file'),
  tr('advisorStatusText', 'Advisor Status Badge', 'string', 'Advisors Available Online', 'Status pill text'),
  tr('advisorCalloutText', 'Advisor Callout Message', 'text', 'Get free 1-on-1 personalized advisory tailored to your business goals.', 'Callout copy text'),
  tr('responseTimeText', 'Response Time Badge', 'string', '24h Response', 'Guarantee pill 1'),
  tr('confidentialityText', 'Confidentiality Badge', 'string', '100% Confidential', 'Guarantee pill 2')
].join('\n');

const homeContactSection = sectionCard(
  'home-contact',
  '1.4 Home: Contact Section',
  'emirateHomeContact',
  '🌐 Emirate Hub Public Website > Home Page Sections > Contact Advisory Section',
  'emirate-front/components/home/ContactUs.tsx',
  homeContactRows
);

// ==================== 1.5 HOME TESTIMONIALS ====================
// EXACT CODE: <section className="py-16 md:py-24 lg:py-28 bg-white overflow-hidden select-none">
const homeTestimonialsRows = [
  tr('active', 'Section Active', 'boolean', true, 'Toggle Switch ON'),
  tr('backgroundColor', 'Section Background Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (Exact code: bg-white)'),
  tr('titleColor', 'Title Text Color', 'hexColor', '#111827', 'Enter HEX #111827 (Exact code: text-gray-900)'),
  tr('descriptionColor', 'Description Text Color', 'hexColor', '#6B7280', 'Enter HEX #6B7280 (Exact code: text-gray-500)'),
  tr('title', 'Section Title', 'string', 'What Our Customers Say', 'Main title heading'),
  tr('description', 'Description', 'text', 'Real stories from real people! See how our services have transformed their experiences.', 'Section subtitle text'),
  tr('buttonText', 'Button Text', 'string', 'Book Now', 'CTA button label (bg-black text-white hover:bg-primary)'),
  tr('buttonHref', 'Button URL', 'string', '/coming-soon', 'Target URL path')
].join('\n');

const testimonials = [
  { name: 'Shabeeb Khan', role: 'Founder', company: 'Bloom Digital', image: 'https://images.unsplash.com/photo-1604494747044-2e080876c5f1?w=600&auto=format&fit=crop', quote: 'Setting up our digital agency in Dubai was completely frictionless. Emirate Hub handled every visa and license requirement with total precision.', rating: 5, left: 6, top: 32, size: 'w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24' },
  { name: 'Carlos Mendez', role: 'Co-Founder', company: 'Horizon Logistics', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop', quote: 'The efficiency and transparency exceeded all expectations. They saved us months of bureaucratic legwork and guided us through corporate banking seamlessly.', rating: 5, left: 20, top: 73, size: 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28' },
  { name: 'Ameen Hyder', role: 'Managing Director', company: 'Apex Capital', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop', quote: 'Their mainland setup expertise is unparalleled in the UAE. From corporate structuring to residency visas, the entire process was swift and professional.', rating: 5, left: 35, top: 25, size: 'w-15 h-15 sm:w-18 sm:h-18 md:w-22 md:h-22 lg:w-26 lg:h-26' },
  { name: 'Faslu Rahman', role: 'CEO & Founder', company: 'Novus Global Tech', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=500&auto=format&fit=crop', quote: 'This platform made my experience seamless and enjoyable. The quality of service exceeded my expectations!', rating: 5, left: 50, top: 53, size: 'w-18 h-18 sm:w-22 sm:h-22 md:w-26 md:h-26 lg:w-30 lg:h-30' },
  { name: 'Dr. Julian Weiss', role: 'Principal Scientist', company: 'Apex BioTech', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop', quote: 'Outstanding corporate guidance with absolute clarity on freezone regulations. Highly recommended for international enterprises establishing in Dubai.', rating: 5, left: 65, top: 23, size: 'w-15 h-15 sm:w-18 sm:h-18 md:w-22 md:h-22 lg:w-26 lg:h-26' },
  { name: 'Faheem Ismail', role: 'Creative Director', company: 'Aura Design Studio', image: 'https://images.unsplash.com/photo-1687817320995-96a10d084cc6?w=600&auto=format&fit=crop', quote: 'The lifetime visa package and license setup were completed in record time. Transparent pricing with zero hidden fees — truly best-in-class support.', rating: 5, left: 80, top: 75, size: 'w-15 h-15 sm:w-18 sm:h-18 md:w-22 md:h-22 lg:w-26 lg:h-26' },
  { name: 'Shamil Goesling', role: 'Partner', company: 'Omnia Consulting', image: 'https://images.unsplash.com/photo-1671116559951-916ea2dba662?w=600&auto=format&fit=crop', quote: 'Emirate Hub is our trusted business incorporation partner. Their dedicated advisors made our regional expansion smooth, rapid, and fully compliant.', rating: 5, left: 94, top: 28, size: 'w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24' }
];

const testimonialsSubHtml = testimonials.map((t, idx) => {
  const rows = [
    tr('name', 'Client Name', 'string', t.name, 'Full name'),
    tr('role', 'Designation / Role', 'string', t.role, 'Job title'),
    tr('company', 'Company / Brand', 'string', t.company, 'Company name'),
    tr('image', 'Client Photo', 'image', t.image, 'Upload from Unsplash URL'),
    tr('quote', 'Client Testimonial Quote', 'text', t.quote, 'Review quote text'),
    tr('rating', 'Star Rating (1-5)', 'number', t.rating, 'Rating integer (5)'),
    tr('leftPercent', 'Horizontal Offset % (X)', 'number', t.left, 'Horizontal position in orbit (0-100)'),
    tr('topPercent', 'Vertical Offset % (Y)', 'number', t.top, 'Vertical position in orbit (0-100)'),
    tr('sizeClass', 'Avatar Size CSS Preset', 'string', t.size, 'Preset size styling string'),
    tr('active', 'Item Visibility', 'boolean', true, 'Toggle ON')
  ].join('\n');
  return subItemCard(`Testimonial ${idx + 1}: ${t.name} (${t.company})`, rows);
}).join('\n');

const homeTestimonialsSection = sectionCard(
  'home-testimonials',
  '1.5 Home: Testimonials Constellation',
  'emirateHomeTestimonials',
  '🌐 Emirate Hub Public Website > Home Page Sections > Testimonials Constellation',
  'emirate-front/data/home/testimonials.json & components/home/Testimonials.tsx',
  homeTestimonialsRows,
  `<div class="sub-items-container">
    <h3>Testimonials Orbit Items (<code>testimonials</code>)</h3>
    ${testimonialsSubHtml}
  </div>`
);

// ==================== 1.6 HOME BLOGS & NEWS ====================
// EXACT CODE: <section className="py-16 md:py-24 bg-white overflow-hidden">
const homeBlogsRows = [
  tr('active', 'Section Active', 'boolean', true, 'Toggle Switch ON'),
  tr('backgroundColor', 'Section Background Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (Exact code: bg-white)'),
  tr('titleColor', 'Title Text Color', 'hexColor', '#E02126', 'Enter HEX #E02126 (Exact code: text-primary #E02126)'),
  tr('subtitleColor', 'Subtitle Text Color', 'hexColor', '#4B5563', 'Enter HEX #4B5563 (Exact code: text-gray-600)'),
  tr('cardTitleColor', 'Card Title Color Override', 'hexColor', '#111827', 'Enter HEX #111827 (Exact code: text-gray-900 / text-white on overlay)'),
  tr('cardTextColor', 'Card Excerpt Text Color Override', 'hexColor', '#6B7280', 'Enter HEX #6B7280 (Exact code: text-gray-500 / text-gray-300 on overlay)'),
  tr('title', 'Section Title', 'string', 'Blogs & News', 'Enter title text'),
  tr('titleHref', 'Title Target URL', 'string', '/blog', 'Target link'),
  tr('subtitle', 'Subtitle Text', 'string', 'Keep up with the latest news', 'Subtitle text'),
  tr('viewAllText', 'View All Link Text', 'string', 'VIEW ALL', 'Button label'),
  tr('viewAllHref', 'View All Link Target', 'string', '/blog', 'Target URL'),
  tr('featuredBlogs', 'Featured Articles Reference', 'array of references', 'Optional: Select published emirateBlogPost docs', 'Pick published documents when available')
].join('\n');

const homeBlogCards = [
  { id: 'vat-registration-dubai-2026', title: 'VAT Registration in Dubai 2026: A Practical Guide for UAE Businesses', excerpt: 'If you are starting or growing a business in Dubai, VAT (Value Added Tax) registration is one of the most critical compliance milestones you must navigate to avoid severe penalties.', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop' },
  { id: 'compliance-obligations-uae', title: 'When Your Business Changes, Your Compliance Obligations May Change Too', excerpt: 'When launching or scaling a business in the UAE, the excitement of growth can often overshadow subtle regulatory triggers such as Ultimate Beneficial Ownership (UBO), ESR, and AML filings.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop' },
  { id: 'emirate-hub-aim-partnership', title: 'Emirate Hub and AIM Launch Strategic Partnership to Accelerate Cross-Border Investment & Business Growth', excerpt: 'This strategic partnership will strengthen international business engagement and connect innovation-led companies with global investors and regional stakeholders through AIM Congress 2026.', img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop' },
  { id: 'uae-corporate-tax-small-business-relief', title: 'UAE Corporate Tax: Small Business Relief Explained', excerpt: 'The UAE introduced Small Business Relief (SBR) to support small businesses during the initial implementation of the Corporate Tax regime. Learn how your company can benefit from 0% taxable income status.', img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop' }
];

const homeBlogCardsHtml = homeBlogCards.map((c, idx) => {
  const rows = [
    tr('id', 'Card Identifier / Slug', 'string', c.id, 'Identifier'),
    tr('title', 'Article Title', 'string', c.title, 'Article title'),
    tr('excerpt', 'Article Excerpt', 'text', c.excerpt, 'Summary snippet'),
    tr('image', 'Featured Cover Image', 'image', c.img, 'Upload from Unsplash URL'),
    tr('active', 'Card Visibility', 'boolean', true, 'Toggle ON'),
    tr('cardTitleColor', 'Card Title Color Override', 'hexColor', '#111827', 'Custom title color on blog card'),
    tr('cardTextColor', 'Card Text Color Override', 'hexColor', '#6B7280', 'Custom excerpt text color on blog card')
  ].join('\n');
  return subItemCard(`Blog Card ${idx + 1}: ${c.title}`, rows);
}).join('\n');

const homeBlogSection = sectionCard(
  'home-blogs',
  '1.6 Home: Blogs & News Feed',
  'emirateHomeBlogSection',
  '🌐 Emirate Hub Public Website > Home Page Sections > Blogs & News Feed',
  'emirate-front/data/home/blog.json & components/home/BlogsAndNews.tsx',
  homeBlogsRows,
  `<div class="sub-items-container">
    <h3>Custom Featured Cards Array (<code>blogs</code>)</h3>
    ${homeBlogCardsHtml}
  </div>`
);

// ==================== 1.7 HOME FAQ ====================
// EXACT CODE: <section className="py-16 md:py-24 bg-[#F2F3EE] relative overflow-hidden">
const homeFaqRows = [
  tr('active', 'Section Active', 'boolean', true, 'Toggle Switch ON'),
  tr('backgroundColor', 'Section Background Color', 'hexColor', '#F2F3EE', 'Enter HEX #F2F3EE (Exact code: bg-[#F2F3EE])'),
  tr('titleColor', 'Title Text Color', 'hexColor', '#E02126', 'Enter HEX #E02126 (Exact code: text-primary #E02126 for FAQ heading)'),
  tr('subtitleColor', 'Subtitle Text Color', 'hexColor', '#111827', 'Enter HEX #111827 (Exact code: text-gray-900 for "Questions ? Look here.")'),
  tr('questionColor', 'Question Accordion Text Color', 'hexColor', '#111827', 'Enter HEX #111827 (Exact code: text-gray-900)'),
  tr('answerColor', 'Answer Body Text Color', 'hexColor', '#4B5563', 'Enter HEX #4B5563 (Exact code: text-gray-600)'),
  tr('title', 'Section Main Title', 'string', 'FAQ', 'Enter header title'),
  tr('subtitle', 'Subtitle Text', 'string', 'Questions ? Look here.', 'Enter subtitle'),
  tr('image', 'Advisory Specialist Image', 'image', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop', 'Upload specialist image')
].join('\n');

const homeFaqsList = [
  { q: 'How much does setting up a business in Dubai cost?', a: 'The cost of setting up a business in Dubai depends on the license type, jurisdiction (Freezone vs. Mainland), and visa requirements. Basic Freezone company setup packages typically start from AED 12,500.' },
  { q: 'Can I own 100% of my company in Dubai?', a: 'Yes! Foreign entrepreneurs can retain 100% foreign ownership of their business in all UAE Freezones as well as across most Mainland commercial and industrial activities without requiring a UAE local partner.' },
  { q: 'Do I have to be physically in the UAE to set up a business?', a: 'No, initial company incorporation can be completed remotely from anywhere in the world. You will only need to visit Dubai briefly for Emirates ID biometrics and medical fitness tests.' },
  { q: 'What is included in a complete business setup package?', a: 'Full setup packages include trade license issuance, corporate registration, virtual office address, and visa allocation. Emirate Hub provides transparent pricing with zero hidden fees.' },
  { q: 'Are corporate taxes applicable to foreign-owned businesses?', a: 'Under the latest UAE Commercial Companies Law, 100% foreign ownership is fully guaranteed across over 1,000+ commercial activities on the Mainland and 100% across all Freezones with clear Small Business Relief options.' },
  { q: 'How does Emirate Hub streamline authority approvals?', a: 'Our team handles all initial document submissions, authority approvals, and name reservations electronically so you can stay focused on your business.' }
];

const homeFaqsHtml = homeFaqsList.map((item, idx) => {
  const rows = [
    tr('question', 'Question Text', 'string', item.q, 'Accordion question header'),
    tr('answer', 'Answer Text', 'text', item.a, 'Accordion answer body')
  ].join('\n');
  return subItemCard(`FAQ Item ${idx + 1}: ${item.q}`, rows);
}).join('\n');

const homeFaqSection = sectionCard(
  'home-faq',
  '1.7 Home: Frequently Asked Questions',
  'emirateHomeFaq',
  '🌐 Emirate Hub Public Website > Home Page Sections > Frequently Asked Questions',
  'emirate-front/components/home/Faq.tsx',
  homeFaqRows,
  `<div class="sub-items-container">
    <h3>FAQ Items Array (<code>faqs</code>)</h3>
    ${homeFaqsHtml}
  </div>`
);

// ==================== 2. ABOUT US PAGE ====================
// EXACT CODE: <section className="relative w-full overflow-hidden bg-white pt-28 ...">
const aboutHeroRows = [
  tr('active', 'Section Active', 'boolean', true, 'Toggle Switch ON'),
  tr('backgroundColor', 'Section Background Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (Exact code: bg-white)'),
  tr('titleColor', 'Title Text Color', 'hexColor', '#111827', 'Enter HEX #111827 (Exact code: text-gray-900)'),
  tr('highlightColor', 'Highlight Keyword Color', 'hexColor', '#E02126', 'Enter HEX #E02126 (Exact code: text-primary #E02126)'),
  tr('descriptionColor', 'Description Text Color', 'hexColor', '#4B5563', 'Enter HEX #4B5563 (Exact code: text-gray-600)'),
  tr('cardBackgroundColor', 'Center Card Background', 'hexColor', '#0D1015', 'Enter HEX #0D1015 (Exact code: bg-[#0d1015] center impact card)'),
  tr('cardTitleColor', 'Center Card Title Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (Exact code: text-white)'),
  tr('cardTextColor', 'Center Card Text Color', 'hexColor', '#D1D5DB', 'Enter HEX #D1D5DB (Exact code: text-gray-300)'),
  tr('breadcrumb.parentLabel', 'Parent Breadcrumb Label', 'string', 'Home', 'Breadcrumb root label'),
  tr('breadcrumb.parentHref', 'Parent Breadcrumb URL', 'string', '/', 'Breadcrumb root path'),
  tr('breadcrumb.label', 'Current Page Label', 'string', 'About Us', 'Current page title (text-primary)'),
  tr('title', 'Title Prefix', 'string', 'About', 'Enter title prefix'),
  tr('highlightedTitle', 'Highlighted Title', 'string', 'EMIRATE HUB', 'Enter highlighted brand'),
  tr('bottomDescription', 'Bottom Description Text', 'text', 'Emirate Hub is a team of passionate makers, advisors, and corporate strategists dedicated to building solutions and services that empower businesses to grow in Dubai and across the UAE.', 'Paste paragraph'),
  tr('centerCard.badgeIcon', 'Center Card Badge Icon', 'string', 'users', 'Lucide icon name (FiUsers)'),
  tr('centerCard.title', 'Center Card Title', 'string', 'A Team Committed to Real Impact', 'Card title heading'),
  tr('centerCard.description', 'Center Card Description', 'text', 'Emirate Hub is built by a diverse team of thinkers, legal strategists, and corporate builders who care deeply about helping businesses grow. With a focus on simplicity, performance, and people, we\'re creating solutions that truly make a difference.', 'Card description text'),
  tr('images.topLeft.asset', 'Top Left Image', 'image', 'emirate-front/public/images/about/about-1.jpg', 'Upload local image file'),
  tr('images.topLeft.alt', 'Top Left Image Alt', 'string', 'Emirate Hub Team Collaboration', 'Alt description'),
  tr('images.bottomLeft.asset', 'Bottom Left Image', 'image', 'emirate-front/public/images/about/about-2.jpg', 'Upload local image file'),
  tr('images.bottomLeft.alt', 'Bottom Left Image Alt', 'string', 'Executive Advisory Meeting', 'Alt description'),
  tr('images.topRight.asset', 'Top Right Image', 'image', 'emirate-front/public/images/about/about-3.jpg', 'Upload local image file'),
  tr('images.topRight.alt', 'Top Right Image Alt', 'string', 'Corporate Strategy Planning', 'Alt description'),
  tr('images.bottomRight.asset', 'Bottom Right Image', 'image', 'emirate-front/public/images/about/about-4.jpg', 'Upload local image file'),
  tr('images.bottomRight.alt', 'Bottom Right Image Alt', 'string', 'Emirate Hub Business Consultants', 'Alt description')
].join('\n');

const aboutHeroSection = sectionCard(
  'about-hero',
  '2.1 About: Hero & Story',
  'emirateAboutHero',
  '🌐 Emirate Hub Public Website > About Us Page > About Hero & Story',
  'emirate-front/data/about/aboutHero.json & components/about/AboutHero.tsx',
  aboutHeroRows
);

// EXACT CODE: <section className="py-16 md:py-24 bg-linear-to-b from-[#F8F6FB] via-white to-[#F8F6FB] overflow-hidden">
const aboutVisionRows = [
  tr('active', 'Section Active', 'boolean', true, 'Toggle Switch ON'),
  tr('backgroundColor', 'Section Background Color', 'hexColor', '#F8F6FB', 'Enter HEX #F8F6FB (Exact code: bg-[#F8F6FB])'),
  tr('titleColor', 'Title Text Color', 'hexColor', '#111827', 'Enter HEX #111827 (Exact code: text-gray-900)'),
  tr('subtitleColor', 'Subtitle Text Color', 'hexColor', '#6B7280', 'Enter HEX #6B7280 (Exact code: text-gray-500)'),
  tr('cardTitleColor', 'Card Title Color Override', 'hexColor', '#111827', 'Enter HEX #111827 (Exact code: text-gray-900 for Purpose / Mission headers)'),
  tr('cardTextColor', 'Card Body Text Color Override', 'hexColor', '#4B5563', 'Enter HEX #4B5563 (Exact code: text-gray-600 for Purpose / Mission descriptions)'),
  tr('header.title', 'Header Title', 'string', 'Our Vision, Your Future', 'Section title text'),
  tr('header.subtitle', 'Header Subtitle', 'text', 'Creating modern enterprise solutions that inspire sustainable business growth, stronger corporate communities, and lasting value across the UAE.', 'Subtitle text'),
  tr('vision.title', 'Vision Card Title', 'string', 'Our Purpose', 'Card heading'),
  tr('vision.description', 'Vision Description', 'text', 'To become the most trusted corporate setup and business advisory partner for global enterprises, modern founders, and ambitious investors in Dubai and beyond.', 'Card description text'),
  tr('mission.title', 'Mission Card Title', 'string', 'Our Mission', 'Card heading'),
  tr('mission.description', 'Mission Description', 'text', 'Our mission is to deliver comprehensive turnkey corporate solutions and business licenses with complete transparency, uncompromising integrity, and unmatched client satisfaction.', 'Card description text'),
  tr('images.column1.asset', 'Column 1 Image', 'image', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80', 'Upload Unsplash image'),
  tr('images.column1.alt', 'Column 1 Image Alt', 'string', 'Modern Dubai Skyline Landmark', 'Alt text'),
  tr('images.column2.asset', 'Column 2 Image', 'image', 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80', 'Upload Unsplash image'),
  tr('images.column2.alt', 'Column 2 Image Alt', 'string', 'Contemporary Commercial Architecture Dubai', 'Alt text'),
  tr('images.column3.asset', 'Column 3 Image', 'image', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', 'Upload Unsplash image'),
  tr('images.column3.alt', 'Column 3 Image Alt', 'string', 'Modern Corporate Tower', 'Alt text'),
  tr('images.column4.asset', 'Column 4 Image', 'image', 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800&q=80', 'Upload Unsplash image'),
  tr('images.column4.alt', 'Column 4 Image Alt', 'string', 'Dubai Architectural Landmarks and Green Space', 'Alt text')
].join('\n');

const aboutVisionSection = sectionCard(
  'about-vision',
  '2.2 About: Vision & Mission Showcase',
  'emirateAboutVision',
  '🌐 Emirate Hub Public Website > About Us Page > Vision & Mission Showcase',
  'emirate-front/data/about/vision.json & components/about/OurVision.tsx',
  aboutVisionRows
);

// EXACT CODE: <section className="py-16 md:py-24 bg-[#FAFAFC] border-t border-gray-100 overflow-hidden">
const aboutLocationRows = [
  tr('active', 'Section Active', 'boolean', true, 'Toggle Switch ON'),
  tr('backgroundColor', 'Section Background Color', 'hexColor', '#FAFAFC', 'Enter HEX #FAFAFC (Exact code: bg-[#FAFAFC])'),
  tr('titleColor', 'Title Text Color', 'hexColor', '#111827', 'Enter HEX #111827 (Exact code: text-gray-900)'),
  tr('highlightColor', 'Highlight Keyword Color', 'hexColor', '#E02126', 'Enter HEX #E02126 (Exact code: text-primary #E02126)'),
  tr('descriptionColor', 'Description Text Color', 'hexColor', '#6B7280', 'Enter HEX #6B7280 (Exact code: text-gray-500)'),
  tr('cardBackgroundColor', 'Information Cards Background', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (Exact code: bg-white for cards)'),
  tr('cardTitleColor', 'Information Cards Title Color', 'hexColor', '#111827', 'Enter HEX #111827 (Exact code: text-gray-900)'),
  tr('cardTextColor', 'Information Cards Text Color', 'hexColor', '#6B7280', 'Enter HEX #6B7280 (Exact code: text-gray-500)'),
  tr('badge', 'Section Badge', 'string', 'VISIT OUR HEADQUARTERS', 'Badge text (bg-primary/10 text-primary)'),
  tr('header.titlePrefix', 'Title Prefix', 'string', 'Our Location in ', 'Enter text with trailing space'),
  tr('header.highlight', 'Highlighted Keyword', 'string', 'Business Bay', 'Highlighted location keyword'),
  tr('header.description', 'Description', 'text', 'Conveniently situated in the iconic Iris Bay Tower, right in the heart of Dubai\'s central business district. Visit us for in-person advisory, license processing, and corporate consultation.', 'Paste description text'),
  tr('googleMapsUrl', 'External Google Maps Link', 'url', 'https://www.google.com/maps/search/?api=1&query=Iris+Bay+Tower+Business+Bay+Dubai', 'Direct Google Maps URL'),
  tr('mapEmbedUrl', 'Interactive Embed Template URL', 'string', 'https://maps.google.com/maps?q=Iris+Bay+Tower,+Business+Bay,+Dubai&t=&z={zoom}&ie=UTF8&iwloc=&output=embed', 'Iframe embed template string'),
  tr('defaultZoom', 'Default Zoom Level', 'number', 16, 'Initial zoom level'),
  tr('minZoom', 'Minimum Zoom Level', 'number', 12, 'Min zoom limit'),
  tr('maxZoom', 'Maximum Zoom Level', 'number', 19, 'Max zoom limit'),
  tr('buttonText', 'Button CTA Text', 'string', 'Open in Google Maps', 'Button label (bg-primary text-white)'),
  tr('cards.headOffice.badge', 'Head Office Badge', 'string', 'HEAD OFFICE ADDRESS', 'Card 1 badge'),
  tr('cards.headOffice.unit', 'Office Unit & Floor', 'string', '2204, 22nd Floor', 'Unit specification'),
  tr('cards.headOffice.building', 'Building Name', 'string', 'Iris Bay Tower', 'Tower name'),
  tr('cards.headOffice.location', 'Location Details', 'string', 'Business Bay, Dubai, United Arab Emirates', 'City & country'),
  tr('cards.accessibility.badge', 'Accessibility Badge', 'string', 'ACCESSIBILITY & TRANSIT', 'Card 2 badge'),
  tr('cards.accessibility.title', 'Transit Highlight', 'string', '3 mins from Business Bay Metro Station', 'Headline'),
  tr('cards.accessibility.description', 'Transit Instructions', 'text', 'Direct access from Sheikh Zayed Road (E11) and Al Sa\'ada Street. Dedicated visitor parking available.', 'Transit details'),
  tr('cards.workingHours.badge', 'Working Hours Badge', 'string', 'WORKING HOURS', 'Card 3 badge')
].join('\n');

const workingHoursRows = [
  tr('schedule[0]', 'Mon – Fri Schedule', 'object', 'Days: "Mon – Fri:", Hours: "9:00 AM – 6:00 PM", isClosed: false', 'Weekdays schedule item'),
  tr('schedule[1]', 'Saturday Schedule', 'object', 'Days: "Saturday:", Hours: "10:00 AM – 3:00 PM", isClosed: false', 'Weekend schedule item'),
  tr('schedule[2]', 'Sunday Schedule', 'object', 'Days: "Sunday:", Hours: "Closed", isClosed: true', 'Closed status item')
].join('\n');

const aboutLocationSection = sectionCard(
  'about-location',
  '2.3 About: Office Location & Hours',
  'emirateAboutLocation',
  '🌐 Emirate Hub Public Website > About Us Page > Office Location & Hours',
  'emirate-front/data/about/location.json & components/about/OfficeLocationMap.tsx',
  aboutLocationRows,
  `<div class="sub-items-container">
    <h3>Weekly Working Hours Schedule (<code>cards.workingHours.schedule</code>)</h3>
    ${subItemCard('Weekly Schedule Items', workingHoursRows)}
  </div>`
);

// ==================== 3. CORPORATE SERVICES COLLECTION ====================
// EXACT CODE in ServiceDetail.tsx: bg-[#FAF9F6]/80
const corporateServicesList = [
  {
    title: 'Business Incorporation',
    slug: 'business-incorporation',
    number: '01',
    tag: 'COMPANY FORMATION',
    serviceType: 'main service',
    bg: '#FAF9F6',
    titleColor: '#111827',
    tagColor: '#E02126',
    descColor: '#4B5563',
    featColor: '#374151',
    img: 'emirate-front/public/images/service-2.jpg',
    desc: 'We have streamlined the complexities of incorporating a company in Dubai so entrepreneurs and businesses can quickly establish their presence. From initial name reservation to final trade license issuance, our specialists deliver seamless guidance.',
    featHeading: 'What\'s Included:',
    feats: ['Mainland, Free Zone & Offshore Company Licensing', '100% Foreign Ownership Structuring', 'Department of Economy and Tourism (DET) Approvals', 'Memorandum of Association (MOA) Drafting & Legal Typing'],
    btnText: 'ENQUIRE FOR THIS SERVICE',
    btnHref: '/#contact-us',
    timeline: '3 - 5 Business Days',
    jurisdiction: 'Mainland, Free Zone & Offshore',
    steps: [
      { step: '01', title: 'Jurisdiction & Structure Advisory', desc: 'Determining the most cost-effective legal form, license activity codes, and optimal freezone or mainland setup.' },
      { step: '02', title: 'Initial Approval & Name Reservation', desc: 'Securing initial government approvals and reserving your trade name with the relevant regulatory authorities.' },
      { step: '03', title: 'License Issuance & Handover', desc: 'Drafting legal MOA/AOA, completing fee settlements, and receiving your official UAE Commercial License.' }
    ]
  },
  {
    title: 'Visa Services',
    slug: 'visa-services',
    number: '02',
    tag: 'VISA & IMMIGRATION',
    serviceType: 'main service',
    bg: '#FAF9F6',
    titleColor: '#111827',
    tagColor: '#E02126',
    descColor: '#4B5563',
    featColor: '#374151',
    img: 'emirate-front/public/images/service-1.jpg',
    desc: 'We offer end‑to‑end visa and immigration services for companies in UAE mainland and free zones, handling employment visas, family sponsorship, visit visas, Emirates ID, medical coordination and establishment card renewals. Our team manages all government liaison with GDRFA, ICP, MOHRE and free zone authorities, from document preparation and application submission to status tracking and final delivery, ensuring compliance, timely processing and minimal disruption to your business.',
    featHeading: 'What\'s Included:',
    feats: ['Investor & Partner Golden Visas (10-Year Residency)', 'Employee & Employment Visa Quota Allocations', 'Family & Dependent Visa Sponsorship Facilitation', 'Emirates ID Biometrics & Medical Fitness VIP Typing'],
    btnText: 'ENQUIRE FOR THIS SERVICE',
    btnHref: '/#contact-us',
    timeline: '2 - 4 Business Days',
    jurisdiction: 'GDRFA & ICP UAE Immigration',
    steps: [
      { step: '01', title: 'Entry Permit Application', desc: 'Preparing applicant documents and obtaining electronic entry permits from immigration authorities.' },
      { step: '02', title: 'VIP Medical & Biometrics', desc: 'Express medical fitness screening coordination and Emirates ID biometric capture.' },
      { step: '03', title: 'Residency Stamping & ID Delivery', desc: 'Final visa status change, residence permit issuance, and direct Emirates ID card delivery.' }
    ]
  },
  {
    title: 'PRO & Government Liaison Services',
    slug: 'pro-government-liaison',
    number: '03',
    tag: 'GOVERNMENT RELATIONS',
    serviceType: 'main service',
    bg: '#FAF9F6',
    titleColor: '#111827',
    tagColor: '#E02126',
    descColor: '#4B5563',
    featColor: '#374151',
    img: 'emirate-front/public/images/service-3.jpg',
    desc: 'Dedicated corporate PRO services managing all official documentation and administrative liaison with GDRFA, MOHRE, Dubai Courts, Municipality, and Free Zone authorities with zero delays.',
    featHeading: 'What\'s Included:',
    feats: ['Establishment Card Renewals & Labor Quota Management', 'MOHRE & Immigration Clearances & Legal Document Attestation', 'Commercial Register & Trade License Amendments', 'VIP Government Liaison, Document Clearing & Deliveries'],
    btnText: 'ENQUIRE FOR THIS SERVICE',
    btnHref: '/#contact-us',
    timeline: '2 - 4 Business Days',
    jurisdiction: 'GDRFA, MOHRE, Dubai Courts & Free Zones',
    steps: [
      { step: '01', title: 'Document Verification & Attestation', desc: 'Reviewing corporate credentials, board resolutions, and legal authorizations for administrative processing.' },
      { step: '02', title: 'Ministry & Authority Liaison', desc: 'Direct submission and follow-up with relevant government ministries, judicial departments, and municipal bodies.' },
      { step: '03', title: 'Approval & Handover', desc: 'Securing verified approvals, updated establishment files, labor quotas, and prompt courier delivery.' }
    ]
  },
  {
    title: 'Office Rentals',
    slug: 'office-rentals',
    number: '04',
    tag: 'COMMERCIAL SPACES',
    serviceType: 'normal service',
    bg: '#FAF9F6',
    titleColor: '#111827',
    tagColor: '#E02126',
    descColor: '#4B5563',
    featColor: '#374151',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    desc: 'We offer end‑to‑end office rental agreement services for businesses setting up or relocating in UAE mainland and free zones.',
    featHeading: 'What\'s Included:',
    feats: ['Ejari Attestation & Tenancy Contract Approvals', 'Flexi-Desks, Coworking & Shared Business Spaces', 'Furnished Private Offices & Commercial Suites in Prime Hubs', 'Virtual Office Solutions with Dedicated Mail Handling'],
    btnText: 'ENQUIRE FOR THIS SERVICE',
    btnHref: '/#contact-us',
    timeline: '24 - 48 Hours',
    jurisdiction: 'Dubai Land Dept / Ejari System',
    steps: [
      { step: '01', title: 'Space & Location Matching', desc: 'Selecting flexi-desks, executive suites, or shared spaces across prime business locations in Dubai.' },
      { step: '02', title: 'Tenancy Contract Drafting', desc: 'Drafting approved unified commercial leases compliant with municipality and free zone regulations.' },
      { step: '03', title: 'Ejari Registration & Access', desc: 'Issuing the official Ejari certificate required for bank accounts, licensing, and immediate move-in.' }
    ]
  },
  {
    title: 'Banking',
    slug: 'banking',
    number: '05',
    tag: 'FINANCIAL SERVICES',
    serviceType: 'normal service',
    bg: '#FAF9F6',
    titleColor: '#111827',
    tagColor: '#E02126',
    descColor: '#4B5563',
    featColor: '#374151',
    img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    desc: 'We help businesses open corporate bank accounts, set up payment gateways and access a full range of banking services in the UAE. From KYC and documentation to liaison with banks and payment providers, we ensure a smooth, compliant onboarding so you can start transacting quickly and focus on growing your business.',
    featHeading: 'What\'s Included:',
    feats: ['Corporate Bank Account Opening with Top UAE Tier-1 Banks', 'Multi-Currency Merchant Accounts (AED, USD, EUR, GBP)', 'Payment Gateway Integration for E-Commerce & Retail', 'Source of Funds, KYC & Compliance Advisory'],
    btnText: 'ENQUIRE FOR THIS SERVICE',
    btnHref: '/#contact-us',
    timeline: '5 - 10 Business Days',
    jurisdiction: 'Top UAE Tier-1 Banking Institutions',
    steps: [
      { step: '01', title: 'Compliance Profile Preparation', desc: 'Structuring the business plan, anticipated turnover, source of wealth, and supplier/customer profiles.' },
      { step: '02', title: 'Direct Banker Submission', desc: 'Liaison with dedicated corporate banking relationship managers and KYC clearance officers.' },
      { step: '03', title: 'Account Activation & IBAN Handover', desc: 'Final compliance approval, multi-currency IBAN release, and full online corporate banking onboarding.' }
    ]
  },
  {
    title: 'Family Visa & Golden Visa',
    slug: 'family-golden-visa',
    number: '06',
    tag: 'VISA & RESIDENCY SERVICES',
    serviceType: 'normal service',
    bg: '#FAF9F6',
    titleColor: '#111827',
    tagColor: '#E02126',
    descColor: '#4B5563',
    featColor: '#374151',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop',
    desc: 'We provide complete UAE family visa, tourist visa, domestic worker visa and Golden Residency services, including eligibility assessment, entry permits, status change, medical fitness, Emirates ID, residence visa issuance, renewal, amendment and cancellation. Our support covers sponsorship for eligible spouses, children, parents and domestic workers, as well as tourist visa applications, extensions and status changes where applicable. We also assist eligible investors, professionals and exceptional talents with Golden Residency applications and related dependent visa processing, subject to UAE immigration regulations and authority approval.',
    featHeading: 'What\'s Included:',
    feats: ['Family Residence Visa for Eligible Spouses, Children & Parents', 'Domestic Worker & Maid Visa Services', 'Tourist Visa Applications, Extensions & Status Changes', 'Golden Residency Applications for Eligible Investors, Professionals & Exceptional Talents', 'Entry Permits, Status Change & Medical Fitness Processing', 'Emirates ID & Residence Visa Issuance, Renewal, Amendment & Cancellation'],
    btnText: 'ENQUIRE FOR THIS SERVICE',
    btnHref: '/#contact-us',
    timeline: '2 - 5 Business Days',
    jurisdiction: 'Dubai Mainland & Free Zones',
    steps: [
      { step: '01', title: 'Initial Advisory & Scoping', desc: 'Clarifying your corporate objectives, compliance prerequisites, and documentation requirements.' },
      { step: '02', title: 'Government Liaison & Submission', desc: 'Preparing attested legal files and coordinating directly with relevant UAE ministerial bodies.' },
      { step: '03', title: 'Delivery & Dedicated Support', desc: 'Final certificate/service handover with full documentation and ongoing advisory assistance.' }
    ]
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    number: '07',
    tag: 'DIGITAL & MEDIA',
    serviceType: 'normal service',
    bg: '#FAF9F6',
    titleColor: '#111827',
    tagColor: '#E02126',
    descColor: '#4B5563',
    featColor: '#374151',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    desc: 'We help you create a professional website for your company and leverage digital marketing and social media to reach more customers. From design and content to targeted campaigns and social media management, we build your online presence to support your business growth in the UAE and beyond.',
    featHeading: 'What\'s Included:',
    feats: ['Custom Modern Website Design & High-Converting Landing Pages', 'Search Engine Optimization (SEO) & Google Ads (PPC)', 'Social Media Management & Paid Ads (Meta, LinkedIn, TikTok)', 'Corporate Brand Identity, Logo Design & Content Strategy'],
    btnText: 'ENQUIRE FOR THIS SERVICE',
    btnHref: '/#contact-us',
    timeline: '7 - 14 Days',
    jurisdiction: 'UAE & Global Market Reach',
    steps: [
      { step: '01', title: 'Market Strategy & Branding', desc: 'Analyzing competitors in Dubai, identifying target customer segments, and creating brand positioning.' },
      { step: '02', title: 'High-Converting Asset Creation', desc: 'Developing modern websites, multilingual landing pages, and search/social advertising assets.' },
      { step: '03', title: 'Campaign Launch & Growth', desc: 'Launching targeted Google/Meta ad funnels with weekly performance reporting and conversion optimization.' }
    ]
  }
];

const corporateServicesHtml = corporateServicesList.map((s, idx) => {
  const rows = [
    tr('title', 'Service Title', 'string', s.title, 'Full service title'),
    tr('slug', 'Slug', 'slug', s.slug, 'Click "Generate" or paste slug'),
    tr('number', 'Index Number', 'string', s.number, 'Two-digit sequence'),
    tr('tag', 'Category Tag', 'string', s.tag, 'Badge on card'),
    tr('serviceType', 'Service Classification', 'string (dropdown)', s.serviceType, 'Select "main service" or "normal service"'),
    tr('active', 'Document Active', 'boolean', true, 'Toggle Switch ON'),
    tr('backgroundColor', 'Background Color', 'hexColor', s.bg, 'Enter HEX #FAF9F6 (Exact code: bg-[#FAF9F6]/80)'),
    tr('titleColor', 'Title Text Color', 'hexColor', s.titleColor, 'Enter HEX #111827 (Exact code: text-gray-900)'),
    tr('tagColor', 'Tag Accent Color', 'hexColor', s.tagColor, 'Enter HEX #E02126 (Exact code: text-primary #E02126)'),
    tr('descriptionColor', 'Description Color', 'hexColor', s.descColor, 'Enter HEX #4B5563 (Exact code: text-gray-600)'),
    tr('featuresTextColor', 'Features List Color', 'hexColor', s.featColor, 'Enter HEX #374151 (Exact code: text-gray-700)'),
    tr('buttonBackgroundColor', 'Button Background Color', 'hexColor', '#E02126', 'Enter HEX #E02126 (CTA button background)'),
    tr('buttonTextColor', 'Button Text Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (CTA button text color)'),
    tr('image', 'Featured Photo', 'image', s.img, 'Upload local file or from Unsplash URL'),
    tr('description', 'Service Description', 'text', s.desc, 'Detailed service description'),
    tr('featuresHeading', 'Features Heading', 'string', s.featHeading, 'Label above checklist'),
    tr('keyFeatures', 'Key Features List', 'array of strings', s.feats, 'Add all bullet items in order'),
    tr('buttonText', 'Button CTA Label', 'string', s.btnText, 'CTA button text'),
    tr('buttonHref', 'Button URL Anchor', 'string', s.btnHref, 'Target anchor'),
    tr('timeline', 'Execution Timeline', 'string', s.timeline, 'Expected duration'),
    tr('jurisdiction', 'Jurisdiction Coverage', 'string', s.jurisdiction, 'Authority coverage'),
    tr('steps', '3-Step Execution Process', 'array of objects', `Step 01: ${s.steps[0].title} | Step 02: ${s.steps[1].title} | Step 03: ${s.steps[2].title}`, 'Add 3 step items with step number, title, and description')
  ].join('\n');

  return sectionCard(
    `service-doc-${idx + 1}`,
    `3.1.${idx + 1} Service Document: ${s.title}`,
    'emirateCorporateService',
    '🌐 Emirate Hub Public Website > Services Page & Collection > All Corporate Services (Collection)',
    'emirate-front/data/service/servicesList.json & lib/services.ts',
    rows
  );
}).join('\n');

// Services Hero
const servicesHeroRows = [
  tr('active', 'Section Active', 'boolean', true, 'Toggle Switch ON'),
  tr('backgroundColor', 'Section Background Color', 'hexColor', '#000000', 'Enter HEX #000000 (bg-black/70 overlay)'),
  tr('titleColor', 'Title Text Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (text-white)'),
  tr('highlightColor', 'Highlight Keyword Color', 'hexColor', '#E02126', 'Enter HEX #E02126 (Brand Red text-[#E02126])'),
  tr('subheadingColor', 'Subheading Text Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (text-white/95)'),
  tr('descriptionColor', 'Description Text Color', 'hexColor', '#D1D5DB', 'Enter HEX #D1D5DB (text-white/80)'),
  tr('buttonBackgroundColor', 'CTA Button Background Color', 'hexColor', '#E02126', 'Enter HEX #E02126 (Button bubble background)'),
  tr('buttonTextColor', 'CTA Button Text Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (Button text color)'),
  tr('backgroundImage', 'Background Panorama Image', 'image', 'emirate-front/public/images/hero-bg.png', 'Upload local background image'),
  tr('breadcrumb.parentLabel', 'Parent Breadcrumb Label', 'string', 'Home', 'Breadcrumb root label'),
  tr('breadcrumb.parentHref', 'Parent Breadcrumb URL', 'string', '/', 'Breadcrumb root path'),
  tr('breadcrumb.label', 'Current Page Label', 'string', 'Services', 'Current page title (text-primary)'),
  tr('title', 'Title Prefix', 'string', 'Comprehensive Corporate Services for ', 'Enter text with trailing space'),
  tr('highlightedTitle', 'Highlighted Title', 'string', 'UAE Business Growth', 'Highlighted keyword'),
  tr('subheading', 'Subheading', 'string', 'Our Expertise & Solutions Tailored for Your Enterprise.', 'Subtitle text'),
  tr('description', 'Description', 'text', 'From company formation and lifetime visas to corporate tax compliance, office rentals, bank account opening, and digital branding — Emirate Hub delivers turnkey solutions to establish, scale, and manage your enterprise effortlessly.', 'Paste description text'),
  tr('buttonText', 'Button CTA Text', 'string', 'CONNECT WITH AN EXPERT', 'Button label'),
  tr('buttonHref', 'Button URL Anchor', 'string', '/#contact-us', 'Target anchor')
].join('\n');

const servicesHeroSection = sectionCard(
  'services-hero',
  '3.2 Services Page Hero',
  'emirateServicesHero',
  '🌐 Emirate Hub Public Website > Services Page & Collection > Services Page Hero',
  'emirate-front/components/services/ServicesHero.tsx',
  servicesHeroRows
);

// Additional Services Section
// EXACT CODE: <section className="py-16 md:py-24 bg-white border-t border-gray-200/70 overflow-hidden">
const additionalServicesRows = [
  tr('active', 'Section Active', 'boolean', true, 'Toggle Switch ON'),
  tr('backgroundColor', 'Section Background Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (Exact code: bg-white)'),
  tr('titleColor', 'Title Text Color', 'hexColor', '#111827', 'Enter HEX #111827 (Exact code: text-gray-900)'),
  tr('highlightColor', 'Highlight Keyword Color', 'hexColor', '#E02126', 'Enter HEX #E02126 (Exact code: text-primary #E02126)'),
  tr('descriptionColor', 'Description Text Color', 'hexColor', '#6B7280', 'Enter HEX #6B7280 (Exact code: text-gray-500)'),
  tr('sectionHeader.badge', 'Section Badge', 'string', 'ADDITIONAL SUPPORT SERVICES', 'Badge label (text-primary uppercase)'),
  tr('sectionHeader.titlePrefix', 'Title Prefix', 'string', 'Value-Added Corporate Solutions for', 'Prefix text'),
  tr('sectionHeader.highlightedTitle', 'Highlighted Title', 'string', 'Seamless UAE Operations', 'Highlighted title'),
  tr('sectionHeader.description', 'Description', 'text', 'Complement your core business setup with our suite of specialized administrative, legal, and operational support services tailored for businesses across Dubai and the UAE.', 'Paste text')
].join('\n');

const addServicesList = [
  { id: 'trademark-ip-registration', num: '01', badge: 'LEGAL PROTECTION', title: 'Trademark & IP Registration', desc: 'Protect your brand identity, logos, slogans, and patents across the UAE and GCC. We manage search clearance, filing with the Ministry of Economy, publication, and final registration certificate issuance.', feats: ['Brand & Logo Search Clearance', 'Ministry of Economy Filings', 'Publication & Opposition Handling', '10-Year Renewals & Trademark Watch'] },
  { id: 'tax-readiness', num: '02', badge: 'TAX & COMPLIANCE', title: 'Tax Readiness', desc: 'We provide comprehensive corporate tax consulting services tailored for businesses operating in UAE mainland and free zones, guiding you through corporate tax registration, return filings, compliance assessments, and strategic planning to ensure full regulatory alignment.', feats: ['UAE Corporate Tax Registration & Review', 'Value Added Tax (VAT) Registration & Filings', 'Qualifying Free Zone Person (QFZP) Advisory', 'Bookkeeping & Audit Preparation'] },
  { id: 'legal-translation-attestation', num: '03', badge: 'DOCUMENTATION', title: 'Legal Translation & Attestation', desc: 'Ministry of Justice certified translation and legal document attestation services for commercial agreements, MOAs, powers of attorney, board resolutions, and certificates from MOFA and foreign embassies.', feats: ['MOJ Certified Legal Translation', 'MOFA UAE & Embassy Attestations', 'Notary Public Coordination', 'Multi-Language Technical Translation'] },
  { id: 'customs-client-code', num: '04', badge: 'TRADE & LOGISTICS', title: 'Customs Code & Import/Export Setup', desc: 'Register your enterprise with Dubai Customs and Federal Customs Authority to obtain your import, export, and re-export client codes, ensuring frictionless global trading operations.', feats: ['Dubai Customs Client Code Registration', 'Mirsal II Portal Integration', 'Import / Export Code Renewals', 'Duty Exemption & Harmonized Tariff Advice'] },
  { id: 'hr-payroll-wps', num: '05', badge: 'HUMAN RESOURCES', title: 'HR & Wages Protection System (WPS)', desc: 'Complete setup and management of UAE Wages Protection System (WPS) compliant payroll processing, employment contract registrations, and employee onboarding administration.', feats: ['WPS Bank Account Linkage', 'Monthly Salary File Processing (SIF)', 'MOHRE Employment Contracts', 'End of Service Gratuity Calculation'] },
  { id: 'corporate-secretarial', num: '06', badge: 'GOVERNANCE', title: 'Corporate Secretarial & Compliance', desc: 'Maintain highest corporate governance standards with ongoing board resolution drafting, statutory record management, share transfer documentation, and license amendments.', feats: ['Shareholder Resolution Drafting', 'Share Transfer & Capital Restructuring', 'Ultimate Beneficial Owner (UBO) Filings', 'Annual Statutory Register Maintenance'] }
];

const addServicesHtml = addServicesList.map(item => {
  const rows = [
    tr('id', 'Card Identifier', 'string', item.id, 'Identifier'),
    tr('number', 'Index Sequence', 'string', item.num, 'Two-digit sequence (text-primary)'),
    tr('badge', 'Category Badge', 'string', item.badge, 'Tag text'),
    tr('title', 'Service Title', 'string', item.title, 'Card title (text-gray-900)'),
    tr('cardBackgroundColor', 'Card Background Color', 'hexColor', '#FFFFFF', 'Card surface color (defaults to #FFFFFF)'),
    tr('cardBadgeColor', 'Card Badge Color', 'hexColor', '#E02126', 'Category tag badge color (defaults to #E02126)'),
    tr('cardTitleColor', 'Card Title Color', 'hexColor', '#111827', 'Service title color (defaults to #111827)'),
    tr('cardTextColor', 'Card Description Color', 'hexColor', '#4B5563', 'Service description text color (defaults to #4B5563)'),
    tr('description', 'Service Summary', 'text', item.desc, 'Card description (text-gray-500)'),
    tr('featuresHeading', 'Features Heading', 'string', 'Key Highlights:', 'Header above highlights'),
    tr('features', 'Highlights List', 'array of strings', item.feats, 'Add 4 items in order'),
    tr('buttonText', 'Button CTA Label', 'string', 'ENQUIRE SERVICE', 'Button label (text-primary)'),
    tr('buttonHref', 'Button URL Anchor', 'string', '/#contact-us', 'Target anchor'),
    tr('buttonBackgroundColor', 'Button Background Color', 'hexColor', '#FFFFFF', 'Button background color (defaults to #FFFFFF)'),
    tr('buttonTextColor', 'Button Text Color', 'hexColor', '#111827', 'Button text color (defaults to #111827)')
  ].join('\n');
  return subItemCard(`Support Card ${item.num}: ${item.title}`, rows);
}).join('\n');

const additionalServicesSection = sectionCard(
  'additional-services',
  '3.3 Additional Support Services',
  'emirateAdditionalServicesSection',
  '🌐 Emirate Hub Public Website > Services Page & Collection > Additional Support Services',
  'emirate-front/data/service/additionalServices.json & components/services/AdditionalServices.tsx',
  additionalServicesRows,
  `<div class="sub-items-container">
    <h3>Additional Services Cards Array (<code>services</code>)</h3>
    ${addServicesHtml}
  </div>`
);

// Services FAQ
// EXACT CODE: <section className="py-20 md:py-28 bg-[#F7F8F4] relative overflow-hidden">
const servicesFaqRows = [
  tr('active', 'Section Active', 'boolean', true, 'Toggle Switch ON'),
  tr('backgroundColor', 'Section Background Color', 'hexColor', '#F7F8F4', 'Enter HEX #F7F8F4 (Exact code: bg-[#F7F8F4])'),
  tr('titleColor', 'Title Text Color', 'hexColor', '#111827', 'Enter HEX #111827 (Exact code: text-gray-900)'),
  tr('highlightColor', 'Highlight Keyword Color', 'hexColor', '#E02126', 'Enter HEX #E02126 (Exact code: text-primary #E02126)'),
  tr('descriptionColor', 'Description Text Color', 'hexColor', '#4B5563', 'Enter HEX #4B5563 (Exact code: text-gray-600)'),
  tr('questionColor', 'Question Accordion Text Color', 'hexColor', '#111827', 'Enter HEX #111827 (Exact code: text-gray-900)'),
  tr('answerColor', 'Answer Body Text Color', 'hexColor', '#4B5563', 'Enter HEX #4B5563 (Exact code: text-gray-600)'),
  tr('sectionHeader.badge', 'Section Badge', 'string', 'HELP & ADVISORY DESK', 'Badge text (bg-primary/10 text-primary)'),
  tr('sectionHeader.titlePrefix', 'Title Prefix', 'string', 'Everything You Need to Know About', 'Prefix text'),
  tr('sectionHeader.highlightedTitle', 'Highlighted Title', 'string', 'UAE Corporate Setup', 'Highlighted keyword'),
  tr('sectionHeader.description', 'Description', 'text', 'Have questions before incorporating your enterprise? Browse our curated answers or use the instant search to find solutions tailored to your business.', 'Paste text'),
  tr('sectionHeader.searchPlaceholder', 'Search Placeholder', 'string', 'Search questions by topic (e.g. visa, corporate tax, license, banking)...', 'Input placeholder'),
  tr('helpBox.active', 'Help Box Active', 'boolean', true, 'Toggle Switch ON'),
  tr('helpBox.title', 'Help Box Title', 'string', 'Still have specific questions?', 'Box title (text-white)'),
  tr('helpBox.description', 'Help Box Description', 'text', 'Our senior business setup consultants are ready to provide a personalized advisory session tailored to your exact business activities.', 'Box description (text-gray-400)'),
  tr('helpBox.buttonText', 'Advisory Button Text', 'string', 'REQUEST ADVISORY CALL', 'Button label (bg-primary text-white)'),
  tr('helpBox.buttonHref', 'Advisory Button URL', 'string', '/#contact-us', 'Target anchor'),
  tr('helpBox.whatsappText', 'WhatsApp Button Text', 'string', 'CHAT ON WHATSAPP', 'Button label (text-[#25D366])'),
  tr('helpBox.whatsappHref', 'WhatsApp Direct URL', 'url', 'https://wa.me/971509432297', 'Direct WhatsApp link')
].join('\n');

const servicesFaqItems = [
  { num: '01', cat: 'LICENSING & SETUP', q: 'Which business license is best suited for my company in the UAE?', a: 'The ideal license depends on your business activity, target clients, and physical office needs. Free Zone licenses offer 100% foreign ownership, 0% personal tax, and zero customs duty for international trade. Mainland (DET) licenses allow you to trade freely anywhere across the UAE local market and bid on government contracts.' },
  { num: '02', cat: 'INCORPORATION SPEED', q: 'How long does it take to incorporate a company and get a trade license?', a: 'Standard Free Zone and Mainland company incorporations typically take between 3 to 7 business days, provided all initial KYC and passport documents are in order.' },
  { num: '03', cat: 'VISA & RESIDENCY', q: 'What is the process for obtaining a UAE Investor or Employment Visa?', a: 'Once your trade license and establishment card are issued, we initiate the entry permit application, followed by in-country status change, VIP medical fitness test, Emirates ID biometric typing, and final residency visa stamping.' },
  { num: '04', cat: 'TAX & COMPLIANCE', q: 'Do I need to register for UAE Corporate Tax and VAT?', a: 'Yes, all UAE businesses (Mainland and Free Zone) must register for UAE Corporate Tax with the Federal Tax Authority (FTA) regardless of revenue. VAT registration is mandatory if taxable turnover exceeds AED 375,000 per annum (and optional from AED 187,500).' },
  { num: '05', cat: 'CORPORATE BANKING', q: 'Can Emirate Hub assist with opening a corporate bank account?', a: 'Yes, we work closely with major UAE Tier-1 banks (such as Emirates NBD, Mashreq, Wio, FAB, ADCB) and digital banking providers to assist you with KYC documentation, source-of-funds verification, and smooth account onboarding.' },
  { num: '06', cat: 'OFFICE SPACES', q: 'Is physical office space mandatory for all UAE business licenses?', a: 'No. Many Free Zones allow cost-effective flexi-desks or virtual office setups suitable for digital and consultancy companies. For Mainland licenses and companies with higher visa quotas, a physical Ejari tenancy contract is required.' }
];

const servicesFaqItemsHtml = servicesFaqItems.map(item => {
  const rows = [
    tr('number', 'Index Sequence', 'string', item.num, 'Two-digit sequence (text-primary)'),
    tr('category', 'Category Tag', 'string', item.cat, 'Category pill text (text-gray-400)'),
    tr('question', 'Question Text', 'string', item.q, 'Question header (text-gray-900)'),
    tr('answer', 'Answer Text', 'text', item.a, 'Answer paragraph (text-gray-600)')
  ].join('\n');
  return subItemCard(`Advisory FAQ ${item.num}: ${item.q}`, rows);
}).join('\n');

const servicesFaqSection = sectionCard(
  'services-faq',
  '3.4 Services FAQ & Advisory Desk',
  'emirateServicesFaq',
  '🌐 Emirate Hub Public Website > Services Page & Collection > Services FAQ & Advisory Desk',
  'emirate-front/data/service/faq.json & components/services/Faq.tsx',
  servicesFaqRows,
  `<div class="sub-items-container">
    <h3>FAQ Items Array (<code>items</code>)</h3>
    ${servicesFaqItemsHtml}
  </div>`
);

// Services CTA
// EXACT CODE: <section className="py-16 md:py-24 bg-black text-white relative overflow-hidden">
const servicesCtaRows = [
  tr('active', 'Section Active', 'boolean', true, 'Toggle Switch ON'),
  tr('backgroundColor', 'Section Background Color', 'hexColor', '#000000', 'Enter HEX #000000 (Exact code: bg-black)'),
  tr('tagColor', 'Tag Accent Color', 'hexColor', '#E02126', 'Enter HEX #E02126 (Exact code: text-primary #E02126)'),
  tr('titleColor', 'Headline Title Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (Exact code: text-white)'),
  tr('descriptionColor', 'Description Text Color', 'hexColor', '#D1D5DB', 'Enter HEX #D1D5DB (Exact code: text-gray-300)'),
  tr('buttonBackgroundColor', 'CTA Button Background Color', 'hexColor', '#E02126', 'Enter HEX #E02126 (CTA button background)'),
  tr('buttonTextColor', 'CTA Button Text Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (CTA button text)'),
  tr('tag', 'Tagline Badge', 'string', 'START YOUR UAE JOURNEY', 'Tagline badge text'),
  tr('title', 'Headline Title', 'string', 'Ready to Establish & Scale Your Business in Dubai?', 'Banner headline'),
  tr('description', 'Description', 'text', 'Speak directly with our senior corporate setup consultants for a personalized advisory session tailored to your business activities and growth plans.', 'Banner description text'),
  tr('buttonText', 'Button CTA Label', 'string', 'REQUEST A FREE CONSULTATION', 'Button label (bg-primary text-white)'),
  tr('buttonHref', 'Button URL Anchor', 'string', '/#contact-us', 'Target anchor')
].join('\n');

const servicesCtaSection = sectionCard(
  'services-cta',
  '3.5 Services Call to Action Banner',
  'emirateServicesCta',
  '🌐 Emirate Hub Public Website > Services Page & Collection > Bottom Call to Action Banner',
  'emirate-front/components/services/ServicesCta.tsx',
  servicesCtaRows
);

// ==================== 4. BLOG & ARTICLES ====================
// EXACT CODE in BlogDetail.tsx: bg-[#FAF9F6]/60
const blogPostsList = [
  {
    title: 'VAT Registration in Dubai 2026: A Practical Guide for UAE Businesses',
    slug: 'vat-registration-dubai-2026',
    active: true,
    featured: true,
    bg: '#FAF9F6',
    titleColor: '#111827',
    textColor: '#374151',
    quoteColor: '#E02126',
    excerpt: 'If you are starting or growing a business in Dubai, VAT (Value Added Tax) registration is one of the most critical compliance milestones you must navigate to avoid severe penalties.',
    category: 'tax-compliance',
    date: 'March 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop',
    author: { name: 'Tariq Al-Mansoor', role: 'Senior Tax & Compliance Advisor', avatar: 'emirate-front/public/images/contact-person.jpg' },
    tags: ['VAT Dubai', 'Federal Tax Authority', 'Tax Compliance', 'Business Setup'],
    summaryQuote: 'Understanding mandatory versus voluntary VAT thresholds early protects cash flow and prevents costly retrospective penalties from the FTA.',
    takeaways: [
      'Mandatory threshold: Taxable supplies exceed AED 375,000 in the prior 12 months or anticipated 30 days.',
      'Voluntary threshold: Taxable supplies or expenses exceed AED 187,500.',
      'Zero-rated and exempt supplies require distinct accounting treatments in UAE financial reporting.',
      'Late registration penalties start at AED 10,000, compounding with subsequent filing delays.'
    ],
    sectionsCount: 3
  },
  {
    title: 'When Your Business Changes, Your Compliance Obligations May Change Too',
    slug: 'compliance-obligations-uae',
    active: true,
    featured: false,
    bg: '#FAF9F6',
    titleColor: '#111827',
    textColor: '#374151',
    quoteColor: '#E02126',
    excerpt: 'When launching or scaling a business in the UAE, the excitement of growth can often overshadow subtle regulatory triggers such as Ultimate Beneficial Ownership (UBO), ESR, and AML filings.',
    category: 'regulations',
    date: 'February 2026',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
    author: { name: 'Sarah Jenkins', role: 'Head of Corporate Governance', avatar: 'emirate-front/public/images/contact-person.jpg' },
    tags: ['Corporate Governance', 'UBO Regulations', 'ESR Reporting', 'AML UAE'],
    summaryQuote: 'Changes in shareholding, office location, or business activities trigger mandatory statutory disclosures within 15 days across UAE licensing authorities.',
    takeaways: [
      'UBO registers must be updated within 15 days of any changes in ownership or control structures.',
      'Economic Substance Regulations (ESR) apply to specific relevant activities including distribution, service centers, and holding companies.',
      'Anti-Money Laundering (AML) goAML reporting is mandatory for designated non-financial businesses and professions (DNFBPs).',
      'Failure to maintain statutory registers can lead to license suspension and fines up to AED 100,000.'
    ],
    sectionsCount: 2
  },
  {
    title: 'Emirate Hub and AIM Launch Strategic Partnership to Accelerate Cross-Border Investment & Business Growth',
    slug: 'emirate-hub-aim-partnership',
    active: true,
    featured: false,
    bg: '#FAF9F6',
    titleColor: '#111827',
    textColor: '#374151',
    quoteColor: '#E02126',
    excerpt: 'This strategic partnership will strengthen international business engagement and connect innovation-led companies with global investors and regional stakeholders through AIM Congress 2026.',
    category: 'strategic-growth',
    date: 'February 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop',
    author: { name: 'Rashid Al-Nuaimi', role: 'Director of Strategic Alliances', avatar: 'emirate-front/public/images/contact-person.jpg' },
    tags: ['Cross-Border Investment', 'AIM Congress', 'Global Partnerships', 'UAE Economy'],
    summaryQuote: 'By joining forces with AIM Congress, Emirate Hub provides our clients with direct access to sovereign wealth networks, institutional investors, and global markets.',
    takeaways: [
      'Unlocking institutional funding and strategic venture backing for UAE-based tech and industrial firms.',
      'Fast-tracked corporate setup and licensing assistance for foreign direct investors entering the GCC.',
      'Collaborative roundtables connecting European and Asian enterprises directly with Dubai government stakeholders.',
      'Turnkey executive migration and golden visa facilitation for international founders.'
    ],
    sectionsCount: 2
  },
  {
    title: 'UAE Corporate Tax: Small Business Relief Explained',
    slug: 'uae-corporate-tax-small-business-relief',
    active: true,
    featured: false,
    bg: '#FAF9F6',
    titleColor: '#111827',
    textColor: '#374151',
    quoteColor: '#E02126',
    excerpt: 'The UAE introduced Small Business Relief (SBR) to support small businesses during the initial implementation of the Corporate Tax regime. Learn how your company can benefit from 0% taxable income status.',
    category: 'tax-compliance',
    date: 'January 2026',
    readTime: '7 min read',
    img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
    author: { name: 'Tariq Al-Mansoor', role: 'Senior Tax & Compliance Advisor', avatar: 'emirate-front/public/images/contact-person.jpg' },
    tags: ['Corporate Tax', 'Small Business Relief', '0% Tax Rate', 'UAE Business'],
    summaryQuote: 'Small Business Relief treats eligible taxable persons as having no taxable income for tax periods ending on or before 31 December 2026.',
    takeaways: [
      'Revenue threshold: Gross revenue must not exceed AED 3,000,000 for relevant and previous tax periods.',
      'Relief eligibility is available for tax periods starting on or after 1 June 2023 and ending on or before 31 December 2026.',
      'Qualifying Free Zone Persons and members of Multinational Enterprise (MNE) groups are excluded from SBR.',
      'Corporate Tax registration remains mandatory even if electing for Small Business Relief.'
    ],
    sectionsCount: 2
  },
  {
    title: 'Dubai Mainland vs. Free Zone in 2026: Choosing the Right Structure for Your Enterprise',
    slug: 'dubai-mainland-vs-freezone-guide',
    active: true,
    featured: false,
    bg: '#FAF9F6',
    titleColor: '#111827',
    textColor: '#374151',
    quoteColor: '#E02126',
    excerpt: 'A detailed strategic comparison between establishing your company in the Dubai Mainland versus one of the UAE\'s 40+ specialized Free Zones.',
    category: 'corporate-advisory',
    date: 'January 2026',
    readTime: '8 min read',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    author: { name: 'Sarah Jenkins', role: 'Head of Corporate Governance', avatar: 'emirate-front/public/images/contact-person.jpg' },
    tags: ['Mainland Setup', 'Free Zone UAE', 'Company Formation', 'Trade License'],
    summaryQuote: 'Mainland setup allows unrestricted direct trade with the local UAE market and government bidding, while Free Zones offer 100% foreign ownership with specialized industry hubs.',
    takeaways: [
      'Mainland licenses enable direct retail and B2C/B2B trading throughout all seven Emirates without local distributor restrictions.',
      'Free Zones (such as DMCC, DIFC, IFZA, DAFZA) offer streamlined digital incorporation and custom sector-specific ecosystems.',
      '100% foreign ownership is now available across virtually all commercial and industrial mainland activities.',
      'Visa allocation in mainland is generally determined by physical office square footage, whereas free zones offer tiered visa packages.'
    ],
    sectionsCount: 2
  },
  {
    title: 'Navigating UAE Corporate Banking: Essential Steps for Seamless Account Approval',
    slug: 'opening-corporate-bank-account-uae',
    active: true,
    featured: false,
    bg: '#FAF9F6',
    titleColor: '#111827',
    textColor: '#374151',
    quoteColor: '#E02126',
    excerpt: 'Opening a corporate bank account is often considered the most demanding stage of UAE business setup. Here is our insider blueprint for swift banking onboarding.',
    category: 'corporate-advisory',
    date: 'January 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    author: { name: 'Rashid Al-Nuaimi', role: 'Director of Strategic Alliances', avatar: 'emirate-front/public/images/contact-person.jpg' },
    tags: ['Corporate Banking', 'UAE Bank Account', 'KYC Compliance', 'Emirates NBD'],
    summaryQuote: 'Clear proof of business substance, verified source of funds, and well-documented client/supplier invoices are the three pillars of instant bank KYC approval in Dubai.',
    takeaways: [
      'Maintain comprehensive 6-month personal or parent company bank statements with clear audit trails.',
      'Provide draft contracts, prospective supplier MOUs, and a concrete business model overview.',
      'Physical residency (Emirates ID and UAE residential tenancy) dramatically accelerates premier tier account opening.',
      'Emirate Hub works directly with relationship managers at leading tier-1 UAE financial institutions.'
    ],
    sectionsCount: 2
  }
];

const blogPostsHtml = blogPostsList.map((post, idx) => {
  const rows = [
    tr('title', 'Article Title', 'string', post.title, 'Main article title'),
    tr('slug', 'Slug', 'slug', post.slug, 'Click "Generate" or paste slug'),
    tr('active', 'Article Active', 'boolean', post.active, 'Toggle Switch ON'),
    tr('featured', 'Featured on Blog Home', 'boolean', post.featured, post.featured ? 'Toggle ON (Featured big header card)' : 'Toggle OFF'),
    tr('backgroundColor', 'Article Page Background', 'hexColor', post.bg, 'Enter HEX #FAF9F6 (Exact code: bg-[#FAF9F6]/60)'),
    tr('titleColor', 'Article Title Color', 'hexColor', post.titleColor, 'Enter HEX #111827 (Exact code: text-gray-900)'),
    tr('textColor', 'Article Body Text Color', 'hexColor', post.textColor, 'Enter HEX #374151 (Exact code: text-gray-700)'),
    tr('quoteColor', 'Summary Quote Accent Color', 'hexColor', post.quoteColor, 'Enter HEX #E02126 (Exact code: text-primary #E02126)'),
    tr('excerpt', 'Summary Excerpt', 'text', post.excerpt, 'Short article summary'),
    tr('category', 'Category Slug', 'string', post.category, 'Select category from dropdown'),
    tr('date', 'Publication Date Label', 'string', post.date, 'Date text display'),
    tr('readTime', 'Estimated Read Time', 'string', post.readTime, 'Read time badge'),
    tr('image', 'Featured Cover Image', 'image', post.img, 'Upload from Unsplash URL'),
    tr('author.name', 'Author Name', 'string', post.author.name, 'Full author name'),
    tr('author.role', 'Author Title / Role', 'string', post.author.role, 'Job role'),
    tr('author.avatar', 'Author Avatar Image', 'image', post.author.avatar, 'Upload avatar image file'),
    tr('tags', 'Article Tags', 'array of strings', post.tags, 'Add tags'),
    tr('summaryQuote', 'Key Pull Quote', 'text', post.summaryQuote, 'Highlighted blockquote'),
    tr('keyTakeaways', 'Key Takeaways Bullet Points', 'array of strings', post.takeaways, 'Add key points'),
    tr('sections', 'Structured Content Sections', 'array of objects', `${post.sectionsCount} Sections defined in data`, 'Add content section headings and paragraphs')
  ].join('\n');

  return sectionCard(
    `blog-doc-${idx + 1}`,
    `4.1.${idx + 1} Blog Post: ${post.title}`,
    'emirateBlogPost',
    '🌐 Emirate Hub Public Website > Blog & Articles > All Blog Posts (Collection)',
    'emirate-front/data/blog/blogsData.json & components/blog/BlogDetail.tsx',
    rows
  );
}).join('\n');

// Blog Hero
// EXACT CODE: <section className="relative w-full overflow-hidden bg-[#0A0D14] text-white ...">
const blogHeroRows = [
  tr('active', 'Section Active', 'boolean', true, 'Toggle Switch ON'),
  tr('backgroundColor', 'Section Background Color', 'hexColor', '#0A0D14', 'Enter HEX #0A0D14 (Exact code: bg-[#0A0D14] Dark navy)'),
  tr('titleColor', 'Title Text Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (Exact code: text-white)'),
  tr('highlightColor', 'Highlight Keyword Color', 'hexColor', '#E02126', 'Enter HEX #E02126 (Exact code: text-primary #E02126)'),
  tr('subtitleColor', 'Subtitle Text Color', 'hexColor', '#D1D5DB', 'Enter HEX #D1D5DB (Exact code: text-gray-300)'),
  tr('descriptionColor', 'Description Text Color', 'hexColor', '#9CA3AF', 'Enter HEX #9CA3AF (Exact code: text-gray-400)'),
  tr('breadcrumb.parentLabel', 'Parent Breadcrumb Label', 'string', 'Home', 'Breadcrumb root label'),
  tr('breadcrumb.parentHref', 'Parent Breadcrumb URL', 'string', '/', 'Breadcrumb root path'),
  tr('breadcrumb.label', 'Current Page Label', 'string', 'Blogs & Insights', 'Current page title (text-primary)'),
  tr('badge', 'Section Badge', 'string', 'LATEST INSIGHTS & REGULATIONS', 'Badge text'),
  tr('title', 'Title Prefix', 'string', 'UAE Business Insights &', 'Prefix text'),
  tr('highlightedTitle', 'Highlighted Title', 'string', 'Market Updates', 'Highlighted keyword'),
  tr('subtitle', 'Subtitle Text', 'string', 'Authoritative perspectives on UAE corporate setup, tax strategies, and regulatory compliance.', 'Subtitle text'),
  tr('description', 'Description Text', 'text', 'Stay informed with actionable advice from Emirate Hub\'s advisors. Explore in-depth guides on VAT registration, corporate tax reliefs, international expansions, and corporate governance in Dubai.', 'Paste text'),
  tr('stats[0]', 'Stat 1: Regulatory Accuracy', 'object', 'Value: "100%", Label: "Regulatory Accuracy"', 'Stat item 1'),
  tr('stats[1]', 'Stat 2: Compliance Directives', 'object', 'Value: "2026", Label: "Compliance Directives"', 'Stat item 2'),
  tr('stats[2]', 'Stat 3: Avg. Registration Speed', 'object', 'Value: "3-5 Days", Label: "Avg. Registration Speed"', 'Stat item 3')
].join('\n');

const blogHeroSection = sectionCard(
  'blog-hero',
  '4.2 Blog Listing Hero',
  'emirateBlogHero',
  '🌐 Emirate Hub Public Website > Blog & Articles > Blog Listing Hero',
  'emirate-front/data/blog/blogHero.json & components/blog/BlogHero.tsx',
  blogHeroRows
);

// Blog Settings
// EXACT CODE in BlogsList.tsx: bg-[#F8FAFC]
const blogSettingsRows = [
  tr('active', 'Blog Listing Active', 'boolean', true, 'Toggle Switch ON'),
  tr('backgroundColor', 'Listing Background Color', 'hexColor', '#F8FAFC', 'Enter HEX #F8FAFC (Exact code: bg-[#F8FAFC])'),
  tr('categories[0]', 'Category 1: All Articles', 'object', 'id: "all", label: "All Articles"', 'Filter category 1'),
  tr('categories[1]', 'Category 2: Tax & VAT', 'object', 'id: "tax-compliance", label: "Tax & VAT"', 'Filter category 2'),
  tr('categories[2]', 'Category 3: Compliance & Regs', 'object', 'id: "regulations", label: "Compliance & Regulations"', 'Filter category 3'),
  tr('categories[3]', 'Category 4: Strategic Growth', 'object', 'id: "strategic-growth", label: "Strategic Growth"', 'Filter category 4'),
  tr('categories[4]', 'Category 5: Corporate Advisory', 'object', 'id: "corporate-advisory", label: "Corporate Advisory"', 'Filter category 5')
].join('\n');

const blogSettingsSection = sectionCard(
  'blog-settings',
  '4.3 Blog Categories & Settings',
  'emirateBlogSettings',
  '🌐 Emirate Hub Public Website > Blog & Articles > Blog Categories & Settings',
  'emirate-front/data/blog/blogsData.json & components/blog/BlogsList.tsx',
  blogSettingsRows
);

// ==================== 5. HEADER, FOOTER & COMMON ====================
const navbarRows = [
  tr('backgroundColor', 'Navbar Background Color', 'hexColor', '#000000', 'Enter HEX #000000 (Exact code: bg-black/85 backdrop-blur-md)'),
  tr('linkColor', 'Navigation Links Color', 'hexColor', '#E2E8F0', 'Enter HEX #E2E8F0 (Exact code: text-gray-200)'),
  tr('phoneColor', 'Phone Number Text Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (Exact code: text-white)'),
  tr('phone', 'Contact Phone Number', 'string', '+971 50 943 2297', 'Direct phone display'),
  tr('whatsappUrl', 'WhatsApp Direct URL', 'url', 'https://wa.me/971509432297', 'Direct chat link'),
  tr('ctaText', 'CTA Button Label', 'string', 'Request Consultation', 'Button label (bg-primary text-white)'),
  tr('ctaHref', 'CTA Button URL', 'string', '/#contact-us', 'Target anchor'),
  tr('navLinks[0]', 'Nav Link 1', 'object', 'name: "Home", href: "/"', 'Header navigation item'),
  tr('navLinks[1]', 'Nav Link 2', 'object', 'name: "About Us", href: "/about"', 'Header navigation item'),
  tr('navLinks[2]', 'Nav Link 3', 'object', 'name: "Services", href: "/services"', 'Header navigation item'),
  tr('navLinks[3]', 'Nav Link 4', 'object', 'name: "Blogs & Insights", href: "/blog"', 'Header navigation item')
].join('\n');

const navbarSection = sectionCard(
  'common-navbar',
  '5.1 Header & Navigation Bar',
  'emirateNavbar',
  '🌐 Emirate Hub Public Website > Header, Footer & Inquiries > Navbar & Direct Chat',
  'emirate-front/components/common/Navbar.tsx',
  navbarRows
);

const footerRows = [
  tr('backgroundColor', 'Footer Background Color', 'hexColor', '#000000', 'Enter HEX #000000 (Exact code: bg-black text-white)'),
  tr('headingColor', 'Footer Section Headings Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (Exact code: text-white)'),
  tr('textColor', 'Body & Address Text Color', 'hexColor', '#9CA3AF', 'Enter HEX #9CA3AF (Exact code: text-gray-400)'),
  tr('linkColor', 'Footer Links Text Color', 'hexColor', '#D1D5DB', 'Enter HEX #D1D5DB (Exact code: text-gray-300 hover:text-white)'),
  tr('copyrightColor', 'Copyright Notice Text Color', 'hexColor', '#6B7280', 'Enter HEX #6B7280 (Exact code: text-gray-500)'),
  tr('description', 'Brand Mission Statement', 'text', 'Dubai\'s leading corporate advisory and business setup firm. Empowering entrepreneurs and global enterprises to establish and scale across the UAE.', 'Footer brand text'),
  tr('headOffice.title', 'Head Office Card Title', 'string', 'Head Office', 'Office card title'),
  tr('headOffice.unit', 'Office Unit & Tower', 'string', '2204, 22nd Floor, Iris Bay Tower', 'Unit details'),
  tr('headOffice.location', 'City & Country', 'string', 'Business Bay, Dubai, United Arab Emirates', 'City & country'),
  tr('headOffice.mapsUrl', 'Google Maps External Link', 'url', 'https://www.google.com/maps/search/?api=1&query=Iris+Bay+Tower+Business+Bay+Dubai', 'Maps URL'),
  tr('phone', 'Office Phone Number', 'string', '+971 50 943 2297', 'Phone display string'),
  tr('email', 'Contact Email Address', 'string', 'contact@emiratehub.ae', 'Official email'),
  tr('workingHours', 'Working Hours Summary', 'string', 'Mon – Fri: 9:00 AM – 6:00 PM', 'Hours summary string'),
  tr('quickLinks', 'Quick Navigation Links', 'array of objects', '5 items: Home (/), About Us (/about), Services (/services), Blogs & Insights (/blog), Contact Us (/#contact-us)', 'Add 5 quick links in order'),
  tr('coreServices', 'Core Services Links', 'array of objects', '5 items: Business Incorporation, Visa Services, PRO & Government Liaison, Corporate Bank Account, Corporate Tax & VAT', 'Add 5 core service links in order'),
  tr('socialLinks', 'Social Profiles', 'array of objects', '5 profiles: linkedin, twitter, instagram, facebook, youtube', 'Add 5 social profiles in order'),
  tr('copyrightText', 'Copyright Notice', 'string', '© 2026 Emirate Hub Corporate Services. All rights reserved.', 'Bottom copyright legal text')
].join('\n');

const footerSection = sectionCard(
  'common-footer',
  '5.2 Footer Configuration',
  'emirateFooter',
  '🌐 Emirate Hub Public Website > Header, Footer & Inquiries > Footer & Office Contacts',
  'emirate-front/components/common/Footer.tsx',
  footerRows
);

const contactConfigRows = [
  tr('backgroundColor', 'Form Background Color', 'hexColor', '#FFFFFF', 'Enter HEX #FFFFFF (Exact code: bg-white)'),
  tr('selectPlaceholder', 'Dropdown Placeholder Label', 'string', 'Select Service', 'Default prompt in select'),
  tr('options[0]', 'Service Option 1', 'object', 'value: "business-incorporation", label: "Business Incorporation"', 'Dropdown choice 1'),
  tr('options[1]', 'Service Option 2', 'object', 'value: "visa-services", label: "Visa Services"', 'Dropdown choice 2'),
  tr('options[2]', 'Service Option 3', 'object', 'value: "pro-government-liaison", label: "PRO & Government Liaison"', 'Dropdown choice 3'),
  tr('options[3]', 'Service Option 4', 'object', 'value: "corporate-bank-account", label: "Corporate Bank Account Opening"', 'Dropdown choice 4'),
  tr('options[4]', 'Service Option 5', 'object', 'value: "corporate-tax-vat", label: "Corporate Tax & VAT Compliance"', 'Dropdown choice 5'),
  tr('options[5]', 'Service Option 6', 'object', 'value: "office-rentals", label: "Office Rentals & Commercial Space"', 'Dropdown choice 6'),
  tr('options[6]', 'Service Option 7', 'object', 'value: "other", label: "Other Services"', 'Dropdown choice 7')
].join('\n');

const contactConfigSection = sectionCard(
  'common-contact-config',
  '5.3 Contact Form Options',
  'emirateContactConfig',
  '🌐 Emirate Hub Public Website > Header, Footer & Inquiries > Contact Form Options',
  'emirate-front/data/common/contactForm.json',
  contactConfigRows
);

// Assemble the complete master HTML page
const masterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Emirate Hub — Sanity Studio Content Entry Table &amp; Schema Reference</title>
<style>
:root {
  --primary: #E02126;
  --primary-hover: #b91318;
  --bg-dark: #0a0d14;
  --card-bg: #121722;
  --card-header-bg: #182030;
  --border-color: #232d42;
  --table-border: #1f2838;
  --table-row-hover: #192233;
  --text-main: #f1f5f9;
  --text-muted: #94a3b8;
  --text-code: #38bdf8;
  --code-bg: #182234;
}

* { box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--bg-dark);
  color: var(--text-main);
  line-height: 1.5;
}

/* Sticky Header Bar */
.top-nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(10, 13, 20, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.brand-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-logo {
  background: var(--primary);
  color: #fff;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 14px;
  letter-spacing: 1px;
}

.brand-title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.nav-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.section-select {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  color: #fff;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  cursor: pointer;
}

.search-input {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  color: #fff;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
  min-width: 240px;
  outline: none;
}
.search-input:focus, .section-select:focus {
  border-color: var(--primary);
}

/* Main Container */
.main-wrapper {
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 20px 80px 20px;
}

/* Stats Overview */
.stats-banner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.stat-box {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-num {
  font-size: 26px;
  font-weight: 800;
  color: #ffffff;
}

.stat-num.accent { color: var(--primary); }
.stat-num.green { color: #10b981; }
.stat-num.blue { color: #38bdf8; }

.stat-lbl {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Document Section Card */
.doc-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  margin-bottom: 36px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.doc-header {
  background: var(--card-header-bg);
  border-bottom: 1px solid var(--border-color);
  padding: 18px 24px;
}

.doc-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 8px;
}

.doc-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
}

.doc-type-badge {
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 4px 10px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.doc-type-badge code {
  color: var(--text-code);
  font-size: 13px;
  font-weight: 600;
}

.doc-meta-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  font-size: 12.5px;
  color: var(--text-muted);
}
.doc-meta-row strong {
  color: #cbd5e1;
}

/* Tables */
.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13.5px;
}

.data-table thead th {
  background: #151d2a;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 11.5px;
  letter-spacing: 0.5px;
  padding: 12px 18px;
  border-bottom: 1px solid var(--border-color);
}

.data-table tbody td {
  padding: 12px 18px;
  border-bottom: 1px solid var(--table-border);
  vertical-align: middle;
}

.data-table tbody tr:hover {
  background: var(--table-row-hover);
}

.col-name code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: #7dd3fc;
  font-weight: 600;
  font-size: 13px;
}

.col-meta {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.field-label {
  font-weight: 600;
  color: #f1f5f9;
}

.badge-type {
  font-size: 11px;
  color: #94a3b8;
  font-family: monospace;
}

/* Value display */
.val-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.val-text {
  color: #f8fafc;
  word-break: break-word;
  line-height: 1.4;
}

.color-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-swatch {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.3);
  display: inline-block;
  flex-shrink: 0;
}

.val-code {
  font-family: monospace;
  color: #38bdf8;
  font-weight: 600;
}

.badge-bool {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}
.bool-true { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); }
.bool-false { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); }

.val-array {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}
.array-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--code-bg);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #233045;
}
.array-item code {
  color: #bae6fd;
  font-size: 12px;
}

.col-notes {
  color: #94a3b8;
  font-size: 12px;
}

/* Copy button */
.copy-btn {
  cursor: pointer;
  background: #202b3d;
  color: #94a3b8;
  border: 1px solid #33435c;
  padding: 3px 8px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
  flex-shrink: 0;
  transition: all 0.15s ease;
}
.copy-btn:hover {
  background: var(--primary);
  color: #ffffff;
  border-color: var(--primary);
  transform: translateY(-1px);
}
.copy-btn.copied {
  background: #10b981 !important;
  color: #ffffff !important;
  border-color: #10b981 !important;
}

.code-copy {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Sub items (Arrays) */
.sub-items-container {
  padding: 20px 24px;
  background: #0d121c;
  border-top: 1px solid var(--border-color);
}
.sub-items-container h3 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 16px;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sub-item-card {
  background: #131a26;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 18px;
  overflow: hidden;
}

.sub-item-header {
  background: #1b2434;
  padding: 10px 18px;
  border-bottom: 1px solid var(--border-color);
}
.sub-item-header h4 {
  margin: 0;
  font-size: 14px;
  color: #f1f5f9;
  font-weight: 600;
}

.sub-table thead th {
  background: #161e2c;
  font-size: 11px;
  padding: 8px 14px;
}
.sub-table tbody td {
  padding: 8px 14px;
  font-size: 12.5px;
}

/* Back to top */
#scrollTopBtn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  box-shadow: 0 4px 14px rgba(224, 33, 38, 0.4);
  cursor: pointer;
  display: none;
  z-index: 999;
}
</style>
<script>
function copyText(btn) {
  const text = btn.dataset.copy;
  navigator.clipboard.writeText(text).then(() => {
    const old = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = old;
      btn.classList.remove('copied');
    }, 1200);
  }).catch(err => {
    console.error('Copy failed', err);
  });
}

function jumpToSection(sel) {
  const val = sel.value;
  if (val) {
    const el = document.getElementById(val);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

window.onscroll = function() {
  const btn = document.getElementById('scrollTopBtn');
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
</head>
<body>

<header class="top-nav">
  <div class="brand-group">
    <span class="brand-logo">EMIRATE HUB</span>
    <h1 class="brand-title">Sanity Content Entry Master Table</h1>
  </div>
  <div class="nav-controls">
    <select class="section-select" onchange="jumpToSection(this)">
      <option value="">-- Jump to Page / Component --</option>
      <optgroup label="1. Home Page Sections">
        <option value="home-hero">1.1 Home Hero Section</option>
        <option value="home-pricing">1.2 Home Pricing Packages</option>
        <option value="home-services">1.3 Home Services Overview</option>
        <option value="home-contact">1.4 Home Contact Advisory</option>
        <option value="home-testimonials">1.5 Home Testimonials Constellation</option>
        <option value="home-blogs">1.6 Home Blogs &amp; News Feed</option>
        <option value="home-faq">1.7 Home FAQ Section</option>
      </optgroup>
      <optgroup label="2. About Us Page">
        <option value="about-hero">2.1 About Hero &amp; Story</option>
        <option value="about-vision">2.2 About Vision &amp; Mission</option>
        <option value="about-location">2.3 About Office Location &amp; Hours</option>
      </optgroup>
      <optgroup label="3. Corporate Services">
        <option value="service-doc-1">3.1.1 Business Incorporation</option>
        <option value="service-doc-2">3.1.2 Visa Services</option>
        <option value="service-doc-3">3.1.3 PRO &amp; Government Liaison</option>
        <option value="service-doc-4">3.1.4 Office Rentals</option>
        <option value="service-doc-5">3.1.5 Banking</option>
        <option value="service-doc-6">3.1.6 Family Visa &amp; Golden Visa</option>
        <option value="service-doc-7">3.1.7 Digital Marketing</option>
        <option value="services-hero">3.2 Services Page Hero</option>
        <option value="additional-services">3.3 Additional Support Services</option>
        <option value="services-faq">3.4 Services FAQ &amp; Advisory Desk</option>
        <option value="services-cta">3.5 Services Call to Action Banner</option>
      </optgroup>
      <optgroup label="4. Blog &amp; Articles">
        <option value="blog-doc-1">4.1.1 Post: VAT Registration in Dubai 2026</option>
        <option value="blog-doc-2">4.1.2 Post: Compliance Obligations</option>
        <option value="blog-doc-3">4.1.3 Post: AIM Partnership</option>
        <option value="blog-doc-4">4.1.4 Post: Small Business Relief</option>
        <option value="blog-doc-5">4.1.5 Post: Mainland vs Free Zone</option>
        <option value="blog-doc-6">4.1.6 Post: UAE Corporate Banking</option>
        <option value="blog-hero">4.2 Blog Listing Hero</option>
        <option value="blog-settings">4.3 Blog Categories &amp; Settings</option>
      </optgroup>
      <optgroup label="5. Header, Footer &amp; Common">
        <option value="common-navbar">5.1 Header &amp; Navigation Bar</option>
        <option value="common-footer">5.2 Footer Configuration</option>
        <option value="common-contact-config">5.3 Contact Form Options</option>
      </optgroup>
    </select>
    <input type="text" class="search-input" placeholder="Search page (Ctrl+F supported)..." onkeyup="if(event.key === 'Enter'){ window.find(this.value); }" />
  </div>
</header>

<main class="main-wrapper">

  <div class="stats-banner">
    <div class="stat-box">
      <span class="stat-num accent">21</span>
      <span class="stat-lbl">Sanity Schemas Verified</span>
    </div>
    <div class="stat-box">
      <span class="stat-num green">100%</span>
      <span class="stat-lbl">Exact Code Colors &amp; Content Mapped</span>
    </div>
    <div class="stat-box">
      <span class="stat-num blue">1-Click</span>
      <span class="stat-lbl">Quick Clipboard Copy</span>
    </div>
    <div class="stat-box">
      <span class="stat-num">5 Groups</span>
      <span class="stat-lbl">Home, About, Services, Blog, Common</span>
    </div>
  </div>

  <!-- 1. HOME PAGE SECTIONS -->
  ${homeHeroSection}
  ${homePricingSection}
  ${homeServicesSection}
  ${homeContactSection}
  ${homeTestimonialsSection}
  ${homeBlogSection}
  ${homeFaqSection}

  <!-- 2. ABOUT US PAGE -->
  ${aboutHeroSection}
  ${aboutVisionSection}
  ${aboutLocationSection}

  <!-- 3. CORPORATE SERVICES -->
  ${corporateServicesHtml}
  ${servicesHeroSection}
  ${additionalServicesSection}
  ${servicesFaqSection}
  ${servicesCtaSection}

  <!-- 4. BLOG & ARTICLES -->
  ${blogPostsHtml}
  ${blogHeroSection}
  ${blogSettingsSection}

  <!-- 5. HEADER, FOOTER & COMMON -->
  ${navbarSection}
  ${footerSection}
  ${contactConfigSection}

</main>

<button id="scrollTopBtn" onclick="scrollToTop()">↑ Top</button>

</body>
</html>`;

// Ensure emirate-front/public/html directory exists and write index.html
const publicHtmlDir = path.resolve(__dirname, '../public/html');
if (!fs.existsSync(publicHtmlDir)) {
  fs.mkdirSync(publicHtmlDir, { recursive: true });
}

const targetPath = path.join(publicHtmlDir, 'index.html');
fs.writeFileSync(targetPath, masterHtml, 'utf8');
console.log('Successfully wrote exact color table dashboard to:', targetPath);

// Also write a copy named sanity-guide.html in the same html folder
fs.writeFileSync(path.join(publicHtmlDir, 'sanity-guide.html'), masterHtml, 'utf8');
console.log('Successfully wrote sanity-guide.html to:', path.join(publicHtmlDir, 'sanity-guide.html'));
