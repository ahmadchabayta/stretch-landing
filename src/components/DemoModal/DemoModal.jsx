import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button } from "..";
import data from "./demo_modal.data.json";

const DemoModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    company: "",
    linkedin: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create mailto link with form data
    const subject = encodeURIComponent("Schedule a Demo");
    const body = encodeURIComponent(
      `Hello Team,\n\nName: ${formData.username}\nEmail: ${formData.email}\nCompany: ${formData.company}\nLinkedIn: ${formData.linkedin}\n\nNote:\n${formData.note}`,
    );

    window.location.href = `mailto:strategy@memob.com?subject=${subject}&body=${body}`;

    // Reset form and close modal
    setFormData({
      username: "",
      email: "",
      company: "",
      linkedin: "",
      note: "",
    });
    onClose();
  };

  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center"
      onClick={onClose}
      role="presentation"
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Modal Container */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className="relative z-10 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[748px] max-w-[748px] mx-auto px-2 sm:px-4"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header Image */}

        {/* Main Modal Card */}
        <div
          className="relative bg-transparent rounded-[20px] sm:rounded-[25px] md:rounded-[35px] border border-black"
          style={{
            boxShadow: "7px 9px 16.5px 0px rgba(0, 0, 0, 0.25)",
            backgroundImage: `url('${data.modal_background}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Form Content */}
          <form
            onSubmit={handleSubmit}
            className="relative pt-[40px] sm:pt-[50px] md:pt-[60px] pb-[40px] sm:pb-[50px] md:pb-[57px] px-[20px] sm:px-[40px] md:px-[61px]"
          >
            {/* Username Input */}
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full bg-white/50 focus:bg-white backdrop-blur-sm rounded-[12px] sm:rounded-[16px] md:rounded-[20px] px-[16px] sm:px-[20px] md:px-[23px] py-[10px] sm:py-[12px] md:py-[13px] mb-4 sm:mb-5 md:mb-6 font-poppins text-[16px] sm:text-[20px] md:text-[24px] text-black placeholder:opacity-30 border-none outline-none focus:ring-2 focus:ring-black/10 transition-colors"
            />

            {/* Email Input */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full bg-white/50 focus:bg-white backdrop-blur-sm rounded-[12px] sm:rounded-[16px] md:rounded-[20px] px-[16px] sm:px-[20px] md:px-[23px] py-[10px] sm:py-[12px] md:py-[13px] mb-4 sm:mb-5 md:mb-6 font-poppins text-[16px] sm:text-[20px] md:text-[24px] text-black placeholder:opacity-30 border-none outline-none focus:ring-2 focus:ring-black/10 transition-colors"
            />

            {/* Company Name Input */}
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              required
              className="w-full bg-white/50 focus:bg-white backdrop-blur-sm rounded-[12px] sm:rounded-[16px] md:rounded-[20px] px-[16px] sm:px-[20px] md:px-[23px] py-[10px] sm:py-[12px] md:py-[13px] mb-4 sm:mb-5 md:mb-6 font-poppins text-[16px] sm:text-[20px] md:text-[24px] text-black placeholder:opacity-30 border-none outline-none focus:ring-2 focus:ring-black/10 transition-colors"
            />

            {/* LinkedIn Input */}
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="Company LinkedIn"
              className="w-full bg-white/50 focus:bg-white backdrop-blur-sm rounded-[12px] sm:rounded-[16px] md:rounded-[20px] px-[16px] sm:px-[20px] md:px-[23px] py-[10px] sm:py-[12px] md:py-[13px] mb-4 sm:mb-5 md:mb-6 font-poppins text-[16px] sm:text-[20px] md:text-[24px] text-black placeholder:opacity-30 border-none outline-none focus:ring-2 focus:ring-black/10 transition-colors"
            />

            {/* Note Textarea */}
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Leave a Note.."
              rows={3}
              className="w-full bg-white/50 focus:bg-white backdrop-blur-sm rounded-[12px] sm:rounded-[16px] md:rounded-[20px] px-[16px] sm:px-[20px] md:px-[23px] py-[10px] sm:py-[12px] md:py-[13px] mb-4 sm:mb-5 md:mb-6 font-poppins text-[18px] sm:text-[20px] md:text-[24px] text-gray-900 placeholder:opacity-30 outline-none resize-none transition-colors"
            />

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-black text-white rounded-[0.5rem] px-[40px] sm:px-[60px] md:px-[74px] py-2 sm:py-2.5 font-poppins font-bold text-[20px] sm:text-[26px] md:text-[32px] hover:bg-black/90 transition-all"
              >
                Schedule a Demo
              </Button>
            </div>
          </form>

          {/* Close button (X) */}
          <button
            type="button"
            onClick={onClose}
            className="absolute -top-5 -right-5 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-accent transition-colors z-20"
            aria-label="Close modal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 5L5 15M5 5L15 15" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

DemoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DemoModal;
