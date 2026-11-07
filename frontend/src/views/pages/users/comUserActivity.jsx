import React, { useState, useEffect } from 'react'
import {
  CAlert,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CSpinner,
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

const ComUserActivity = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
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
    <>
      <style>{`
.activity-date {
  font-weight: 600;
  font-size: 14px;
  color: var(--cui-primary);
  margin-bottom: 18px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--cui-border-color);
}

.activity-item {
  display: flex;
  position: relative;
  gap: 15px;
  padding-bottom: 24px;
}

.activity-line {
  position: relative;
  width: 12px;
  flex-shrink: 0;
}

.activity-line::after {
  content: '';
  position: absolute;
  top: 12px;
  bottom: -24px;
  left: 5px;
  width: 2px;
  background: var(--cui-border-color);
}

.activity-item:last-child .activity-line::after {
  display: none;
}

.activity-dot {
  position: absolute;
  top: 5px;
  left: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--cui-primary);
  border: 2px solid var(--cui-card-bg);
  box-shadow: 0 0 0 1px var(--cui-primary);
}

.activity-content {
  flex: 1;
  min-width: 0;
  padding: 0 0 0 2px;
}
`}</style>
      <CCard className="mb-3">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <strong>Lịch sử hoạt động khách hàng</strong>

          <CBadge color="info">{formData.length} hoạt động</CBadge>
        </CCardHeader>

        <CCardBody>
          {loading && (
            <div className="text-center py-4">
              <CSpinner color="primary" />
            </div>
          )}

          {alerk.visible && <CAlert color="danger">{alerk.message}</CAlert>}

          {!loading && !alerk.visible && formData.length === 0 && (
            <CAlert color="secondary" className="mb-0">
              Chưa có lịch sử hoạt động của khách hàng.
            </CAlert>
          )}

          {!loading && !alerk.visible && (
            <>
              <div key="2026" className="activity-group mb-4">
                <div className="activity-date">2026</div>
                <div key="id1" className="activity-item">
                  <div className="activity-line">
                    <span className="activity-dot"></span>
                  </div>
                  <div className="activity-content">
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                      <div>
                        <strong>title</strong>
                      </div>

                      <CBadge color="blue">label</CBadge>
                    </div>

                    <div className="text-body-secondary small mt-1">
                      thời gian
                      {' · '}
                      {'người tao'}
                    </div>

                    <div className="mt-2">content</div>
                  </div>
                </div>
              </div>
              <div key="2026" className="activity-group mb-4">
                <div className="activity-date">2026</div>
                <div key="id1" className="activity-item">
                  <div className="activity-line">
                    <span className="activity-dot"></span>
                  </div>
                  <div className="activity-content">
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                      <div>
                        <strong>title</strong>
                      </div>

                      <CBadge color="blue">label</CBadge>
                    </div>

                    <div className="text-body-secondary small mt-1">
                      thời gian
                      {' · '}
                      {'người tao'}
                    </div>

                    <div className="mt-2">content</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </CCardBody>
      </CCard>
    </>
  )
}
export default ComUserActivity
