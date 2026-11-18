// All site copy lives here so it can be edited without touching components.

export const profile = {
  brand: 'Owubah',
  fullName: 'Francisca Nana Owubah',
  tagline: ['Design', 'the future'],
  title: 'Multidisciplinary designer and communications professional with a passion for brand storytelling.',
  crownTitle: 'Western Region Representative',
  crownEvent: 'Ghana’s Most Beautiful 2025',
  intro:
    'Francisca Nana Owubah is a multidisciplinary designer with a passion for brand storytelling. She is a communications professional, tourism and culture activist, and the Western Region Representative for Ghana’s Most Beautiful 2025. A proud graduate of the Ghana Institute of Journalism with a Bachelor of Arts in Communications (Journalism option).',
  about: [
    'I combine foundational media training, gained through reporting and writing internships at GHOne TV and 3Music TV, with advanced digital marketing expertise certified by the Mastercard Foundation.',
    'Aside from designing, I also find time to enjoy nature, where I get fresh inspiration for future projects.',
  ],
}

export const journey = [
  { title: 'Ghana Institute of Journalism', text: 'Bachelor of Arts in Communications, Journalism option.', tag: 'Education' },
  { title: 'GHOne TV & 3Music TV', text: 'Reporting and writing internships that built a foundation in media and storytelling.', tag: 'Internships' },
  { title: 'Mastercard Foundation', text: 'Certified in advanced digital marketing.', tag: 'Certification' },
  { title: 'Ghana’s Most Beautiful 2025', text: 'Western Region Representative, championing tourism and culture.', tag: 'Culture' },
]

export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'social', label: 'Social media' },
  { id: 'brand', label: 'Brand identity' },
  { id: 'photo', label: 'Photo & video' },
]

export const projects = [
  {
    title: 'Potters Apparel',
    tag: 'Social media',
    cats: ['social'],
    text: 'Instagram content and profile curation for a contemporary womenswear label.',
    img: '/img/potters-apparel-instagram.webp',
    alt: 'Potters Apparel Instagram profile',
    w: 554, h: 1200, tall: true, tint: 'sky',
  },
  {
    title: 'Feed presentation',
    tag: 'Social media',
    cats: ['social'],
    text: 'Social media feed design presented as a product mockup.',
    img: '/img/social-mockup.webp',
    alt: 'Phone mockup showing a social media feed on a coral background',
    w: 800, h: 533, tint: 'peach',
  },
  {
    title: 'Amonu Chocolates',
    tag: 'Campaign',
    cats: ['social', 'brand'],
    text: '“Indulge midweek” social campaign creative.',
    img: '/img/amonu-chocolate.webp',
    alt: 'Amonu Chocolate campaign post: Indulge midweek with Amonu Chocolate',
    w: 607, h: 799, tall: true, tint: 'cream',
  },
  {
    title: 'Schematiq',
    tag: 'Brand identity',
    cats: ['brand'],
    text: 'Brand merchandise: “Innovation that flows.”',
    img: '/img/schematiq-tee.webp',
    alt: 'White t-shirt with the Schematiq “Innovation that flows” graphic on a purple background',
    w: 800, h: 533, tint: 'lilac',
  },
  {
    title: 'Skincare product shoot',
    tag: 'Photography',
    cats: ['photo'],
    text: 'Lifestyle product imagery for a skincare brand.',
    img: '/img/skincare-shoot.webp',
    alt: 'Model holding a skincare product by a pool',
    w: 799, h: 796, tint: 'lime',
  },
  {
    title: 'Owubah portraits',
    tag: 'Personal brand',
    cats: ['photo', 'brand'],
    text: 'Editorial portrait series for a personal brand.',
    img: '/img/portrait-white.webp',
    alt: 'Studio portrait of Owubah in a white head wrap',
    w: 800, h: 1200, tall: true, tint: 'sky',
  },
]

export const services = [
  { name: 'Brand Identity', tone: 'lime' },
  { name: 'Brand Activation' },
  { name: 'Website Development', tone: 'peach' },
  { name: 'Brand Strategy' },
  { name: 'Video Production', tone: 'lime' },
  { name: 'Integrated Marketing' },
]

export const clients = [
  { name: 'Phases & Spaces Inc.', style: 'sans' },
  { name: 'schematiq', style: 'bold' },
  { name: 'MEMENTO', style: 'caps' },
  { name: 'Sprig & Sky', style: 'serif' },
  { name: 'Chapter & Co Books', style: 'serif' },
  { name: 'CuraAid+', style: 'bold' },
  { name: 'Crowd zero', style: 'sans' },
  { name: 'Wilderness Watchers Foundation', style: 'sans' },
]

export const contact = {
  email: 'franciscananaowobah49@gmail.com',
  phone: '054 214 2722',
  phoneHref: 'tel:+233542142722',
  handle: '@Owubah_gmb25',
  handleNetworks: 'Instagram · TikTok · Facebook',
  youtube: 'Owubah Adventures',
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'clients', label: 'Clients' },
]
