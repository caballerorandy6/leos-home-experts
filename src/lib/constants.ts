export const SITE_CONFIG = {
  name: "Leo's Home Experts",
  url: "https://leoshomeexperts.com",
  phone: "+1 (346) 219-9138",
  email: "info@leoshomeexperts.com",
  address: {
    street: "Houston, TX",
    city: "Houston",
    state: "TX",
    zip: "77001",
    country: "US",
  },
  social: {
    tiktok: "https://tiktok.com/@leoshomeexpert",
  },
} as const;

export const SERVICES = [
  {
    id: "interior-remodeling",
    title: "Interior Remodeling",
    description:
      "Transform your living spaces with our expert interior remodeling services. From kitchens to bathrooms, we bring your vision to life.",
    icon: "Home",
    serviceArea: "Houston Area",
  },
  {
    id: "patio-remodeling",
    title: "Patio Remodeling",
    description:
      "Upgrade your outdoor living space with beautiful patio designs. We create functional and stunning patios for your home.",
    icon: "Fence",
    serviceArea: "Houston Area",
  },
  {
    id: "patio-shades",
    title: "Patio Shades",
    description:
      "Keep cool and comfortable with our premium patio shade solutions. Perfect for Houston's sunny weather.",
    icon: "Sun",
    serviceArea: "Houston Area",
  },
  {
    id: "curtains-shades",
    title: "Curtains & Shades",
    description:
      "Elegant window treatments that combine style and functionality. Custom solutions for every room in your home.",
    icon: "Blinds",
    serviceArea: "150 Miles Around Houston",
  },
  {
    id: "awnings",
    title: "Awnings",
    description:
      "Professional awning installation for homes and businesses. Protect your space from sun and rain in style.",
    icon: "Umbrella",
    serviceArea: "150 Miles Around Houston",
  },
] as const;

export const FEATURES = [
  {
    title: "Licensed & Insured",
    description: "Fully licensed and insured for your peace of mind",
    icon: "Shield",
  },
  {
    title: "Free Estimates",
    description: "Get a free quote with no obligation",
    icon: "Calculator",
  },
  {
    title: "Quality Materials",
    description: "We use only premium materials for lasting results",
    icon: "Award",
  },
  {
    title: "Local Experts",
    description: "Proudly serving Houston and surrounding areas",
    icon: "MapPin",
  },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Maria Rodriguez",
    location: "Houston, TX",
    rating: 5,
    text: "Leo's team did an amazing job with our patio remodel. Professional, on time, and the quality exceeded our expectations!",
  },
  {
    id: 2,
    name: "John Smith",
    location: "Katy, TX",
    rating: 5,
    text: "Best awning installation experience ever. They were knowledgeable and helped us choose the perfect style for our home.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    location: "Sugar Land, TX",
    rating: 5,
    text: "Our interior remodel turned out beautiful. The attention to detail and craftsmanship is outstanding.",
  },
] as const;

export const SERVICE_AREAS = {
  houston: [
    "Houston",
    "Katy",
    "Sugar Land",
    "Pearland",
    "The Woodlands",
    "Spring",
    "Cypress",
    "Missouri City",
    "Pasadena",
    "League City",
  ],
  extended: [
    "Galveston",
    "Beaumont",
    "College Station",
    "Victoria",
    "Austin",
    "San Antonio",
  ],
} as const;

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
] as const;
