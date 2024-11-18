'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBestsellerCategories } from "./aggregates/nytimes-api/nytimes-api";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getBestsellerCategories();
      setCategories(categories);
      setFilteredCategories(categories);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter(category =>
      category.display_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchQuery, categories]);

  return (
    <div className="px-6 py-20 container mx-auto">
      <h1 className="text-center mb-8 text-4xl font-bold">{categories.length} book categories</h1>
      <input
        type="text"
        placeholder="Search categories..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-8 p-2 border border-neutral-800 rounded-lg w-full"
      />
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