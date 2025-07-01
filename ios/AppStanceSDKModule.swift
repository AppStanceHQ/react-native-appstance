import ExpoModulesCore
import AppStanceSDK

public class AppStanceSDKModule: Module {
  public func definition() -> ModuleDefinition {
    Name("AppStanceSDK")

    AsyncFunction("initialize") { (
      apiKey: String,
      enableStoreKitPurchaseMonitor: Bool,
      enableSKANAttribution: Bool,
      optOut: Bool,
      customUserID: String?,
      fBAnonymousID: String?,
      revenueCatUserID: String?,
      debugLogs: Bool
    ) in
      return AppStance.initialize(
        apiKey: apiKey,
        enableStoreKitPurchaseMonitor: enableStoreKitPurchaseMonitor,
        enableSKANAttribution: enableSKANAttribution,
        optOut: optOut,
        customUserID: customUserID,
        fBAnonymousID: fBAnonymousID,
        revenueCatUserID: revenueCatUserID,
        debugLogs: debugLogs
      )
    }

    AsyncFunction("logCustomRevenueEvent") { (
      eventName: String,
      amount: Double,
      currency: String
    ) in
      return AppStance.logCustomRevenueEvent(eventName: eventName, amount: amount, currency: currency)
    }

    AsyncFunction("logNonRevenueEventOnce") { (eventName: String) in
      return AppStance.logNonRevenueEventOnce(eventName: eventName)
    }

    AsyncFunction("getAppStanceUserID") { () in
      return AppStance.getAppStanceUserID()
    }

    AsyncFunction("getRemoteConfigJSONString") { () in
      return AppStance.getRemoteConfigJSONString()
    }
  }
}