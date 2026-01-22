import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button, Flex, Typography } from "..";
import Input from "../UI/Input/Input";
import Textarea from "../UI/Input/Textarea";
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
    <div className="fixed inset-0 z-9999 flex items-center justify-center" role="presentation">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClose();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
      />

      {/* Modal Content with absolute image */}
      <section
        className="relative w-[356px] xs:w-[376px] sm:w-[506px] md:w-[606px] lg:w-[706px]  flex justify-center items-start px-4 sm:px-6 md:px-12 py-6"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        style={{ minHeight: 500 }}
      >
        {/* Responsive background image absolutely positioned */}
        <img
          src={data.background.mobile}
          alt="Modal background"
          className="absolute inset-0 w-full h-full object-fill md:hidden pointer-events-none select-none z-0"
          draggable={false}
        />
        <img
          src={data.background.large}
          alt="Modal background large"
          className="absolute inset-0 w-full h-full object-fill hidden md:block pointer-events-none select-none z-0"
          draggable={false}
        />
        {/* Modal form content above image */}
        <form className="relative w-full z-10" onSubmit={handleSubmit}>
          <Flex align="items-start" justify="justify-start">
            <Typography
              as="h2"
              variant="modal-title"
              className="flex flex-col items-start text-left w-full"
            >
              {data.modal_title.part1}
              <Typography.Text className="text-black text-[24px] text-left w-full">{` ${data.modal_title.part2}`}</Typography.Text>
            </Typography>
          </Flex>
          <Flex
            spaceY="space-y-2.5 md:space-y-3 2xl:space-y-8"
            className="w-full mx-auto mt-12"
            direction="flex-col"
            align="items-center"
          >
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
            <Input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              required
            />
            <Input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="Company LinkedIn"
            />
            <Textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Leave a Note.."
              rows={3}
            />
            <Button variant="footer_contact" className="bg-black!">
              {data.button_label.contact_button_label}
            </Button>
          </Flex>
        </form>
      </section>
    </div>
  );
};

DemoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DemoModal;
