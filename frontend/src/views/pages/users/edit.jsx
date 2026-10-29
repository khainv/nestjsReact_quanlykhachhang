import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CSpinner,
} from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../../../axiosClient'
import { URL_BACKEND } from '../../../../constantsk'

const Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    use_name: '',
    use_code: '',
    use_address: '',
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [alerk, setAlertk] = useState({
    visible: false,
    message: '',
    color: 'success',
  })

  // Lấy thông tin người dùng cần sửa
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        // Giả định backend có GET /users/detail/:id
        const response = await axiosClient.get(
          `${URL_BACKEND}/users/detail/${id}`
        )
        const result = response.data?.data ?? response.data

        setFormData(result)
      } catch (err) {
        setAlertk({
          visible: true,
          message:
            err.response?.data?.message ||
            'Không thể lấy thông tin người dùng.',
          color: 'danger',
        })
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchUser()
  }, [id])

  // Cập nhật dữ liệu khi nhập form
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Lưu thông tin đã sửa
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (saving) return

    try {
      setSaving(true)
      setAlertk({ visible: false })

      // Giả định backend có PATCH /users/update/:id
      const response = await axiosClient.patch(`/users/update/${id}`, formData)

      const result = response.data

      if (result?.code === 1) {
        setSuccess(result.message || 'Cập nhật người dùng thành công!')

        // Chờ người dùng nhìn thấy thông báo rồi quay lại danh sách
        setTimeout(() => {
          navigate('/users')
        }, 1000)
      } else {
        setAlertk({
          visible: true,
          message: result?.message || 'Cập nhật người dùng thất bại.',
          color: 'danger',
        })
      }
    } catch (err) {
      console.error('Lỗi cập nhật người dùng:', err)
      setAlertk({
        visible: true,
        message: err.response?.data?.message || 'Cập nhật người dùng thất bại.',
        color: 'danger',
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center p-4">
        <CSpinner />
        <div className="mt-2">Đang tải thông tin...</div>
      </div>
    )
  }

  return (
    <CRow>
      <CCol xs={12} lg={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Sửa thông tin người dùng</strong>
          </CCardHeader>

          <CCardBody>
            {alerk.visible && (
              <CAlert
                color={alerk.color}
                dismissible
                onClose={() =>
                  setAlertk((prev) => ({
                    ...prev,
                    visible: false,
                  }))
                }
              >
                {alerk.message}
              </CAlert>
            )}
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="use_name">Tên người dùng</CFormLabel>
                <CFormInput
                  id="use_name"
                  name="use_name"
                  value={formData.use_name}
                  onChange={handleChange}
                  required
                  disabled={saving}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="use_name">Tên người dùng</CFormLabel>
                <CFormInput
                  id="use_phone"
                  name="use_phone"
                  value={formData.use_phone}
                  onChange={handleChange}
                  disabled={saving}
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="use_code">Mã người dùng</CFormLabel>
                <CFormInput
                  id="use_code"
                  name="use_code"
                  value={formData.use_code}
                  onChange={handleChange}
                  disabled={saving}
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="use_address">Địa chỉ</CFormLabel>
                <CFormInput
                  id="use_address"
                  name="use_address"
                  value={formData.use_address}
                  onChange={handleChange}
                  disabled={saving}
                />
              </div>

              <div className="d-flex gap-2">
                <CButton type="submit" color="primary" disabled={saving}>
                  {saving ? (
                    <>
                      <CSpinner size="sm" className="me-2" />
                      Đang lưu...
                    </>
                  ) : (
                    'Lưu thay đổi'
                  )}
                </CButton>

                <CButton
                  type="button"
                  color="secondary"
                  variant="outline"
                  disabled={saving}
                  onClick={() => navigate('/users/index')}
                >
                  Quay lại
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default Edit
