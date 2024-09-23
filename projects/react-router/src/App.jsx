import { Suspense } from "react";
import { Route } from "./Route";
import { Router } from "./Router";
import { lazy } from "react";

const AboutPage = lazy(() => import("./pages/About"));
const HomePage = lazy(() => import("./pages/Home"));
const SearchPage = lazy(() => import("./pages/SearchPage"));

const routes = [
  {
    path: "/:lang/about",
    Component: AboutPage,
  },
  {
    path: "/search/:query",
    Component: SearchPage,
  },
];

function App() {
  return (
    <>
      <h1>Midu Router</h1>
      <main>
        <Suspense fallback={null}>
          <Router routes={routes}>
            <Route path="/" Component={HomePage} />
            <Route path="/about" Component={AboutPage} />
          </Router>
        </Suspense>
      </main>
    </>
  );
}

export default App;
