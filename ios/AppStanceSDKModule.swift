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
    ) -> Void in
      AppStance.initialize(
        apiKey: apiKey,
        enableStoreKitPurchaseMonitor: enableStoreKitPurchaseMonitor,
        customUserID: customUserID,
        fBAnonymousID: fBAnonymousID,
        revenueCatUserID: revenueCatUserID,
        debugLogs: debugLogs
      )
    }

    AsyncFunction("trackExternalRevenueEvent") { (
      eventName: String,
      amount: Double,
      currency: String
    ) -> Void in
      AppStance.trackExternalRevenueEvent(eventName, amount: amount, currency: currency)
    }

    AsyncFunction("trackNonRevenueEventOnce") { (eventName: String) -> Void in
      AppStance.trackNonRevenueEventOnce(eventName)
    }

    AsyncFunction("getAppStanceUserID") { () -> String in
      return AppStance.getAppStanceUserID()
    }

    AsyncFunction("getRemoteConfigJSONString") { () -> String in
      return AppStance.getRemoteConfigJSONString()
    }
  }
}