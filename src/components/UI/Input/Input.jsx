import PropTypes from "prop-types";
import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      type = "text",
      placeholder = "",
      value,
      onChange,
      name,
      required = false,
      disabled = false,
      variant = "default",
      error = false,
      errorMessage = "",
      className = "",
      ...rest
    },
    ref,
  ) => {
    const baseStyles =
      "w-full border rounded-[0.5rem] px-2 sm:px-3 lg:px-5 min-h-[38px] sm:min-h-[44px] lg:min-h-[52px] h-[2.5rem] sm:h-[2.75rem] lg:h-[3rem] font-poppins text-[15px] sm:text-[16px] lg:text-[17px] text-black placeholder:text-gray-400 outline-none transition-all";

    const variants = {
      default: "bg-[#E7EAED] border-gray-200 focus:bg-white focus:border-black",
      warning:
        "bg-red-50 border-red-400 focus:bg-red-50 focus:border-red-500 text-red-900 placeholder:text-red-400",
    };

    const variantClass = error ? variants.warning : variants[variant];

    return (
      <div className="w-full">
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
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

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["default", "warning"]),
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
