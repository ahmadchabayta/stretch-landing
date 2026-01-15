import PropTypes from "prop-types";
import PremiumGlassCard from "./PremiumGlassCard";
import { cardsData } from "./constants";

const Scene = ({ activeIndex, dragRef }) => {
  return (
    <>
      {/* Environment for reflections */}
      <color attach="background" args={["#020617"]} />
      {/* Perspective grid floor at bottom of viewport */}
      <gridHelper
        args={[100, 100, 0x444444, 0x222222]}
        position={[0, -3.5, -20]}
        rotation={[0, 0, 0]}
      />

      {/* Premium Lighting Setup */}
      <ambientLight intensity={0.4} />

      {/* Key light - main dramatic lighting */}
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" castShadow />

      {/* Rim lights for edge highlights */}
      <pointLight position={[-8, 5, -5]} intensity={1.5} color="#60a5fa" />
      <pointLight position={[8, 5, -5]} intensity={1.5} color="#a855f7" />

      {/* Fill light from below */}
      <pointLight position={[0, -3, 3]} intensity={0.8} color="#3b82f6" />

      {/* Accent lights for glass reflections */}
      <spotLight position={[0, 8, 8]} intensity={2} color="#ffffff" />
      <spotLight position={[-6, 6, 0]} intensity={1.5} color="#8b5cf6" />

      {/* Render Cards */}
      <group position={[0, -0.5, 0]}>
        {cardsData.map((data, index) => (
          <PremiumGlassCard
            key={data.id}
            data={data}
            index={index}
            activeIndex={activeIndex}
            dragRef={dragRef}
          />
        ))}
      </group>
    </>
  );
};

Scene.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  dragRef: PropTypes.object.isRequired,
};

export default Scene;
