"use client"
import { useEffect, useState } from "react";

const UseDestinationFilter = (initialFilters) => {
  const [filters, setFilters] = useState(initialFilters);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`http://localhost:5000/api/v1/destinations?${query}`);
      const data = await res.json();
      setDestinations(data.data);
    };

    fetchDestinations();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return { destinations, handleFilterChange };
};

export default UseDestinationFilter;
