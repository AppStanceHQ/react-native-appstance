// Main entry point - automatically detects environment
let AppStance;

try {
    // Try Expo version first (will work in Expo environments)
    AppStance = require('./src/AppStanceExpo').default;
} catch (error) {
    // Fall back to React Native version for vanilla RN users
    try {
        AppStance = require('./src/AppStanceRN').default;
    } catch (fallbackError) {
        throw new Error(
            'AppStance SDK is not properly installed. ' +
            'Please follow the installation guide for your environment (Expo or React Native).'
        );
    }
}

export default AppStance;