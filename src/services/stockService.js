const { getState } = require("../data/store");
const { DOSE_SIZE_GRAMS } = require("../config/constants");

function getAvailableDoses() {
  const availableGrams = getState().stock.availableGrams;
  const availableDoses = Math.floor(availableGrams / DOSE_SIZE_GRAMS);

  return {
    availableDoses,
    availableGrams,
    doseSizeGrams: DOSE_SIZE_GRAMS,
    status: availableDoses > 0 ? "AVAILABLE" : "UNAVAILABLE",
  };
}

module.exports = {
  getAvailableDoses,
};
