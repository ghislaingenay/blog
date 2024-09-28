type ColorName = "primary" | "secondary" | "accent";
type ColorPalette = Record<
  ColorName,
  {
    description: string;
    light: Record<string, string>;
    dark: Record<string, string>;
  }
>;

export const GITHUB_COLOR = "#181717";
export const LINKEDIN_COLOR = "#0A66C2";

export const COLOR_PALETTE: ColorPalette = {
  primary: {
    description: "Blue represents professionalism, trust, and calmness.",
    light: {
      shade1: "#D7E5F7",
      shade2: "#B0CFF2",
      shade3: "#6FA6D9",
      shade4: "#506EAB",
      shade5: "#1A2B66",
    },
    dark: {
      shade1: "#243A5E",
      shade2: "#2B4975",
      shade3: "#1A3972",
      shade4: "#0C234F",
      shade5: "#04112D",
    },
  },
  secondary: {
    description: "Warm brown/orange evokes friendliness and approachability.",
    light: {
      shade1: "#F4DEC4",
      shade2: "#E6B269",
      shade3: "#C59357",
      shade4: "#9F7B4B",
      shade5: "#8D6142",
    },
    dark: {
      shade1: "#8B674B",
      shade2: "#6E543C",
      shade3: "#5A462F",
      shade4: "#473726",
      shade5: "#372C20",
    },
  },
  accent: {
    description:
      "Teal/Cyan adds freshness, representing creativity and energy.",
    light: {
      shade1: "#E0F7FA",
      shade2: "#B2EBF2",
      shade3: "#80DEEA",
      shade4: "#4DD0E1",
      shade5: "#26C6DA",
    },
    dark: {
      shade1: "#4AA3A8",
      shade2: "#318A8F",
      shade3: "#267078",
      shade4: "#1A5C60",
      shade5: "#124549",
    },
  },
};
