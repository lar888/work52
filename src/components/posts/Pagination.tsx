interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) => {
  return (
    <div className="pagination">
      <button
        className="pagination__btn"
        data-label="previous"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous page
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            className={`pagination__btn ${
              currentPage === pageNumber ? 'pagination__btn--active' : ''
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      )}

      <button
        className="pagination__btn"
        data-label="next"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next page
      </button>
    </div>
  )
}

export default Pagination
