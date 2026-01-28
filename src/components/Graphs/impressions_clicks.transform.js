// Utility to transform the JSON data into recharts-friendly array
import raw from "./impressions_clicks.data.json";

export default function transformImpressionsClicksData() {
  const { labels, series } = raw;
  const impressions = series.find((s) => s.name === "Impressions").data;
  const clicks = series.find((s) => s.name === "Clicks").data;
  return labels.map((label, i) => ({
    label,
    Impressions: impressions[i],
    Clicks: clicks[i],
  }));
}
