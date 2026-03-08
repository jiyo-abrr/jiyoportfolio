export interface MarqueeLogo {
  src: string;
  alt: string;
  invert?: boolean;
}

export const MARQUEE_LOGOS: MarqueeLogo[] = [
  { src: "/jiyo-logo.png", alt: "Jiyo Logo", invert: false },
  { src: "/pup-logo.png", alt: "Polytechnic University of the Philippines", invert: false },
  { src: "/lamina-logo.png", alt: "Lamina Studios", invert: true },
  { src: "/fmc-logo.png", alt: "FMC Research Solutions", invert: false },
];
