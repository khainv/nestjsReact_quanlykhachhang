import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function LogoutPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      // Thêm thuộc tính { replace: true } để người dùng không bấm nút Back quay lại trang Login được nữa
      navigate('/admink/login', { replace: true })
      return ;
    }
     let isCalled = false;
    const logout = async () => {
      if (isCalled) return; // Nếu đã gọi rồi thì chặn các lần gọi sau
      isCalled = true;
      try {
        // Gọi API logout của NestJS
        const response = await axios.post('http://localhost:3000/admink/logout', {},{
          headers: {
            'Content-Type': 'application/json', // Ép kiểu dữ liệu là JSON
            Authorization: `Bearer ${token}`
          },
        })
        console.log(response.data)
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
