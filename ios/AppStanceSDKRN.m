#import "AppStanceSDKRN.h"
#import <AppStanceSDK/AppStanceSDK-Swift.h>

@implementation AppStanceSDKRN

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initialize:(NSString *)apiKey
                  enableStoreKitPurchaseMonitor:(BOOL)enableStoreKit
                  enableSKANAttribution:(BOOL)enableSKANAttribution
                  optOut:(BOOL)optOut
                  customUserID:(NSString *)customUserID
                  fBAnonymousID:(NSString *)fBAnonymousID
                  revenueCatUserID:(NSString *)revenueCatUserID
                  debugLogs:(BOOL)debugLogs
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSString *result = [AppStance initializeWithApiKey:apiKey
                                enableStoreKitPurchaseMonitor:enableStoreKit
                                enableSKANAttribution:enableSKANAttribution
                                optOut:optOut
                                customUserID:customUserID
                                fBAnonymousID:fBAnonymousID
                                revenueCatUserID:revenueCatUserID
                                debugLogs:debugLogs];
        resolve(result);
    } @catch (NSException *exception) {
        reject(@"initialization_error", exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(logCustomRevenueEvent:(NSString *)eventName
                  amount:(double)amount
                  currency:(NSString *)currency
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSString *result = [AppStance logCustomRevenueEventWithEventName:eventName amount:amount currency:currency];
        resolve(result);
    } @catch (NSException *exception) {
        reject(@"log_error", exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(logNonRevenueEventOnce:(NSString *)eventName
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSString *result = [AppStance logNonRevenueEventOnceWithEventName:eventName];
        resolve(result);
    } @catch (NSException *exception) {
        reject(@"log_error", exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(getAppStanceUserID:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSString *userID = [AppStance getAppStanceUserID];
        resolve(userID);
    } @catch (NSException *exception) {
        reject(@"get_user_id_error", exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(getRemoteConfigJSONString:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSString *config = [AppStance getRemoteConfigJSONString];
        resolve(config);
    } @catch (NSException *exception) {
        reject(@"get_config_error", exception.reason, nil);
    }
}

@end