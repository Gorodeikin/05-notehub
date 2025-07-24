import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages?: number;
}

export default function Pagination({
  currentPage,
  onPageChange,
  totalPages = 5,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      className={css.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
      pageRangeDisplayed={3}
      pageCount={totalPages}
      previousLabel="<"
      forcePage={currentPage - 1}
    />
  );
}