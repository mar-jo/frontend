function createToggleRouter(featureConfig) {
    return {
        setFeature(featureName, isEnabled) {
            featureConfig[featureName] = isEnabled;
        },
        featureIsEnabled(featureName) {
            return featureConfig[featureName];
        }
    };
}

export default createToggleRouter;