// Prefix asset paths with the Vite base so they work on GitHub Pages
export const withBase = (path = "") => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export default withBase;
