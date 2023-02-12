import React from "react";
import { releases } from "./release-list";
import { Routes, Route, Link } from "react-router-dom";

const Navbar2 = () => {
  function Navbar({ id, artist }) {
    const links = releases.map(({ id, artist }) => (
      <Link key={artist} to={id}>
        {artist}
      </Link>
    ));
    return <p>{links}</p>;
  }
};

export default Navbar2;
