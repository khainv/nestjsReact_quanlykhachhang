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

const Add = () => {
  //const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    use_name: '',
    use_code: '',
    use_phone: '',
    use_address: '',
  })
  const [tempErrors, setTempErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [alerk, setAlertk] = useState({
    visible: false,
    message: '',
    color: 'success',
  })

  // Lấy thông tin người dùng cần sửa
  useEffect(() => {}, [])

  // Cập nhật dữ liệu khi nhập form
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const validateFrom = (formData) => {
    const errors = {}
    if (Object.hasOwn(formData, 'use_name')) {
      if (!formData.use_name.trim()) {
        errors.use_name = 'Vui lòng nhập tên khách hàng'
      }
    }
    if (Object.hasOwn(formData, 'use_code')) {
      if (!formData.use_code.trim()) {
        errors.use_code = 'Vui lòng nhập mã khách hàng'
      }
    }
    if (Object.hasOwn(formData, 'use_address')) {
      if (!formData.use_address.trim()) {
        errors.use_address = 'Vui lòng nhập địa chỉ khách hàng'
      }
    }
    if (Object.hasOwn(formData, 'use_phone')) {
      if (!formData.use_phone.trim()) {
        errors.use_phone = 'Vui lòng nhập điện thoại khách hàng'
      }
    }
    setTempErrors(errors)
    return Object.keys(errors).length === 0 //tra về true or false
  }

  // Lưu thông tin đã sửa
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (saving) return
    try {
      setSaving(true)
      setAlertk({ visible: false })
      // Giả định backend có PATCH /users/update/:id
      const response = await axiosClient.patch(
        `${URL_BACKEND}/users/update/${id}`,
        formData
      )
      const result = response.data
      if (result?.code === 1) {
        //setSuccess(result.message || 'Cập nhật người dùng thành công!')
        setAlertk({ visible: true, message: result.message, color: 'success' })
        // Chờ người dùng nhìn thấy thông báo rồi quay lại danh sách
        setTimeout(() => {
          navigate('/users/index')
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

  if (saving) {
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
            <strong>Thêm khách hàng</strong>
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
                <CFormLabel htmlFor="use_name">Tên khách hàng</CFormLabel>
                <CFormInput
                  type="text"
                  id="use_name"
                  name="use_name"
                  value={formData.use_name}
                  onChange={handleChange}
                  required
                  disabled={saving}
                  invalid={!!tempErrors.use_name}
                  feedback={tempErrors.use_name}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="use_name">Điện thoại</CFormLabel>
                <CFormInput
                  type="text"
                  id="use_phone"
                  name="use_phone"
                  value={formData.use_phone}
                  onChange={handleChange}
                  disabled={saving}
                  invalid={!!tempErrors.use_phone}
                  feedback={tempErrors.use_phone}
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="use_code">Mã khách hàng</CFormLabel>
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
                  type="text"
                  id="use_address"
                  name="use_address"
                  value={formData.use_address}
                  onChange={handleChange}
                  disabled={saving}
                  invalid={!!tempErrors.use_address}
                  feedback={tempErrors.use_address}
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
                    'Lưu'
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
export default Add
