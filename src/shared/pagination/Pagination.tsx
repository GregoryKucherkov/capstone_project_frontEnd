import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'
import ChevronUp from "../../assets/icons/chevron-up.svg?react";

export interface PaginationProps {
    totalPages: number;
    activePage: number;
    onPageChange: (pageNumber: number) => void;

}


export const Pagination = ({ totalPages, activePage, onPageChange }: PaginationProps) => (
  <ReactPaginate
    pageCount={totalPages}
    forcePage={activePage - 1}
    onPageChange={({ selected }: { selected: number }) => onPageChange(selected + 1)}
    previousLabel={<ChevronUp className={css.PaginationButtonPrev} />}
    nextLabel={<ChevronUp className={css.PaginationButtonNext} />}
    breakLabel="…"
    marginPagesDisplayed={1}
    pageRangeDisplayed={3}
    containerClassName={css.Pagination}
    pageLinkClassName={css.PaginationButton}
    activeLinkClassName={css.PaginationButton__active}
    previousLinkClassName={css.PaginationButton}
    nextLinkClassName={css.PaginationButton}
    breakLinkClassName={css.PaginationButton}
    disabledLinkClassName={css.PaginationButton__disabled}
  />
)