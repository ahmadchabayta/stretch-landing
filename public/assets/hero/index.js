// Temporary asset module – exports remote Figma URLs until local files are downloaded.
export const imgCitu1 = "https://www.figma.com/api/mcp/asset/d8d98545-995d-4d73-908a-b1beb28401da";
export const imgChatGPT =
  "https://www.figma.com/api/mcp/asset/d4f6a400-bfe6-46ed-bcb5-296146aa81ab";
export const imgVector = "https://www.figma.com/api/mcp/asset/b915dc9d-c60e-413b-9c92-38dcda1ce0cd";
export const imgIconParkOutlineDot =
  "https://www.figma.com/api/mcp/asset/8c11805f-71e4-435a-957b-735472279cd0";

// After running `node scripts/download-figma-assets.js` this file will be replaced
// by a module that re-exports the downloaded local files for faster, permanent use.
