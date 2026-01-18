import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination1({ totalPages, limit, page, setPage }) {
  const [block, setBlock] = useState(0);

  /* 페이지네이션 - 번호 */
  const getPageNumbers = () => {
    const start = block * limit + 1;
    const end = Math.min(start + limit - 1, totalPages + 1);
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  /* 페이지네이션 - 이전 버튼 */
  const goToPrevBlock = () => {
    if (block > 0) {
      const newBlock = block - 1;
      setBlock(newBlock);
      setPage(newBlock * limit + 1);
    }
  };

  /* 페이지네이션 - 다음 버튼 */
  const goToNextBlock = () => {
    if ((block + 1) * limit < totalPages) {
      const newBlock = block + 1;
      setBlock(newBlock);
      setPage(newBlock * limit + 1);
    }
  };

  return (
    <div className="custom-pagination">
      <button onClick={goToPrevBlock} disabled={block === 0}>
        <FiChevronLeft />
      </button>
      {getPageNumbers().map((num) => (
        <button
          key={num}
          onClick={() => setPage(num)}
          className={page === num ? "active" : ""}
        >
          {num}
        </button>
      ))}
      <button
        onClick={goToNextBlock}
        disabled={(block + 1) * limit >= totalPages}
      >
        <FiChevronRight />
      </button>
    </div>
  );
}
