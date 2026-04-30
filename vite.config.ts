import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(async () => {
  const plugins = [react(), tailwindcss()];
  try {
    // @ts-expect-error Optional Design Arena source tag injector is generated at runtime.
    const m = await import("./.vite-source-tags.js");
    plugins.push(m.sourceTags());
  } catch {
    // Optional local-only file is absent in normal production builds.
  }
  return { plugins };
});
//   return {
//     plugins,
//     server: {
//       proxy: {
//         "/api/v1": {
//           target: "https://grantbridge.onrender.com",
//           changeOrigin: true,
//           secure: true,
//         },
//       },
//     },
//   };
// });
