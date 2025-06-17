

import { requireOptionalNativeModule } from 'expo-modules-core';

// Get the native module using the newer API with optional handling
const AppStanceSDKModule = requireOptionalNativeModule('AppStanceSDK');

// Helper function to check if module is available
const checkModule = () => {
    if (!AppStanceSDKModule) {
        throw new Error('AppStanceSDK native module is not available. Make sure you have installed the native dependencies.');
    }
};


export default {
    /**
     * Initialize AppStance SDK
     * @param {string} apiKey - Your AppStance API key
     * @param {boolean} enableStoreKitPurchaseMonitor - Enable StoreKit purchase monitoring (default: true)
     * @param {string|null} customUserID - Custom user ID (optional)
     * @param {string|null} fBAnonymousID - Facebook anonymous ID (optional)
     * @param {string|null} revenueCatUserID - RevenueCat user ID (optional)
     * @param {boolean} debugLogs - Enable debug logs (default: false)
     */
    initialize: (
        apiKey,
        enableStoreKitPurchaseMonitor = true,
        customUserID = null,
        fBAnonymousID = null,
        revenueCatUserID = null,
        debugLogs = false
    ) => {
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
     * @param {string} eventName - Name of the revenue event
     * @param {number} amount - Revenue amount
     * @param {string} currency - Currency code (e.g., 'USD')
     */
    trackExternalRevenueEvent: (eventName, amount, currency) => {
        return AppStanceSDKModule.trackExternalRevenueEvent(eventName, amount, currency);
    },

    /**
     * Track non-revenue event (only once)
     * @param {string} eventName - Name of the event
     */
    trackNonRevenueEventOnce: (eventName) => {
        return AppStanceSDKModule.trackNonRevenueEventOnce(eventName);
    },

    /**
     * Get AppStance user ID
     * @returns {Promise<string>} AppStance user ID
     */
    getAppStanceUserID: () => {
        return AppStanceSDKModule.getAppStanceUserID();
    },

    /**
     * Get remote config as JSON string
     * @returns {Promise<string>} Remote config JSON string
     */
    getRemoteConfigJSONString: () => {
        return AppStanceSDKModule.getRemoteConfigJSONString();
    }
};