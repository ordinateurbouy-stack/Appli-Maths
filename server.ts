import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { apiRouter } from "./server/apiRoutes";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "5mb" }));

  // Mount shared API routes
  app.use(apiRouter);

  // Vite middleware for development or static serving for production
  const isProduction =
    process.env.NODE_ENV === "production" ||
    (typeof __filename !== "undefined" && __filename.endsWith(".cjs")) ||
    (!process.argv[1]?.endsWith("server.ts") && fs.existsSync(path.join(process.cwd(), "dist", "index.html")));

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Serveur de révision Maths Lycée démarré sur port ${PORT}`);
  });
}

startServer();
