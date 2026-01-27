/* eslint-disable import/no-unresolved */
import { useLanguage } from "../../context/LanguageContext";
import { Container } from "../UI";
import Section from "../UI/Section/Section";

import SectionTitle from "./SectionTitle";
import data from "./profile_enrichment.data.json";

import DonutChart from "../UI/Charts/DonutChart/DonutChart";
import GraphChart from "../UI/Charts/GraphChart";
import SimpleTable from "../UI/Charts/SimpleTable";
import donutData from "./donut.data.json";
import graphData from "./graph.data.json";
import tableData from "./simple_table.data.json";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useMediaQuery from "../../hooks/useMediaQuery";

const ProfileEnrichmentAlternative = () => {
  const { language } = useLanguage();
  const labels = data.languages?.[language] || data.languages?.en;
  const is2Xl = useMediaQuery("(min-width: 1536px)");
  const isXl = useMediaQuery("(min-width: 1280px)");
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isMobile = useMediaQuery("(min-width: 375px)");
  return (
    <Section className="my-6 min-h-0!">
      <Container className="relative z-10">
        <SectionTitle labels={labels} />
      </Container>
      <Swiper
        centeredSlides={true}
        spaceBetween={20}
        slidesPerView={is2Xl ? 3 : isXl ? 2.5 : isLg ? 1.5 : isTablet ? 1.5 : isMobile ? 1 : 1}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        loop={true}
        speed={2000}
        modules={[Mousewheel, Keyboard, Pagination, Autoplay]}
        direction="horizontal"
        mousewheel={{ forceToAxis: true, releaseOnEdges: false }}
        keyboard={{ enabled: true }}
        autoplay={{
          delay: 500, // or your preferred delay in ms
          disableOnInteraction: true, // stops autoplay when user interacts
        }}
      >
        <SwiperSlide>
          <DonutChart
            chartTitle={donutData.brand_affinity.chartTitle}
            data={donutData.brand_affinity.data}
          />
        </SwiperSlide>
        <SwiperSlide>
          <DonutChart
            chartTitle={donutData.brand_categories.chartTitle}
            data={donutData.brand_categories.data}
          />
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="grid grid-rows-[1fr_auto_1fr] h-full min-h-165 select-none w-full"
            style={{ alignItems: "center" }}
          >
            <div className="row-start-1 w-full h-full flex-1">
              <SimpleTable title={tableData.chartTitle} data={tableData.chartData} />
            </div>
            <div className="row-start-2 flex-1 my-2.5" />
            <div className="row-start-3 w-full h-full flex-1">
              <SimpleTable title={tableData.chartTitle} data={tableData.chartData} />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <DonutChart
            chartTitle={donutData.top_interests.chartTitle}
            data={donutData.top_interests.data}
          />
        </SwiperSlide>

        <SwiperSlide>
          <DonutChart chartTitle={donutData.gender.chartTitle} data={donutData.gender.data} />
        </SwiperSlide>

        <SwiperSlide>
          <DonutChart chartTitle={donutData.device_os.chartTitle} data={donutData.device_os.data} />
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid grid-rows-[auto_1fr_auto] h-full min-h-165 select-none w-full">
            <div className="row-start-1 w-full h-full">
              <GraphChart data={graphData.age} title="Age" />
            </div>
            <div className="row-start-2 flex-1" />
            <div className="row-start-3 w-full h-full">
              <GraphChart data={graphData.gender} title="Gender" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </Section>
  );
};

export default ProfileEnrichmentAlternative;
