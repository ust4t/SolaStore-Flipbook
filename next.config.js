/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    localeDetection: true,
    locales: ["en", "ru", "ar", "fr", "tr", "ru"],
    defaultLocale: "ru",

    domains: [
      {
        domain: "localhost:3000",
        defaultLocale: "ru",
        http: true,
      },
    ],
  },
  images: {
    domains: ["solastore.com.tr", "yenisite.solastore.com.tr"],
    // formats: ["image/webp", "image/avif"],
  },
};
module.exports = nextTranslate(nextConfig);
