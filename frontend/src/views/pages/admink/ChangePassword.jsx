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
import axios from 'axios'
const ChangePassword = () => {
  const navigate = useNavigate() // Khởi tạo hàm điều hướng
  const [adm_password, setAdm_password] = useState('')
  const [adm_passwordNew, setAdm_passwordNew] = useState('')
  const [adm_passwordNew2, setAdm_passwordNew2] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [tempErrors, setTempErrors] = useState({})
  const errorsk={}
  const validateForm = () => {
    let isValid = true
    // Kiểm tra Email
    if (!adm_password.trim()) {
      errorsk.adm_password = 'mật khẩu hiện tại không được để trống'
      isValid = false
    }
    // Kiểm tra Mật khẩu
    if (!adm_passwordNew) {
      errorsk.adm_passwordNew = 'Mật khẩu mới không được để trống'
      isValid = false
    } else if (adm_passwordNew.length < 3) {
      errorsk.adm_passwordNew = 'Mật khẩu mới phải chứa ít nhất 3 ký tự'
      isValid = false
    }
    if (!adm_passwordNew2) {
      errorsk.adm_passwordNew2 = 'Mật khẩu xác thực không được để trống'
      isValid = false
    }
    if (adm_passwordNew != adm_passwordNew2) {
      errorsk.adm_passwordNew2 = 'Mật khẩu xác nhận không khớp'
      isValid = false
    }
    if (adm_password == adm_passwordNew) {
      errorsk.adm_passwordNew = 'Mật khẩu mới phải khác mật khẩu hiện tại'
      isValid = false
    }
    if(isValid==false){
      setTempErrors(errorsk)
    }
    return isValid
  }
  const handleSubmit = async (e) => {
    setTempErrors({})//xóa errors của lần submit trước
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    const accessToken = localStorage.getItem('access_token')
    try {
      // Gọi API logout của NestJS
      const response = await axios.post(
        `${URL_BACKEND}/admink/change-password`,
        { adm_password, adm_passwordNew, adm_passwordNew2 },
        {
          headers: {
            'Content-Type': 'application/json', // Ép kiểu dữ liệu là JSON
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      if (response.data.code >= 0) {
        //localStorage.removeItem('access_token')
        //localStorage.removeItem('refresh_token')
        navigate('/admink/password-changed', { replace: true })
      }else{
        errorsk.adm_password=response.data.message;
        setTempErrors(errorsk);
      }
    } catch (error) {
      console.error('Logout API error:', error)
    } finally {
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
                      value={adm_password}
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
                      placeholder="nhập mật khẩu mới"
                      value={adm_passwordNew}
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
                      placeholder="Nhận lại mật khẩu mới"
                      value={adm_passwordNew2}
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
