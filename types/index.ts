export type ImageParent = {
  imageType?: 'url' | 'upload'
}

export type MarketCode =
  | "us"
  | "in"
  | "gb"
  | "fr"
  | "de"
  | "es"
  | "it"
  | "jp"
  | "ca"
  | "au"
  | "nz";

export type MarketConfig = {
  default: string;
  languages: {
    title: string;
    value: string;
  }[];
};
