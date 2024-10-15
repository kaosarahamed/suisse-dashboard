import PropTypes from "prop-types";

function Pagination({ handlePageChange, page, totalItems, itemsPerPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <nav>
      <ul className="pagination pagination-circle justify-content-center">
        <li className="page-item page-indicator">
          <button
            className="page-link"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <i className="fa fa-angle-double-left" />
          </button>
        </li>
        {[...Array(totalPages).keys()].map((index) => (
          <li
            className={`page-item  ${page === index + 1 ? "active" : ""}`}
            key={index}
          >
            <button
              className={`page-link`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li className="page-item page-indicator">
          <button
            className="page-link"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            <i className="fa fa-angle-double-right" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
Pagination.propTypes = {
  handlePageChange: PropTypes.any,
  page: PropTypes.any,
  totalItems: PropTypes.any,
  itemsPerPage: PropTypes.any,
};
export default Pagination;
