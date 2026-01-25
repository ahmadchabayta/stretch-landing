import PropTypes from "prop-types";
import Typography from "../../Typography/Typography";

const DonutLegend = ({ data, variant, className }) => {
  const items = data || [];

  // 'vertical' variant: legend in a single column
  if (variant === "vertical") {
    return (
      <div className={`flex flex-col gap-3 ${className}`}>
        {items.map((entry, idx) => (
          <div key={entry.name + idx} className="flex items-center gap-2 text-xs text-gray-700">
            <span
              className="inline-block w-3 h-3 rounded-full border border-white shadow"
              style={{ background: entry.fill || "#8884d8" }}
            />
            <span className="truncate font-medium">{entry.name}</span>
            <span className="ml-auto font-semibold text-gray-900">
              {typeof entry.value === "number"
                ? entry.value.toLocaleString(undefined, { maximumFractionDigits: 2 })
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // 'landscape' variant: grid, but only for landscape layout
  // 2 columns, values right-aligned
  const cols = 2;
  const rows = Math.max(1, Math.ceil(items.length / cols));
  const total = rows * cols;
  const cells = Array.from({ length: total }, (_, i) => items[i] || null);

  return (
    <div
      className={`grid grid-cols-2 px-4 gap-x-6 gap-y-4 w-full h-full ${className}`}
      style={{ gridAutoRows: "1fr" }}
    >
      {cells.map((entry, idx) => (
        <div key={idx} className="h-full flex items-center gap-2">
          {entry ? (
            <>
              <span
                className="inline-block w-3 h-3 rounded-full border border-white shadow-sm"
                style={{ background: entry.fill || "#8884d8" }}
              />
              <Typography className="text-gray-700 font-medium leading-tight wrap-break-word line-clamp-2 text-[0.6rem]">
                {entry.name}
              </Typography>
              <span className="ml-auto font-bold text-gray-900 tabular-nums text-[1rem]">
                {typeof entry.value === "number"
                  ? entry.value.toLocaleString(undefined, { maximumFractionDigits: 2 })
                  : entry.value}
              </span>
            </>
          ) : (
            <div aria-hidden className="w-full h-full bg-gray-50/30" />
          )}
        </div>
      ))}
    </div>
  );
};

DonutLegend.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      fill: PropTypes.string,
    }),
  ).isRequired,
  variant: PropTypes.oneOf(["vertical", "landscape"]),
  className: PropTypes.string,
};

DonutLegend.defaultProps = {
  variant: "vertical",
  className: "",
};

export default DonutLegend;
