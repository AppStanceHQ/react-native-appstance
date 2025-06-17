// Expo implementation (your current code moved here)
import { requireOptionalNativeModule } from 'expo-modules-core';

const AppStanceSDKModule = requireOptionalNativeModule('AppStanceSDK');

const checkModule = () => {
    if (!AppStanceSDKModule) {
        throw new Error('AppStanceSDK native module is not available. Make sure you have installed the native dependencies.');
    }
};

export default {
    /**
     * Initialize AppStance SDK
     * @param {Object} options - Configuration options
     * @param {string} options.apiKey - Your AppStance API key (required)
     * @param {boolean} [options.enableStoreKitPurchaseMonitor=true] - Enable StoreKit purchase monitoring
     * @param {string} [options.customUserID] - Custom user ID (optional)
     * @param {string} [options.fBAnonymousID] - Facebook anonymous ID (optional)
     * @param {string} [options.revenueCatUserID] - RevenueCat user ID (optional)
     * @param {boolean} [options.debugLogs=false] - Enable debug logs
     */
    initialize: ({
        apiKey,
        enableStoreKitPurchaseMonitor = true,
        customUserID = undefined,
        fBAnonymousID = undefined,
        revenueCatUserID = undefined,
        debugLogs = false
    }) => {
        checkModule();
        return AppStanceSDKModule.initialize(
            apiKey,
            enableStoreKitPurchaseMonitor,
            customUserID,
            fBAnonymousID,
            revenueCatUserID,
            debugLogs
        );
    },

    /**
     * Track external revenue event
     * @param {Object} options - Event options
     * @param {string} options.eventName - Name of the revenue event (required)
     * @param {number} options.amount - Revenue amount (required)
     * @param {string} options.currency - Currency code, e.g., 'USD' (required)
     */
    trackExternalRevenueEvent: ({ eventName, amount, currency }) => {
        checkModule();
        return AppStanceSDKModule.trackExternalRevenueEvent(eventName, amount, currency);
    },

    /**
     * Track non-revenue event (only once)
     * @param {Object} options - Event options
     * @param {string} options.eventName - Name of the event (required)
     */
    trackNonRevenueEventOnce: ({ eventName }) => {
        checkModule();
        return AppStanceSDKModule.trackNonRevenueEventOnce(eventName);
    },

    /**
     * Get AppStance user ID
     * @returns {Promise<string>} AppStance user ID
     */
    getAppStanceUserID: () => {
        checkModule();
        return AppStanceSDKModule.getAppStanceUserID();
    },

    /**
     * Get remote config as JSON string
     * @returns {Promise<string>} Remote config JSON string
     */
    getRemoteConfigJSONString: () => {
        checkModule();
        return AppStanceSDKModule.getRemoteConfigJSONString();
    }
};