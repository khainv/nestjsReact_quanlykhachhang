import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import { URL_BACKEND } from '../../../../constantsk'
import { useNavigate } from 'react-router-dom'
const ChangePassword = () => {
  const navigate = useNavigate() // Khởi tạo hàm điều hướng
  const [adm_password, setAdm_password] = useState('')
  const [adm_passwordNew, setAdm_passwordNew] = useState('')
  const [adm_passwordNew2, setAdm_passwordNew2] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [tempErrors, setTempErrors] = useState({})
  const validateForm = () => {
    let isValid = true
    // Kiểm tra Email
    if (!adm_password.trim()) {
      tempErrors.adm_password = 'mật khẩu không được để trống'
      isValid = false
    }
    // Kiểm tra Mật khẩu
    if (!adm_passwordNew) {
      tempErrors.adm_passwordNew = 'Mật khẩu mới không được để trống'
      isValid = false
    } else if (adm_passwordNew.length < 3) {
      tempErrors.adm_passwordNew = 'Mật khẩu mới phải chứa ít nhất 3 ký tự'
      isValid = false
    }
    if (!adm_passwordNew2) {
      tempErrors.adm_passwordNew2 = 'Mật khẩu xác thực không được để trống'
      isValid = false
    }
    if (adm_passwordNew != adm_passwordNew2) {
      tempErrors.adm_passwordNew2 = 'Mật khẩu xác nhận không khớp'
      isValid = false
    }
    if (adm_password == adm_passwordNew) {
      tempErrors.adm_passwordNew = 'Mật khẩu mới phải khác mật khẩu hiện tại'
      isValid = false
    }
    setTempErrors(tempErrors)
    console.log(tempErrors)
    return isValid
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    const accessToken = localStorage.getItem('access_token')
    try {
      // Gọi API logout của NestJS
      const response = await axios.post(
        `${URL_BACKEND}/admink/logout`,
        { adm_password, adm_passwordNew, adm_passwordNew2 },
        {
          headers: {
            'Content-Type': 'application/json', // Ép kiểu dữ liệu là JSON
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      console.log(response.data)
      if (response.data.code > 0) {
        //localStorage.removeItem('access_token')
        //localStorage.removeItem('refresh_token')
        //navigate('/admink/password-changed', { replace: true })
      }
    } catch (error) {
      console.error('Logout API error:', error)
    } finally {
      // Xóa access token ở frontend
      //localStorage.removeItem('access_token')
      //localStorage.removeItem('refresh_token')
      // Chuyển về trang đăng nhập
      //navigate('/admink/login', { replace: true })
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Đổi mật khẩu</h1>
                  {tempErrors.adm_password && (
                    <p style={{ color: 'red' }}>{tempErrors.adm_password}</p>
                  )}
                  {tempErrors.adm_passwordNew && (
                    <p style={{ color: 'red' }}>{tempErrors.adm_passwordNew}</p>
                  )}
                  {tempErrors.adm_passwordNew2 && (
                    <p style={{ color: 'red' }}>
                      {tempErrors.adm_passwordNew2}
                    </p>
                  )}
                  <div className="mb-3">
                    <CFormLabel htmlFor="adm_password">
                      Mật khẩu hiện tại
                    </CFormLabel>
                    <CFormInput
                      id="adm_password"
                      type="password"
                      placeholder="nhập mật khẩu"
                      onChange={(e) => setAdm_password(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="adm_passwordNew">
                      Mật khẩu mới
                    </CFormLabel>
                    <CFormInput
                      id="adm_passwordNew"
                      type="password"
                      placeholder="nhập mật khẩu"
                      onChange={(e) => setAdm_passwordNew(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <CFormLabel htmlFor="adm_passwordNew2">
                      Nhập lại mật khẩu
                    </CFormLabel>
                    <CFormInput
                      id="adm_passwordNew2"
                      type="password"
                      placeholder="Nhận lại mật khẩu"
                      onChange={(e) => setAdm_passwordNew2(e.target.value)}
                    />
                  </div>
                  <div className="d-grid">
                    <CButton color="primary" type="submit">
                      Đổi mật khẩu
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ChangePassword
