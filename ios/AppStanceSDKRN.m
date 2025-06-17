#import "AppStanceSDKRN.h"
#import <AppStanceSDK/AppStanceSDK-Swift.h>

@implementation AppStanceSDKRN

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initialize:(NSString *)apiKey
                  enableStoreKitPurchaseMonitor:(BOOL)enableStoreKit
                  customUserID:(NSString *)customUserID
                  fBAnonymousID:(NSString *)fBAnonymousID
                  revenueCatUserID:(NSString *)revenueCatUserID
                  debugLogs:(BOOL)debugLogs
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [AppStance initializeWithApiKey:apiKey
                enableStoreKitPurchaseMonitor:enableStoreKit
                customUserID:customUserID
                fBAnonymousID:fBAnonymousID
                revenueCatUserID:revenueCatUserID
                debugLogs:debugLogs];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(@"initialization_error", exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(trackExternalRevenueEvent:(NSString *)eventName
                  amount:(double)amount
                  currency:(NSString *)currency
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [AppStance trackExternalRevenueEvent:eventName amount:amount currency:currency];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(@"tracking_error", exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(trackNonRevenueEventOnce:(NSString *)eventName
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        [AppStance trackNonRevenueEventOnce:eventName];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(@"tracking_error", exception.reason, nil);
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