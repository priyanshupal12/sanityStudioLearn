import type { MarketCode, MarketConfig } from "../../types";

export const MARKET_LANGUAGES: Record<MarketCode, MarketConfig> = {
    // 🇺🇸 United States
    us: {
        default: "en",
        languages: [
            { title: "English", value: "en" },
        ],
    },

    // 🇮🇳 India
    in: {
        default: "en",
        languages: [
            { title: "English", value: "en" },
            { title: "Hindi", value: "hi" },
        ],
    },

    // 🇬🇧 United Kingdom
    gb: {
        default: "en",
        languages: [
            { title: "English", value: "en" },
        ],
    },

    // 🇫🇷 France
    fr: {
        default: "fr",
        languages: [
            { title: "French", value: "fr" },
            { title: "English", value: "en" },
        ],
    },

    // 🇩🇪 Germany
    de: {
        default: "de",
        languages: [
            { title: "German", value: "de" },
            { title: "English", value: "en" },
        ],
    },

    // 🇪🇸 Spain
    es: {
        default: "es",
        languages: [
            { title: "Spanish", value: "es" },
            { title: "English", value: "en" },
        ],
    },

    // 🇮🇹 Italy
    it: {
        default: "it",
        languages: [
            { title: "Italian", value: "it" },
            { title: "English", value: "en" },
        ],
    },

    // 🇯🇵 Japan
    jp: {
        default: "ja",
        languages: [
            { title: "Japanese", value: "ja" },
            { title: "English", value: "en" },
        ],
    },

    // 🇨🇦 Canada
    ca: {
        default: "en",
        languages: [
            { title: "English", value: "en" },
            { title: "French", value: "fr" },
        ],
    },

    // 🇦🇺 Australia
    au: {
        default: "en",
        languages: [
            { title: "English", value: "en" },
        ],
    },

    // 🇳🇿 New Zealand
    nz: {
        default: "en",
        languages: [
            { title: "English", value: "en" },
        ],
    },
};