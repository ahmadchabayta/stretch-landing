// Using a crisp font for the 3D text
export const FONT_URL =
  "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff";

export const SVGIcons = {
  platforms: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M50,50 L206,50 L206,206 L50,206 Z" fill="none" stroke="white" stroke-width="15" rx="20"/><rect x="85" y="85" width="86" height="86" rx="10" fill="white" opacity="0.9"/></svg>`,
  tags: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M110,30 L30,110 L146,226 L226,146 L146,30 Z" fill="none" stroke="white" stroke-width="15"/><circle cx="110" cy="80" r="15" fill="white"/></svg>`,
  reports: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="40" width="176" height="176" rx="16" fill="none" stroke="white" stroke-width="15"/><path d="M80,180 L80,140" stroke="white" stroke-width="15" stroke-linecap="round"/><path d="M128,180 L128,100" stroke="white" stroke-width="15" stroke-linecap="round"/><path d="M176,180 L176,120" stroke="white" stroke-width="15" stroke-linecap="round"/></svg>`,
};

export const cardsData = [
  {
    id: 0,
    label: "Generate Stretch Tag for all Campaign Channels",
    subtext: "",
    description: "Generate Stretch Tag for all Campaign Channels",
    accentColor: "hsl(217, 91%, 50%)", // Blue
    icon: SVGIcons.platforms,
    imageUrl: "assets/stretch_user_experience/nav.webp",
  },
  {
    id: 1,
    label: "Download and add Tag to all creatives",
    subtext: "",
    description: "Download and add Tag to all creatives",
    accentColor: "#a855f7", // Purple
    icon: SVGIcons.tags,
    imageUrl: "assets/stretch_user_experience/tags.webp",
  },
  {
    id: 2,
    label: "Receive report",
    subtext: "",
    description: "Receive report",
    accentColor: "#f97316", // Orange
    icon: SVGIcons.reports,
    imageUrl: "assets/stretch_user_experience/graphs.webp",
  },
];

// Cap FPS to reduce GPU/CPU load while keeping motion smooth enough for the scene
export const FPS_CAP = 45;
