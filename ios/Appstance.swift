import Foundation
import React
import AppStanceSDK // Your original SDK import

@objc(Appstance)
class Appstance: NSObject, RCTBridgeModule {

    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }

    @objc
    static func moduleName() -> String {
        return "Appstance"
    }

    // MARK: - Initialize

    @objc(initialize:resolver:rejecter:)
    func initialize(
        config: [String: Any],
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let apiKey = config["apiKey"] as? String else {
            reject("INVALID_CONFIG", "apiKey is required", nil)
            return
        }

        let enableStoreKitPurchaseMonitor = config["enableStoreKitPurchaseMonitor"] as? Bool ?? true
        let customUserID = config["customUserID"] as? String
        let fBAnonymousID = config["fBAnonymousID"] as? String
        let revenueCatUserID = config["revenueCatUserID"] as? String
        let debugLogs = config["debugLogs"] as? Bool ?? false

        DispatchQueue.main.async {
            AppStance.initialize(
                apiKey: apiKey,
                enableStoreKitPurchaseMonitor: enableStoreKitPurchaseMonitor,
                customUserID: customUserID,
                fBAnonymousID: fBAnonymousID,
                revenueCatUserID: revenueCatUserID,
                debugLogs: debugLogs
            )

            resolve([
                "success": true,
                "message": "AppStance initialized successfully"
            ])
        }
    }

    // MARK: - Track External Revenue Event

    @objc(trackExternalRevenueEvent:resolver:rejecter:)
    func trackExternalRevenueEvent(
        eventData: [String: Any],
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let eventName = eventData["eventName"] as? String else {
            reject("INVALID_PARAMS", "eventName is required", nil)
            return
        }

        guard let amount = eventData["amount"] as? Double else {
            reject("INVALID_PARAMS", "amount is required and must be a number", nil)
            return
        }

        guard let currency = eventData["currency"] as? String else {
            reject("INVALID_PARAMS", "currency is required", nil)
            return
        }

        AppStance.trackExternalRevenueEvent(eventName, amount: amount, currency: currency)

        resolve([
            "success": true,
            "message": "External revenue event tracked successfully",
            "eventName": eventName,
            "amount": amount,
            "currency": currency
        ])
    }

    // MARK: - Track Non-Revenue Event Once

    @objc(trackNonRevenueEventOnce:resolver:rejecter:)
    func trackNonRevenueEventOnce(
        eventName: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard !eventName.isEmpty else {
            reject("INVALID_PARAMS", "eventName cannot be empty", nil)
            return
        }

        AppStance.trackNonRevenueEventOnce(eventName)

        resolve([
            "success": true,
            "message": "Non-revenue event tracked successfully",
            "eventName": eventName
        ])
    }

    // MARK: - Get AppStance User ID

    @objc(getAppStanceUserID:rejecter:)
    func getAppStanceUserID(
        resolve: RCTPromiseResolveBlock,
        reject: RCTPromiseRejectBlock
    ) {
        let userID = AppStance.getAppStanceUserID()

        resolve([
            "userID": userID
        ])
    }

    // MARK: - Get Remote Config JSON String

    @objc(getRemoteConfigJSONString:rejecter:)
    func getRemoteConfigJSONString(
        resolve: RCTPromiseResolveBlock,
        reject: RCTPromiseRejectBlock
    ) {
        let configJSON = AppStance.getRemoteConfigJSONString()

        if let data = configJSON.data(using: .utf8) {
            do {
                let jsonObject = try JSONSerialization.jsonObject(with: data, options: [])
                resolve([
                    "configJSON": configJSON,
                    "parsedConfig": jsonObject
                ])
            } catch {
                resolve([
                    "configJSON": configJSON,
                    "parsedConfig": NSNull()
                ])
            }
        } else {
            resolve([
                "configJSON": configJSON,
                "parsedConfig": NSNull()
            ])
        }
    }
}

#if RCT_NEW_ARCH_ENABLED
extension Appstance: NativeAppstanceSpec {
    // Turbo Module implementation
}
#endif