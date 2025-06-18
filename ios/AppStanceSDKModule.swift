
import ExpoModulesCore
import AppStanceSDK

public class AppStanceSDKModule: Module {
  public func definition() -> ModuleDefinition {
    Name("AppStanceSDK")

    AsyncFunction("initialize") { (
      apiKey: String,
      enableStoreKitPurchaseMonitor: Bool,
      customUserID: String?,
      fBAnonymousID: String?,
      revenueCatUserID: String?,
      debugLogs: Bool
    ) in
      return AppStance.initialize(
        apiKey: apiKey,
        enableStoreKitPurchaseMonitor: enableStoreKitPurchaseMonitor,
        customUserID: customUserID,
        fBAnonymousID: fBAnonymousID,
        revenueCatUserID: revenueCatUserID,
        debugLogs: debugLogs
      )
    }

    AsyncFunction("trackCustomRevenueEvent") { (
      eventName: String,
      amount: Double,
      currency: String
    ) in
      return AppStance.trackCustomRevenueEvent(eventName: eventName, amount: amount, currency: currency)
    }

    AsyncFunction("trackNonRevenueEventOnce") { (eventName: String) in
      return AppStance.trackNonRevenueEventOnce(eventName: eventName)
    }

    AsyncFunction("getAppStanceUserID") { () in
      return AppStance.getAppStanceUserID()
    }

    AsyncFunction("getRemoteConfigJSONString") { (refresh: Bool) in
      return AppStance.getRemoteConfigJSONString(refresh: refresh)
    }
  }
}