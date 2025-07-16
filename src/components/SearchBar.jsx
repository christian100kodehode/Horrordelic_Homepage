import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    try {
      // Navigate to search-results with query parameter
      navigate(`/search-results?query=${encodeURIComponent(inputValue)}`);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchContainer}>
      <input
        type="text"
        value={inputValue}
        className={styles.searchInput}
        placeholder="Search tracks or artists..."
        onChange={handleChange}
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
