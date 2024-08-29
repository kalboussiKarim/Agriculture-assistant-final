const { getDefaultConfig } = require("@expo/metro-config"); // Use appropriate import based on Expo or vanilla React Native setup

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push("cjs");
defaultConfig.resolver.assetExts.push("bin");

module.exports = defaultConfig;
