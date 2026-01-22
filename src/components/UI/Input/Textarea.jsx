import PropTypes from "prop-types";
import { forwardRef } from "react";

const Textarea = forwardRef(
  (
    {
      placeholder = "",
      value,
      onChange,
      name,
      required = false,
      disabled = false,
      variant = "default",
      error = false,
      errorMessage = "",
      rows = 3,
      className = "",
      ...rest
    },
    ref,
  ) => {
    const baseStyles =
      "w-full border-2 rounded-[0.5rem] px-2 sm:px-3 lg:px-5 py-2 sm:py-2.5 lg:py-3 font-poppins text-[15px] sm:text-[16px] lg:text-[17px] text-black placeholder:text-gray-400 outline-none resize-none transition-all";

    const variants = {
      default: "bg-[#E7EAED] border-gray-200 focus:bg-white focus:border-black",
      warning:
        "bg-red-50 border-red-400 focus:bg-red-50 focus:border-red-500 text-red-900 placeholder:text-red-400",
    };

    const variantClass = error ? variants.warning : variants[variant];

    return (
      <div className="w-full">
        <textarea
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className={`${baseStyles} ${variantClass} ${className} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          {...rest}
        />
        {error && errorMessage && (
          <p className="mt-1 text-sm text-red-600 font-poppins">{errorMessage}</p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

Textarea.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["default", "warning"]),
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  rows: PropTypes.number,
  className: PropTypes.string,
};

export default Textarea;
