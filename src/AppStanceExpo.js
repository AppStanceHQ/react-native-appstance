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
     * @param {boolean} [options.enableSKANAttribution=false] - Enable SKAdNetwork and AdAttributionKit attribution
     * @param {boolean} [options.optOut=false] - Opt out of tracking
     * @param {string} [options.customUserID] - Custom user ID (optional)
     * @param {string} [options.fBAnonymousID] - Facebook anonymous ID (optional)
     * @param {string} [options.revenueCatUserID] - RevenueCat user ID (optional)
     * @param {boolean} [options.debugLogs=false] - Enable debug logs
     * @returns {Promise<string>} Initialization result
     */
    initialize: ({
                     apiKey,
                     enableStoreKitPurchaseMonitor = true,
                     enableSKANAttribution = false,
                     optOut = false,
                     customUserID = undefined,
                     fBAnonymousID = undefined,
                     revenueCatUserID = undefined,
                     debugLogs = false
                 }) => {
        checkModule();
        return AppStanceSDKModule.initialize(
            apiKey,
            enableStoreKitPurchaseMonitor,
            enableSKANAttribution,
            optOut,
            customUserID,
            fBAnonymousID,
            revenueCatUserID,
            debugLogs
        );
    }
,

    /**
     * log custom revenue event
     * @param {Object} options - Event options
     * @param {string} options.eventName - Name of the revenue event (required)
     * @param {number} options.amount - Revenue amount (required)
     * @param {string} options.currency - Currency code, e.g., 'USD' (required)
     * @returns {Promise<string>} log result
     */
    logCustomRevenueEvent: ({ eventName, amount, currency }) => {
        checkModule();
        return AppStanceSDKModule.logCustomRevenueEvent(eventName, amount, currency);
    },

    /**
     * log non-revenue event (only once)
     * @param {Object} options - Event options
     * @param {string} options.eventName - Name of the event (required)
     * @returns {Promise<string>} log result
     */
    logNonRevenueEventOnce: ({ eventName }) => {
        checkModule();
        return AppStanceSDKModule.logNonRevenueEventOnce(eventName);
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
     * Get remote config JSON string
     * @returns {Promise<string>} Remote config JSON string
     */
    getRemoteConfigJSONString: () => {
        checkModule();
        return AppStanceSDKModule.getRemoteConfigJSONString();
    }

};