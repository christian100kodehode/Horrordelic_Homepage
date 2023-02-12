import React from "react";
import { releases } from "./release-list";
import { Routes, Route, Router, Link } from "react-router-dom";

export default function RouteComponent() {
  const routes = [
    {
      name: "home",
      path: "/",
    },
    {
      name: "blog",
      path: "/blog",
    },
    {
      name: "about",
      path: "/about",
    },
    {
      name: "hallo",
      path: "/blogssas",
    },
  ];

  // translate (map) your array of objects into jsx
  const routeComponents = routes.map(({ name, path }) => <Route key={name} path={path} element={<h1>{name}</h1>} />);

  return (
    <div className="Linkshereplease">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Router>
        <Routes>{routeComponents}</Routes>
        <Navbar routes={routes} />
      </Router>
      {Outlet}
    </div>
  );
}
