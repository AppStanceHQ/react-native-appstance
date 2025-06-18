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
        NSString *result = [AppStance initializeWithApiKey:apiKey
                                enableStoreKitPurchaseMonitor:enableStoreKit
                                customUserID:customUserID
                                fBAnonymousID:fBAnonymousID
                                revenueCatUserID:revenueCatUserID
                                debugLogs:debugLogs];
        resolve(result);
    } @catch (NSException *exception) {
        reject(@"initialization_error", exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(trackCustomRevenueEvent:(NSString *)eventName
                  amount:(double)amount
                  currency:(NSString *)currency
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSString *result = [AppStance trackCustomRevenueEventWithEventName:eventName amount:amount currency:currency];
        resolve(result);
    } @catch (NSException *exception) {
        reject(@"tracking_error", exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(trackNonRevenueEventOnce:(NSString *)eventName
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSString *result = [AppStance trackNonRevenueEventOnceWithEventName:eventName];
        resolve(result);
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

RCT_EXPORT_METHOD(getRemoteConfigJSONString:(BOOL)refresh
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSString *config = [AppStance getRemoteConfigJSONStringWithRefresh:refresh];
        resolve(config);
    } @catch (NSException *exception) {
        reject(@"get_config_error", exception.reason, nil);
    }
}

@end