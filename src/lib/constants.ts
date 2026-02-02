export const SITE_CONFIG = {
  name: "Leo's Home Experts",
  url: "https://leoshomeexperts.com",
  phone: "+1 (346) 219-9138",
  emails: [
    "lecour@ac-remodelingservice.com",
    "leleac1987@gmail.com",
  ],
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
    id: "patio-build-remodeling",
    title: "Patio Build & Remodeling",
    description:
      "Custom patio construction and remodeling for your outdoor living space. We design and build functional, beautiful patios tailored to your home.",
    icon: "Hammer",
    serviceArea: "Houston Area",
  },
  {
    id: "patio-shades",
    title: "Patio Shades",
    description:
      "Keep cool and comfortable with our premium patio shade solutions. Custom measurements and professional installation for lasting results.",
    icon: "Sun",
    serviceArea: "Houston Area",
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
    text: "Our patio shades turned out beautiful. The attention to detail and craftsmanship is outstanding. Highly recommend!",
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
