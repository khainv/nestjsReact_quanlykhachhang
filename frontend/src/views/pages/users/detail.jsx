import React, { useState, useEffect } from 'react'
import {
  CAlert,
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
} from '@coreui/react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosClient from '../../../axiosClient'
import {
  COLOR_DANGER,
  COLOR_SUCCESS,
  URL_BACKEND,
} from '../../../../constantsk'
import ComUserActivity from './comUserActivity'

const Detail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    use_name: '',
    use_code: '',
    use_phone: '',
    use_email: '',
    use_birthday: '',
    use_sex: '',
    use_address: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [alerk, setAlertk] = useState({
    visible: false,
    message: '',
    color: 'success',
  })
  const [tempErrors, setTempErrors] = useState({})
  // Lấy thông tin người dùng cần sửa
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
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
  const validateForm = (formData) => {
    const errors = {}
    // Họ tên
    if (Object.hasOwn(formData, 'use_name')) {
      if (!formData.use_name.trim()) {
        errors.use_name = 'Vui lòng nhập họ tên'
      }
    }
    // Mã khách hàng
    if (Object.hasOwn(formData, 'use_code')) {
      if (!formData.use_code.trim()) {
        errors.use_code = 'Vui lòng nhập mã Khách hàng'
      }
    }
    // Điện thoại
    if (Object.hasOwn(formData, 'use_phone')) {
      if (!formData.use_phone.trim()) {
        errors.use_phone = 'Vui lòng nhập số điện thoại'
      } else if (!/^0\d{9}$/.test(formData.use_phone.trim())) {
        errors.use_phone = 'Số điện thoại không hợp lệ'
      }
    }
    // Email
    if (Object.hasOwn(formData, 'use_email')) {
      if (
        formData.use_email.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.use_email.trim())
      ) {
        errors.use_email = 'Email không hợp lệ'
      }
    }
    // Ngày sinh
    if (Object.hasOwn(formData, 'use_birthday')) {
      if (formData.use_birthday) {
        const birthday = new Date(
          `${formData.use_birthday.substring(0, 10)}T00:00:00`
        )
        if (Number.isNaN(birthday.getTime())) {
          errors.use_birthday = 'Ngày sinh không hợp lệ'
        } else if (birthday > new Date()) {
          errors.use_birthday = 'Ngày sinh không được lớn hơn ngày hiện tại'
        }
      }
    }
    // Giới tính
    if (Object.hasOwn(formData, 'use_sex')) {
      if (
        formData.use_sex === '' ||
        formData.use_sex === null ||
        formData.use_sex === undefined
      ) {
        errors.use_sex = 'Vui lòng chọn giới tính'
      }
    }
    setTempErrors(errors)
    return Object.keys(errors).length === 0 //tra về true or false
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (saving) return
    const rsV = await validateForm(formData)
    if (!rsV) {
      return
    }
    try {
      setSaving(true)
      const response = await axiosClient.patch(
        `${URL_BACKEND}/users/update/${id}`,
        formData
      )
      const result = response.data
      if (result?.code === 1) {
        setAlertk({
          visible: true,
          message: result.message,
          color: COLOR_SUCCESS,
        })
        // Chờ người dùng nhìn thấy thông báo rồi quay lại danh sách
        setTimeout(() => {
          //navigate('/users/index')
        }, 1000)
      } else {
        setAlertk({
          visible: true,
          message: result?.message || 'Cập nhật người dùng thất bại.',
          color: COLOR_DANGER,
        })
      }
    } catch (err) {
      setAlertk({
        visible: true,
        message: err.response?.data?.message || 'Cập nhật người dùng thất bại.',
        color: COLOR_DANGER,
      })
    } finally {
      setSaving(false)
    }
  }
  // Cập nhật dữ liệu khi nhập form
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setTempErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
  }
  return (
    <CTabs defaultActiveItemKey="home">
      <CTabList>
        <CTab itemKey="home">Khách hàng</CTab>
        <CTab itemKey="profile">Lịch sử khách hàng</CTab>
      </CTabList>
      <CTabContent>
        <CTabPanel className="p-3" itemKey="home">
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
          <CForm onSubmit={handleSubmit} className="row g-3">
            <CCol md={6}>
              <CFormInput
                type="text"
                id="use_name"
                name="use_name"
                label="Họ Tên"
                value={formData.use_name}
                onChange={handleChange}
                invalid={!!tempErrors.use_name}
                feedback={tempErrors.use_name}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="use_code"
                name="use_code"
                label="Mã khác hàng"
                value={formData.use_code}
                onChange={handleChange}
                invalid={!!tempErrors.use_code}
                feedback={tempErrors.use_code}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="use_phone"
                name="use_phone"
                label="Điện thoại"
                value={formData.use_phone}
                onChange={handleChange}
                invalid={!!tempErrors.use_phone}
                feedback={tempErrors.use_phone}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="use_email"
                label="Email"
                value={formData.use_email}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                id="use_address"
                name="use_address"
                label="Địa chỉ"
                value={formData.use_address}
                onChange={handleChange}
                invalid={!!tempErrors.use_address}
                feedback={tempErrors.use_address}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="use_birthday"
                label="Ngày sinh"
                value={formData.use_birthday}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <label>giới tính</label>
              <CFormCheck
                type="radio"
                name="use_sex"
                id="use_sex"
                label="Nam"
                checked={formData.use_sex === 1}
                onChange={handleChange}
              />
              <CFormCheck
                type="radio"
                name="use_sex"
                id="use_sex2"
                label="Nữ"
                checked={formData.use_sex === 0}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit" disabled={loading}>
                {loading ? 'Đang lưu...' : 'Lưu khách hàng'}
              </CButton>
            </CCol>
          </CForm>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="profile">
          <ComUserActivity></ComUserActivity>
        </CTabPanel>
      </CTabContent>
    </CTabs>
  )
}
export default Detail
