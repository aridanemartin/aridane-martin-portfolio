export const HeroVariant = {
  MAIN: "main",
  SECTION: "section",
} as const;

export type HeroVariantType = (typeof HeroVariant)[keyof typeof HeroVariant];
