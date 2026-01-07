import GlassCircle from "./GlassCircle";

/**
 * Example usage of GlassCircle component
 */
const GlassCircleExample = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexWrap: "wrap",
        gap: "40px",
        padding: "40px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Basic Glass Circle */}
      <GlassCircle size="150px">
        <div style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Basic Glass</div>
      </GlassCircle>

      {/* Large with high blur */}
      <GlassCircle size="200px" blur={30} glassColor="rgba(255, 255, 255, 0.15)">
        <div style={{ color: "white", fontSize: "24px" }}>✨</div>
      </GlassCircle>

      {/* Strong noise and distortion */}
      <GlassCircle
        size="180px"
        noiseIntensity={0.3}
        distortionScale={15}
        borderColor="rgba(255, 255, 255, 0.4)"
        borderWidth={2}
      >
        <div style={{ color: "white", textAlign: "center" }}>
          <div style={{ fontSize: "32px" }}>🔮</div>
          <div style={{ fontSize: "12px", marginTop: "8px" }}>Distorted</div>
        </div>
      </GlassCircle>

      {/* Dark glass */}
      <GlassCircle
        size="160px"
        glassColor="rgba(0, 0, 0, 0.2)"
        borderColor="rgba(255, 255, 255, 0.15)"
        blur={25}
      >
        <div style={{ color: "white", fontSize: "20px" }}>🌙</div>
      </GlassCircle>

      {/* Minimal noise */}
      <GlassCircle
        size="140px"
        noiseIntensity={0.05}
        blur={15}
        glassColor="rgba(255, 255, 255, 0.2)"
      >
        <div style={{ color: "white", textAlign: "center" }}>Clean Glass</div>
      </GlassCircle>

      {/* Extra large showcase */}
      <GlassCircle
        size="250px"
        blur={35}
        noiseIntensity={0.2}
        distortionScale={12}
        glassColor="rgba(255, 255, 255, 0.1)"
        borderColor="rgba(255, 255, 255, 0.3)"
        borderWidth={2}
      >
        <div style={{ color: "white", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "10px" }}>💎</div>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>Premium</div>
          <div style={{ fontSize: "14px", marginTop: "4px", opacity: 0.8 }}>Glass Effect</div>
        </div>
      </GlassCircle>
    </div>
  );
};

export default GlassCircleExample;
