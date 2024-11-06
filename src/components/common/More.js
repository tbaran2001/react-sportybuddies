import Button from "react-bootstrap/Button";

export default function More({ pagination, loadNextPage }) {
  let thereAreMore = false;
  if (pagination) {
    const { TotalItemCount, TotalPageCount, PageSize, CurrentPage } =
      pagination;
    thereAreMore = TotalItemCount > PageSize * CurrentPage;
  }

  return (
    <div className="More">
      {thereAreMore && (
        <Button variant="outline-primary" onClick={loadNextPage}>
          More &raquo;
        </Button>
      )}
    </div>
  );
}
