#import <React/RCTBridgeModule.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNAppstanceSpec.h"
@interface Appstance : NSObject <NativeAppstanceSpec>
#else
@interface Appstance : NSObject <RCTBridgeModule>
#endif

@end