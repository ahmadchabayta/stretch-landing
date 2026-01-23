import PropTypes from "prop-types";
import { useEffect, useActionState, useRef } from "react";
import { Button, Flex, Typography } from "..";
import Input from "../UI/Input/Input";
import Textarea from "../UI/Input/Textarea";
import data from "./demo_modal.data.json";
import { preload } from "react-dom";

// Form action function following React 19 best practices
async function submitDemoForm(prevState, formData) {
  const errors = {};

  // Extract form data
  const username = formData.get("username")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const company = formData.get("company")?.toString().trim() || "";
  const linkedin = formData.get("linkedin")?.toString().trim() || "";
  const note = formData.get("note")?.toString().trim() || "";

  // Validate username
  if (!username) {
    errors.username = "Username is required";
  }

  // Validate email
  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  // Validate company
  if (!company) {
    errors.company = "Company name is required";
  }

  // Validate note
  if (!note) {
    errors.note = "Please leave a note";
  } else if (note.length > 500) {
    errors.note = "Note must be 500 characters or less";
  }

  // Return errors if validation fails
  if (Object.keys(errors).length > 0) {
    return { errors, success: false };
  }

  // Create mailto link with form data
  const subject = encodeURIComponent("Schedule a Demo");
  const body = encodeURIComponent(
    `Hello Team,\n\nName: ${username}\nEmail: ${email}\nCompany: ${company}\nLinkedIn: ${linkedin}\n\nNote:\n${note}`,
  );

  window.location.href = `mailto:strategy@memob.com?subject=${subject}&body=${body}`;

  return { errors: {}, success: true };
}

const DemoModal = ({ isOpen, onClose }) => {
  const formRef = useRef(null);
  const [state, formAction, isPending] = useActionState(submitDemoForm, {
    errors: {},
    success: false,
  });

  // Reset form and close modal on success
  useEffect(() => {
    if (state.success && isOpen) {
      formRef.current?.reset();
      onClose();
    }
  }, [state.success, isOpen, onClose]);

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

  // Preload modal images for performance
  preload(data.background.decorative_circle);
  preload(data.background.mobile);
  preload(data.background.large);

  return (
    <>
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
          {/* Responsive background decorative_circleimage absolutely positioned */}
          <img
            className="w-[99px] right-2 md:w-[163px] z-10 absolute lg:right-[15px]"
            src={data.background.decorative_circle}
            alt="decorative circle"
          />
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
          <form ref={formRef} action={formAction} className="relative w-full z-10" noValidate>
            <Flex align="items-start" justify="justify-start">
              <Typography
                as="h2"
                variant="modal-title"
                className="flex flex-col items-start text-left w-full text-balance"
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
                placeholder="Username"
                error={!!state.errors.username}
                errorMessage={state.errors.username}
                disabled={isPending}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                error={!!state.errors.email}
                errorMessage={state.errors.email}
                disabled={isPending}
              />
              <Input
                type="text"
                name="company"
                placeholder="Company Name"
                error={!!state.errors.company}
                errorMessage={state.errors.company}
                disabled={isPending}
              />
              <Input
                type="text"
                name="linkedin"
                placeholder="Company LinkedIn"
                disabled={isPending}
              />
              <Textarea
                name="note"
                placeholder="Leave a Note.."
                rows={3}
                error={!!state.errors.note}
                errorMessage={state.errors.note}
                disabled={isPending}
              />
              <Button
                type="submit"
                variant="footer_contact"
                className="bg-black!"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : data.button_label.contact_button_label}
              </Button>
            </Flex>
          </form>
        </section>
      </div>
    </>
  );
};

DemoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DemoModal;
