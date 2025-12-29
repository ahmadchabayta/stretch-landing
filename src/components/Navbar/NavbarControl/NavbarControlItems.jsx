import PropTypes from "prop-types";
import { List, Flex, Typography } from "../../../components";

const NavbarControlItems = ({ languages, open, changeLanguage, setOpen }) => (
  <>
    {open && (
      <List
        role="listbox"
        className="absolute right-0 left-0 z-50 mt-2 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xl xl:right-0 xl:left-auto xl:w-52"
      >
        {languages.map((lang) => (
          <List.Item key={lang.code}>
            <button
              type="button"
              onClick={() => {
                changeLanguage(lang.code);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-50 active:bg-gray-100"
            >
              <Flex
                flex={true}
                align="items-center"
                justify="justify-center"
                className="h-8 w-8 shrink-0 overflow-hidden rounded-full"
              >
                <img src={lang.flag} alt={lang.label} className="h-full w-full object-cover" />
              </Flex>
              <Typography as="span" className="flex-1">
                {lang.label}
              </Typography>
            </button>
          </List.Item>
        ))}
      </List>
    )}
  </>
);

NavbarControlItems.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      flag: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  open: PropTypes.bool.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default NavbarControlItems;
