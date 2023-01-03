tsconfig.json

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    // ...
    "baseUrl": "./",
    "paths": {
      "@lib/*": ["./src/lib/*"],
      "@store": ["./src/stores/store.ts"]
    }
  }
  // ...
}
```

vite.config.ts

```ts
import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import path from "path";

const config: UserConfig = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@store": path.resolve(__dirname, "./src/stores/store.ts"),
    },
  },
};

export default config;
```
