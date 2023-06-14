import * as LaunchDarkly from '@launchdarkly/node-server-sdk';

// Set sdkKey to your LaunchDarkly SDK key.
const sdkKey = "";

// Set featureFlagKey to the feature flag key you want to evaluate.
const featureFlagKey = "my-boolean-flag";

// Set up the context properties. This use should appear on your LaunchDarkly
// contexts dashboard soon after you run the demo.
const context = {
  "kind": "user",
  "name": "Sandy",
  "key": "example-context-key"
};

function showMessage(s: string) {
  console.log("*** " + s);
  console.log("");
}

const client = LaunchDarkly.init(sdkKey);

client.once('ready', function () {
  showMessage("SDK successfully initialized!");
  client.variation(featureFlagKey, context, false, function (err, showFeature) {
    client.track("event-called", context);
    if (showFeature) {
      // application code to show the feature
      showMessage("Feature flag '" + featureFlagKey + "' is true for this context");
    } else {
      // the code to run if the feature is off
      showMessage("Feature flag '" + featureFlagKey + "' is false for this context");
    }

    // Here we ensure that the SDK shuts down cleanly and has a chance to deliver analytics
    // events to LaunchDarkly before the program exits. If analytics events are not delivered,
    // the context properties and flag usage statistics will not appear on your dashboard. In a
    // normal long-running application, the SDK would continue running and events would be
    // delivered automatically in the background.
    client.flush(function () {
      client.close();
    });
  });
});
