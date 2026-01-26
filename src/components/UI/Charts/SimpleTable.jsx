import PropTypes from "prop-types";
import { useInViewAnimation } from "../../../hooks";

const SimpleTable = ({ title, data }) => {
  const [tableRef, inView] = useInViewAnimation({ threshold: 0.2 });
  return (
    <div
      ref={tableRef}
      className="glass-card glass-reflection rounded-2xl h-full max-h-[330px] shadow-md p-8 flex flex-col w-full max-w-[95vw] mx-auto relative overflow-hidden"
    >
      <div className="relative z-10">
        <h3 className="font-semibold text-lg mb-4 text-center">{title}</h3>
        <table className="w-full text-left">
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={row.label || idx}
                className={`border-none transition-all duration-700 ease-out ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <td className="py-1 pr-4 text-gray-700 whitespace-nowrap">{row.label}</td>
                <td className="py-1 text-right font-medium text-gray-900 whitespace-nowrap">
                  {row.value} <span className="text-xs text-gray-400">%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* gradient overlay at bottom (white to transparent) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 z-20"
        style={{
          background:
            "linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />
    </div>
  );
};

SimpleTable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ).isRequired,
};

export default SimpleTable;
