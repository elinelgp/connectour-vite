/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout/MainLayout";
import { ErrorLayout } from "../layouts/ErrorLayout/ErrorLayout";

/**
 * Application routes
 * https://reactrouter.com/en/main/routers/create-browser-router
 */
export const router = createBrowserRouter([
  {
    // Routes "clean" / nouveau design system (sans MUI)
    path: "",
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        index: true,
        lazy: () =>
          import("../features/home").then((module) => ({
            Component: module.HomePage,
          })),
      },
      { path: "login", lazy: () => import("./login") },
      { path: "privacy", lazy: () => import("./privacy") },
      { path: "terms", lazy: () => import("./terms") },
    ],
  },
  {
    // Routes legacy / MUI (chargées uniquement quand nécessaire)
    path: "",
    lazy: async () => {
      const { MainLayout: MainLayoutMui } = await import("../components/layout");
      const { RootError } = await import("../components/error");
      const { MuiProviders } = await import("../providers/MuiProviders");

      return {
        element: (
          <MuiProviders>
            <MainLayoutMui />
          </MuiProviders>
        ),
        errorElement: <RootError />,
      };
    },
    children: [
      { path: "dashboard", lazy: () => import("./dashboard") },
      { path: "dashboard/agent", lazy: () => import("./dashboard-agent") },
      { path: "dashboard/prod", lazy: () => import("./dashboard-prod") },
      { path: "tasks", lazy: () => import("./tasks") },
      { path: "messages", lazy: () => import("./messages") },
      {
        path: "artist/management/:artistShortName",
        lazy: () => import("./artist-agent-page"),
      },
      { path: "artist/:artistShortName", lazy: () => import("./artist-page") },
      { path: "admin/hooks-demo", lazy: () => import("./hooks-demo") },
    ],
  },
]);
