require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'react-native-appstance'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.platforms      = {
    :ios => '13.0'
  }
  s.swift_version  = '5.4'
  s.source         = { git: 'https://github.com/AppStanceHQ/react-native-appstance' }
  s.static_framework = true

  # Dependencies
  s.dependency 'AppStanceSDK', '0.6.6'

  # Conditionally add ExpoModulesCore only if available
  if defined?(Pod::Specification) && Pod::Specification.method_defined?(:dependency)
    begin
      s.dependency 'ExpoModulesCore'
    rescue
      # ExpoModulesCore not available, skip it
    end
  end

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
end