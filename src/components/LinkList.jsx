import { releases } from "../components/release-list";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";

const LinkList = () => {
  const links = releases.map(({ artist, path }) => (
    <Link key={artist} to={path}>
      {artist}
    </Link>
  ));

  const routeComponents = releases.map(({ artist, path }) => <Route key={artist} path={path} element={<h1>{artist}</h1>} />);

  return <div>{links}</div>;
};

// // translate (map) your array of objects into jsx
// export const routeComponents = (()=> {

export default LinkList;
