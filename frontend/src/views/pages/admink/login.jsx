import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTooltip,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { apple } from 'src/assets/brand/apple'
import { google } from 'src/assets/brand/google'
import { logo } from 'src/assets/brand/logo'
import { eye } from 'src/assets/icons/eye'
import axios from 'axios'
const Login = () => {
  const [adm_account, setAdm_account] = useState('')
  const [adm_password, setAdm_password] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate() // Khởi tạo hàm điều hướng
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      // Thêm thuộc tính { replace: true } để người dùng không bấm nút Back quay lại trang Login được nữa
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])
  const validateForm = () => {
    const tempErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let isValid = true
    // Kiểm tra Email
    if (!adm_account.trim()) {
      tempErrors.adm_account = 'Email không được để trống'
      isValid = false
    }
    // Kiểm tra Mật khẩu
    if (!adm_password) {
      tempErrors.adm_password = 'Mật khẩu không được để trống'
      isValid = false
    } else if (adm_password.length < 3) {
      tempErrors.adm_password = 'Mật khẩu phải chứa ít nhất 3 ký tự'
      isValid = false
    }
    setError(tempErrors)
    console.log('adm')
    // Nếu object tempErrors trống nghĩa là không có lỗi -> form hợp lệ
    //return Object.keys(tempErrors).length === 0
    return isValid
  }
  const handleSubmit = async (e) => {
    e.preventDefault() // Chặn hành vi tải lại trang mặc định của form
    if (!validateForm()) return
    setLoading(true)
    try {
      // 3. Gửi dữ liệu qua API bằng phương thức POST lên Backend NestJS
      // Thay đổi URL 'http://localhost:3000' bằng cổng port thực tế của NestJS bên bạn
      const response = await axios.post(
        'http://localhost:3000/auth/login',
        {
          adm_account: adm_account,
          adm_password: adm_password,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Ép kiểu dữ liệu là JSON
          },
        }
      )

      // 4. Xử lý khi đăng nhập thành công
      console.log(response)
      console.log('Đăng nhập thành công, dữ liệu nhận về:', response.data)

      // Thông thường bạn sẽ lưu Token (JWT) vào localStorage để dùng cho các request sau
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token)
      }
      if (response.data.refresh_token) {
        localStorage.setItem('refresh_token', response.data.refresh_token)
      }
      window.location.href = '/dashboard'
    } catch (err) {
      // 5. Xử lý khi có lỗi xảy ra (Sai mật khẩu, không kết nối được server...)
      //console.error('Lỗi đăng nhập:', err);
      setError(
        err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!'
      )
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} lg={6} xl={5}>
            <div className="d-flex flex-column gap-4">
              <div className="text-center">
                <h1>CMS-KNV</h1>
              </div>
              <CCard className="p-4">
                <CCardBody className="d-flex flex-column gap-4">
                  <h2 className="h5 text-center mb-0">Login to your account</h2>
                  {error && <p style={{ color: 'red' }}>{error.adm_account}</p>}
                  {error && <p style={{ color: 'red' }}>{error.adm_password}</p>}
                  <CForm className="row gy-3" onSubmit={handleSubmit}>
                    <CCol xs={12}>
                      <CFormLabel htmlFor="email">Admin Account</CFormLabel>
                      <CFormInput
                        id="adm_account"
                        type="text"
                        placeholder="admin"
                        autoComplete="email"
                        required
                        onChange={(e) => setAdm_account(e.target.value)}
                      />
                      {error.adm_account && (
                        <p style={{ color: 'red' }}>{error.adm_account}</p>
                      )}
                    </CCol>
                    <CCol xs={12}>
                      <div className="d-flex justify-content-between">
                        <CFormLabel htmlFor="password">Password</CFormLabel>
                        <Link to="/admink/reset-password">
                          I forgot password
                        </Link>
                      </div>
                      <CInputGroup>
                        <CFormInput
                          id="adm_password"
                          type="password"
                          placeholder="Your password"
                          autoComplete="current-password"
                          required
                          onChange={(e) => setAdm_password(e.target.value)}
                        />
                        {error.adm_password && (
                          <p style={{ color: 'red' }}>{error.adm_password}</p>
                        )}
                        <CInputGroupText>
                          <CTooltip content="Show password">
                            <CButton
                              type="button"
                              color="link"
                              className="p-0 link-secondary"
                              aria-label="Show password"
                            >
                              <CIcon icon={eye} size="sm" />
                            </CButton>
                          </CTooltip>
                        </CInputGroupText>
                      </CInputGroup>
                    </CCol>
                    <CCol xs={12}>
                      <CFormCheck
                        id="rememberMe"
                        label="Remember me on this device"
                      />
                    </CCol>
                    <CCol xs={12}>
                      <CButton color="primary" type="submit" className="w-100">
                        {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                      </CButton>
                    </CCol>
                  </CForm>
                  <div className="position-relative">
                    <hr />
                    <div className="position-absolute top-50 start-50 translate-middle bg-body px-2 text-body-tertiary text-uppercase small">
                      or
                    </div>
                  </div>
                  <CRow>
                    <CCol>
                      <CButton
                        type="button"
                        variant="outline"
                        className="w-100"
                      >
                        <CIcon icon={google} className="me-1" />
                        Login with Google
                      </CButton>
                    </CCol>
                    <CCol>
                      <CButton
                        type="button"
                        variant="outline"
                        className="w-100"
                      >
                        <CIcon icon={apple} className="me-1" />
                        Login with Apple
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <div className="text-center text-body-secondary">
                Need an account? <Link to="/admink/register">Sign up</Link>
              </div>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
