// Helper function to determine if cell should be checked
export const getCellCheckedState = (channel, isDesktop, activeTab, cellType) => {
  if (isDesktop) {
    return channel[`impressions_${cellType}_checked`];
  }
  return activeTab === "impressions"
    ? channel[`impressions_${cellType}_checked`]
    : channel[`clicks_${cellType}_checked`];
};
