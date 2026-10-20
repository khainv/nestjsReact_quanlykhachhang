import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function LogoutPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const logout = async () => {
      try {
        // Gọi API logout của NestJS
        const response = await axios.post('/admink/logout', {
          headers: {
            'Content-Type': 'application/json', // Ép kiểu dữ liệu là JSON
          },
        })
        console.log(response)
      } catch (error) {
        console.error('Logout API error:', error)
      } finally {
        // Xóa access token ở frontend
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        // Chuyển về trang đăng nhập
        //navigate('/admink/login', { replace: true })
      }
    }

    void logout()
  }, [navigate])

  return <div>Đang đăng xuất...</div>
}
