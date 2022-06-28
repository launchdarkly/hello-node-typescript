import * as LaunchDarkly from 'launchdarkly-node-server-sdk';

// Set sdkKey to your LaunchDarkly SDK key.
const sdkKey = "";

// Set featureFlagKey to the feature flag key you want to evaluate.
const featureFlagKey = "my-boolean-flag";

const client = LaunchDarkly.init(sdkKey);

// Set up the user properties. This use should appear on your LaunchDarkly
// users dashboard soon after you run the demo.
const user = {
   "name": "Sandy",
   "key": "example-user-key"
};

client.once('ready', function() {
  // TODO : Enter the key for your feature flag here
  client.variation("enable-pinning", user, false, function(err, showFeature) {
    client.track("event-called", user);
    if (showFeature) {
      // application code to show the feature
      console.log("Showing your feature to " + user.key );
    } else {
      // the code to run if the feature is off 
      console.log("Not showing your feature to " + user.key);
    }
    client.flush(function() {
      client.close();
    });
  });
});
