import React from 'react'
import { CPagination, CPaginationItem } from '@coreui/react'

const PaginationCustom = ({
  page = 1,
  totalPages = 0,
  totalItems = 0,
  itemLabel = 'bản ghi',
  loading = false,
  onPageChange,
}) => {
  // Không hiển thị phân trang nếu chỉ có 1 trang
  if (totalPages <= 1) {
    return null
  }
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page || loading) {
      return
    }

    onPageChange?.(newPage)
  }

  return (
    <div className="mt-3">
      {/* Thông tin phân trang */}
      <div className="text-center mb-2">
        <small className="text-body-secondary">
          Trang {page} / {totalPages}
          {' - '}
          Tổng {totalItems} {itemLabel}
        </small>
      </div>

      {/* Thanh phân trang */}
      <CPagination align="center" aria-label="Phân trang">
        {/* Trang trước */}
        <CPaginationItem
          aria-label="Trang trước"
          disabled={page === 1 || loading}
          onClick={() => handlePageChange(page - 1)}
        >
          &laquo;
        </CPaginationItem>

        {/* Danh sách trang */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (number) => (
            <CPaginationItem
              style={{ cursor: 'pointer' }}
              key={number}
              active={number === page}
              disabled={loading}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </CPaginationItem>
          )
        )}

        {/* Trang tiếp theo */}
        <CPaginationItem
          aria-label="Trang tiếp theo"
          disabled={page === totalPages || loading}
          onClick={() => handlePageChange(page + 1)}
        >
          &raquo;
        </CPaginationItem>
      </CPagination>
    </div>
  )
}

export default PaginationCustom
