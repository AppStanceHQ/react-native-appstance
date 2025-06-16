import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
    `The package 'react-native-appstance' doesn't seem to be linked. Make sure: \n\n` +
    Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo Go\n';

const AppstanceModule = NativeModules.Appstance
    ? NativeModules.Appstance
    : new Proxy(
        {},
        {
          get() {
            throw new Error(LINKING_ERROR);
          },
        }
    );

class AppStanceWrapper {

  /**
   * Initialize the AppStance SDK with configuration options
   *
   * @param {Object} config - Configuration object containing API key and optional settings
   * @param {string} config.apiKey - Your AppStance API key (required)
   * @param {boolean} [config.enableStoreKitPurchaseMonitor=true] - Enable automatic StoreKit purchase monitoring
   * @param {string} [config.customUserID] - Custom user identifier for tracking
   * @param {string} [config.fBAnonymousID] - Facebook Anonymous ID for attribution
   * @param {string} [config.revenueCatUserID] - RevenueCat user ID for subscription tracking
   * @param {boolean} [config.debugLogs=false] - Enable debug logging
   * @returns {Promise<Object>} Promise that resolves with response object
   *
   * @example
   * await AppStance.initialize({
   *   apiKey: 'your-api-key-here',
   *   enableStoreKitPurchaseMonitor: true,
   *   customUserID: 'user-123',
   *   debugLogs: true
   * });
   */
  async initialize(config) {
    if (!config?.apiKey) {
      throw new Error('apiKey is required');
    }

    return AppstanceModule.initialize(config);
  }

  /**
   * Track a revenue-generating event with monetary value
   *
   * @param {string} eventName - Name of the revenue event (e.g., 'purchase', 'subscription')
   * @param {number} amount - Revenue amount (must be positive number)
   * @param {string} [currency='USD'] - ISO currency code (e.g., 'USD', 'EUR', 'GBP')
   * @returns {Promise<Object>} Promise that resolves with response object
   *
   * @example
   * // Track a premium subscription purchase
   * await AppStance.trackRevenue('premium_subscription', 9.99, 'USD');
   *
   * // Track an in-app purchase
   * await AppStance.trackRevenue('remove_ads', 2.99, 'USD');
   */
  async trackRevenue(eventName, amount, currency = 'USD') {
    if (!eventName || eventName.trim().length === 0) {
      throw new Error('eventName is required and cannot be empty');
    }

    if (typeof amount !== 'number' || amount < 0) {
      throw new Error('amount must be a non-negative number');
    }

    if (!currency || currency.trim().length === 0) {
      throw new Error('currency is required and cannot be empty');
    }

    return AppstanceModule.trackExternalRevenueEvent({
      eventName: eventName.trim(),
      amount,
      currency: currency.trim().toUpperCase()
    });
  }

  /**
   * Track a non-revenue event that should only be recorded once per user
   *
   * @param {string} eventName - Name of the event to track once
   * @returns {Promise<Object>} Promise that resolves with response object
   *
   * @example
   * // Track tutorial completion (only once per user)
   * await AppStance.trackEventOnce('tutorial_completed');
   *
   * // Track first app launch
   * await AppStance.trackEventOnce('first_launch');
   */
  async trackEventOnce(eventName) {
    if (!eventName || eventName.trim().length === 0) {
      throw new Error('eventName is required and cannot be empty');
    }

    return AppstanceModule.trackNonRevenueEventOnce(eventName.trim());
  }

  /**
   * Get the unique AppStance user identifier
   *
   * @returns {Promise<string>} Promise that resolves to the user ID string
   *
   * @example
   * const userID = await AppStance.getUserID();
   * console.log('AppStance User ID:', userID);
   */
  async getUserID() {
    const response = await AppstanceModule.getAppStanceUserID();
    return response.userID;
  }

  /**
   * Get remote configuration as a parsed JavaScript object
   *
   * @returns {Promise<Object>} Promise that resolves to the parsed configuration object
   *
   * @example
   * const config = await AppStance.getRemoteConfig();
   *
   * // Use configuration values
   * if (config.enableFeatureX) {
   *   // Enable feature X
   * }
   */
  async getRemoteConfig() {
    const response = await AppstanceModule.getRemoteConfigJSONString();
    return response.parsedConfig;
  }

  /**
   * Get raw remote configuration data including both JSON string and parsed object
   *
   * @returns {Promise<Object>} Promise that resolves to configuration response with both formats
   * @returns {Promise<Object>} response - The configuration response
   * @returns {string} response.configJSON - Raw JSON string from remote config
   * @returns {Object} response.parsedConfig - Parsed configuration object (null if parsing failed)
   *
   * @example
   * const configData = await AppStance.getRemoteConfigData();
   * console.log('Raw JSON:', configData.configJSON);
   * console.log('Parsed Config:', configData.parsedConfig);
   */
  async getRemoteConfigData() {
    return AppstanceModule.getRemoteConfigJSONString();
  }

  // Legacy method aliases for backward compatibility

  /**
   * @deprecated Use trackRevenue() instead
   * Track an external revenue event (legacy method)
   *
   * @param {string} eventName - Event name
   * @param {number} amount - Revenue amount
   * @param {string} currency - Currency code
   * @returns {Promise<Object>} Promise that resolves with response object
   */
  async trackExternalRevenueEvent(eventName, amount, currency) {
    return this.trackRevenue(eventName, amount, currency);
  }

  /**
   * @deprecated Use trackEventOnce() instead
   * Track a non-revenue event once (legacy method)
   *
   * @param {string} eventName - Event name
   * @returns {Promise<Object>} Promise that resolves with response object
   */
  async trackNonRevenueEventOnce(eventName) {
    return this.trackEventOnce(eventName);
  }

  /**
   * @deprecated Use getUserID() instead
   * Get AppStance user ID (legacy method)
   *
   * @returns {Promise<Object>} Promise that resolves with user ID response
   * @returns {Promise<Object>} response - The user ID response
   * @returns {string} response.userID - The AppStance user ID
   */
  async getAppStanceUserID() {
    return AppstanceModule.getAppStanceUserID();
  }

  /**
   * @deprecated Use getRemoteConfigData() instead
   * Get remote config JSON string (legacy method)
   *
   * @returns {Promise<Object>} Promise that resolves with configuration response
   * @returns {Promise<Object>} response - The configuration response
   * @returns {string} response.configJSON - Raw JSON string from remote config
   * @returns {Object} response.parsedConfig - Parsed configuration object
   */
  async getRemoteConfigJSONString() {
    return AppstanceModule.getRemoteConfigJSONString();
  }
}

/**
 * AppStance SDK for React Native
 *
 * Provides revenue tracking, user analytics, and remote configuration
 * for your React Native application.
 *
 * @example
 * import AppStance from 'react-native-appstance';
 *
 * // Initialize the SDK
 * await AppStance.initialize({
 *   apiKey: 'your-api-key',
 *   debugLogs: true
 * });
 *
 * // Track revenue
 * await AppStance.trackRevenue('premium_purchase', 9.99, 'USD');
 *
 * // Track events
 * await AppStance.trackEventOnce('tutorial_completed');
 *
 * // Get user data
 * const userID = await AppStance.getUserID();
 * const config = await AppStance.getRemoteConfig();
 */
const AppStance = new AppStanceWrapper();
export default AppStance;

// export { AppStanceWrapper };