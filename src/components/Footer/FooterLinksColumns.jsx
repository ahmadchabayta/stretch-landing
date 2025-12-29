import PropTypes from "prop-types";
import FooterSocialIcons from "./FooterSocialIcons";
import { Flex, List } from "..";

const FooterLinksColumns = ({ labels, language }) => {
  const allLinks = labels.footer_links;
  const splitIntoColumns = (columns) => {
    const size = Math.ceil(allLinks.length / columns) || 1;
    return Array.from({ length: columns }, (_, idx) =>
      allLinks.slice(idx * size, (idx + 1) * size),
    ).filter((column) => column.length);
  };

  const twoColumnSplit = splitIntoColumns(2);
  const threeColumnSplit = splitIntoColumns(3);

  const listClass =
    "list-none text-white text-center space-y-[7px] mb-6 md:mb-0 md:text-left md:space-y-[18px]";
  const listClassXL =
    "list-none text-white text-center space-y-[7px] mb-6 xl:mb-0 xl:text-left xl:space-y-[18px]";
  const linkClass = `cursor-pointer text-[18px] md:text-[22px] lg:text-[28px] font-bold md:text-left ${
    language === "ar" ? "font-[Tajawal,sans-serif]" : ""
  }`;

  const renderColumn = (links, key, listClasses, showIcons) => (
    <Flex key={key} direction="flex-col" align="items-center" className="md:items-start">
      <List className={listClasses}>
        {links.map((link, i) => (
          <List.Item key={link + i} className={linkClass}>
            {link}
          </List.Item>
        ))}
      </List>
      {showIcons ? <FooterSocialIcons /> : null}
    </Flex>
  );

  return (
    <>
      {/* Mobile: single column, no inter-column gap, icons centered under full list */}
      <Flex className="w-full md:hidden" direction="flex-col" align="items-center">
        <List className={listClass}>
          {allLinks.map((link, i) => (
            <List.Item key={link + i} className={linkClass}>
              {link}
            </List.Item>
          ))}
        </List>
        <FooterSocialIcons />
      </Flex>

      {/* Tablet / medium screens: two columns, icons under last column */}
      <Flex
        className="hidden w-full items-center md:flex md:items-start xl:hidden"
        direction="flex-col md:flex-row"
        justify="md:justify-center"
        gap="md:gap-[48px] lg:gap-[64px]"
      >
        {twoColumnSplit.map((column, columnIndex) =>
          renderColumn(
            column,
            `col-2-${columnIndex}`,
            listClass,
            columnIndex === twoColumnSplit.length - 1,
          ),
        )}
      </Flex>

      {/* Large screens: three columns, icons under last column */}
      <Flex
        className="hidden w-full items-center xl:flex xl:items-start"
        direction="flex-col xl:flex-row"
        justify="xl:justify-center"
        gap="xl:gap-[48px] 3xl:gap-[64px]"
      >
        {threeColumnSplit.map((column, columnIndex) =>
          renderColumn(
            column,
            `col-3-${columnIndex}`,
            listClassXL,
            columnIndex === threeColumnSplit.length - 1,
          ),
        )}
      </Flex>
    </>
  );
};

FooterLinksColumns.propTypes = {
  labels: PropTypes.shape({
    footer_links: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
};

export default FooterLinksColumns;
