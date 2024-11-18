'use client';

import React from "react";
import { useState, useEffect } from "react";

export default function SearchBar({ categories, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filtered = categories.filter(category =>
      category.display_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    onSearch(filtered);
  }, [searchQuery, categories, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search categories..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="mb-8 p-2 border border-neutral-800 rounded-lg w-full"
    />
  );
}