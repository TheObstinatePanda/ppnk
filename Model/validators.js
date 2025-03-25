const validateDependentField = (dependentField, dependentValue, fieldValue, errorMessage) => {
    if (dependentField === dependentValue && fieldValue !== null) {
        throw new Error(errorMessage);
    }
    if (dependentField !== dependentValue && !fieldValue) {
        throw new Error(errorMessage);
    }
};

module.exports = { validateDependentField };