// src/hooks/usePagination.js

import { useMemo, useState } from "react";

const usePagination = (data = [], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    // memory-efficient lazy slice
    return data.slice(start, end); //
  }, [data, currentPage, itemsPerPage]);

  const next = () => setCurrentPage((prev) => Math.min(prev + 1, maxPage));
  const prev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const jump = (page) => setCurrentPage(Math.min(Math.max(page, 1), maxPage));

  return {
    currentPage,
    maxPage,
    next,
    prev,
    jump,
    paginatedData,
  };
};

export default usePagination;
