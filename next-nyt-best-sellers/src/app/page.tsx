'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { getBestsellerCategories } from "./aggregates/nytimes-api/nytimes-api";
import SearchBar from "./components/search-bar";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getBestsellerCategories();
      setCategories(categories);
      setFilteredCategories(categories);
    }
    fetchCategories();
  }, []);

  const handleSearch = (filtered) => {
    setFilteredCategories(filtered);
  };

  return (
    <div className="px-6 py-20 container mx-auto">
      <h1 className="text-center mb-8 text-4xl font-bold">{categories.length} book categories</h1>
      <SearchBar categories={categories} onSearch={handleSearch} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <Link href={`/books/${category.list_name_encoded}`} key={category.list_name_encoded} className="p-4 border border-neutral-800 rounded-lg hover:bg-customColorGrey transition">
            <h2 className="text-lg font-bold mb-4">{category.display_name}</h2>
            <p className="text-sm text-neutral-400">First published: {category.oldest_published_date}</p>
            <p className="text-sm text-neutral-400 my-2">Last published: {category.newest_published_date}</p>
            <p className="text-sm text-neutral-400">Updated: {category.updated}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}