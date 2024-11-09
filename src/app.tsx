import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import "@fontsource/inter";
import { Toaster } from "./components/ui/toast";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Suspense fallback={<>Loading</>}>{props.children}</Suspense>
          <Toaster />
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
