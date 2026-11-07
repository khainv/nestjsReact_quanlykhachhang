import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CSpinner,
} from '@coreui/react'

import axiosClient from '../../../axiosClient'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilPencil } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { COLOR_SUCCESS, URL_BACKEND } from '../../../../constantsk'

const Index = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  // State xác nhận xóa
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [deleting, setDeleting] = useState(false)
  //state alert
  const [alert, setAlert] = useState({
    visible: false,
    message: '',
    color: 'success',
  })
  // Lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axiosClient.get('/users/index', {
        params: {
          page: 1,
          limit: 10,
          sort_by: 'created_at',
          sort_order: 'DESC',
        },
      })

      const result = response.data
      if (Array.isArray(result)) {
        setUsers(result)
      } else {
        setUsers(result.data ?? result.items ?? [])
      }
      setAlert({
        visible: false,
        message: '',
        color: COLOR_SUCCESS,
      })
    } catch (err) {
      setAlert({
        visible: true,
        message:
          err.response?.data?.message || 'Không thể tải danh sách người dùng.',
        color: 'danger',
      })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  // Chuyển đến trang sửa
  const handleEdit = (user) => {
    navigate(`/users/edit/${user.id}`)
  }
  const directK = (link) => {
    navigate(link)
  }

  // Mở modal xác nhận xóa
  const confirmDelete = (user) => {
    setSelectedUser(user)
    setDeleteModal(true) //modal được bật theo state
  }

  // Gọi API xóa người dùng
  const handleDelete = async () => {
    if (!selectedUser || deleting) return

    try {
      setDeleting(true)
      // Giả định backend có endpoint DELETE /users/:id
      const rs = await axiosClient.delete(
        `${URL_BACKEND}/users/del/${selectedUser.id}`
      )
      //mai làm  tiếp phần xóa này
      if (rs.data.code == 1) {
        setAlert({
          visible: true,
          message: rs.data.message,
          color: 'success',
        })
      }
      // Xóa thành công: đóng modal
      setDeleteModal(false)
      setSelectedUser(null)

      // Tải lại danh sách
      await fetchUsers()
    } catch (err) {
      setAlert({
        visible: true,
        message: err.response?.data?.message || 'Xóa người dùng thất bại.',
        color: 'danger',
      })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Quản lý người dùng</strong>
            </CCardHeader>
            <CCardBody>
              {alert.visible && (
                <CAlert
                  color={alert.color}
                  dismissible
                  onClose={() =>
                    setAlert((prev) => ({
                      ...prev,
                      visible: false,
                    }))
                  }
                >
                  {alert.message}
                </CAlert>
              )}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <strong>Tổng số: {users.length} người dùng</strong>

                <CButton
                  color="primary"
                  onClick={fetchUsers}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <CSpinner size="sm" className="me-2" />
                      Đang tải...
                    </>
                  ) : (
                    'Tải lại'
                  )}
                </CButton>
              </div>

              {loading && users.length === 0 ? (
                <div className="text-center p-4">
                  <CSpinner />
                  <div className="mt-2">Đang tải dữ liệu...</div>
                </div>
              ) : (
                <CTable bordered hover striped responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>

                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>

                      <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        Điện thoại
                      </CTableHeaderCell>

                      <CTableHeaderCell scope="col">Địa chỉ</CTableHeaderCell>

                      <CTableHeaderCell scope="col">Thao tác</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>

                  <CTableBody>
                    {users.length > 0 &&
                      users.map((user) => (
                        <CTableRow key={user.id}>
                          <CTableHeaderCell scope="row">
                            {user.id}
                          </CTableHeaderCell>

                          <CTableDataCell>
                            <CButton
                              onClick={() =>
                                directK(`/users/detail/${user.id}`)
                              }
                            >
                              {user.use_name}
                            </CButton>
                          </CTableDataCell>

                          <CTableDataCell>{user.use_code}</CTableDataCell>
                          <CTableDataCell>{user.use_phone}</CTableDataCell>

                          <CTableDataCell>{user.use_address}</CTableDataCell>

                          <CTableDataCell>
                            <div className="d-flex align-items-center gap-2">
                              {/* Nút sửa */}
                              <CButton
                                color="primary"
                                variant="ghost"
                                size="sm"
                                className="p-0"
                                title="Sửa người dùng"
                                onClick={() => handleEdit(user)}
                              >
                                <CIcon
                                  icon={cilPencil}
                                  className="action-icon"
                                />
                              </CButton>

                              {/* Nút xóa */}
                              <CButton
                                color="danger"
                                variant="ghost"
                                size="sm"
                                className="p-0"
                                title="Xóa người dùng"
                                onClick={() => confirmDelete(user)}
                                disabled={deleting}
                              >
                                <CIcon
                                  icon={cilDelete}
                                  className="action-icon"
                                />
                              </CButton>
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Modal xác nhận xóa */}
      <CModal
        visible={deleteModal}
        onClose={() => {
          if (!deleting) setDeleteModal(false)
        }}
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle>Xác nhận xóa người dùng</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Bạn có chắc chắn muốn xóa người dùng{' '}
          <strong>{selectedUser?.use_name ?? selectedUser?.id}</strong> không?
        </CModalBody>

        <CModalFooter>
          <CButton
            color="secondary"
            variant="outline"
            onClick={() => setDeleteModal(false)}
            disabled={deleting}
          >
            Hủy
          </CButton>
          <CButton color="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Đang xóa...
              </>
            ) : (
              'Xác nhận xóa'
            )}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Index
