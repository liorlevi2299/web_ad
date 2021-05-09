class CorrFeatures{
    feature;
    featureCorr;
    correlation;
    line_reg;
    threshold;

    constructor(feature, featureCorr, correlation , line_reg, threshold) {
        this.feature = feature;
        this.featureCorr = featureCorr;
        this.correlation = correlation;
        this.line_reg = line_reg;
        this.threshold = threshold;
    }
}

module.exports = CorrFeatures;