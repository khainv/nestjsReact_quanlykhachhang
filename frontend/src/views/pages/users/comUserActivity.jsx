import React, { useState, useEffect, useRef } from 'react'
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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
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
import ComUserActivityAdd from './comUserActivityAdd'

const ComUserActivity = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [userActivities, setUserActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [alerk, setAlertk] = useState({
    visible: false,
    message: '',
    color: 'success',
  })
  const [tempErrors, setTempErrors] = useState({})
  const fetchUserActivities = async () => {
    try {
      const rs2 = await axiosClient.get(
        `${URL_BACKEND}/user-activities/get-activities/${id}`
      )
      const activities = rs2.data
      //const arrAct = Object.values(activities)
      const gro = activities.reduce((rs, item) => {
        const date = new Date(item.created_at).toISOString().slice(0, 10)
        const indexArr = rs.findIndex((ite) => ite.date == date) //tìm index của rs theo date
        if (indexArr == -1) {
          rs.push({ date: date, activities: [item] })
        } else {
          rs[indexArr].activities.push(item)
        }
        return rs //bắt buộc phải return nếu không vòng lặp tiếp theo k nhận được giá trị trước
      }, [])
      setUserActivities(gro)
    } catch (err) {
      console.log('có lỗi')
    }
  }
  // Lấy thông tin người dùng cần sửa
  useEffect(() => {
    fetchUserActivities()
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
  }, [])
  const handleActivityAdded = () => {
    fetchUserActivities()
  }
  const activityRef = useRef(null)
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
          <strong>Lịch sử hoạt động khách hàng {formData.use_name}</strong>
          <div>
            <CButton
              color="info"
              onClick={() => activityRef.current.openModal()}
            >
              Thêm hoạt động
            </CButton>
          </div>
        </CCardHeader>

        <CCardBody>
          {loading && (
            <div className="text-center py-4">
              <CSpinner color="primary" />
            </div>
          )}

          {alerk.visible && <CAlert color="danger">{alerk.message}</CAlert>}

          {!loading && !alerk.visible && Object.keys(formData).length === 0 && (
            <CAlert color="secondary" className="mb-0">
              Chưa có lịch sử hoạt động của khách hàng.
            </CAlert>
          )}
          {!loading && !alerk.visible && (
            <>
              {userActivities.length > 0 &&
                userActivities.map((item) => (
                  <div key={item.date} className="activity-group mb-4">
                    <div className="activity-date">{item.date}</div>
                    {item.activities.map((item2) => (
                      <div key={item2.id} className="activity-item">
                        <div className="activity-line">
                          <span className="activity-dot"></span>
                        </div>
                        <div className="activity-content">
                          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                            <div>
                              <strong>{item2.act_name}</strong>
                            </div>
                            <CBadge color="blue">label</CBadge>
                          </div>
                          <div className="text-body-secondary small mt-1">
                            {new Date(item2.created_at)
                              .toISOString()
                              .slice(11, 19)}
                            {' · '}
                            {item2.admink.adm_name}
                          </div>
                          <div className="mt-2">{item2.act_des}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </>
          )}
        </CCardBody>
      </CCard>
      <ComUserActivityAdd
        ref={activityRef}
        onActivityAdded={handleActivityAdded}
      ></ComUserActivityAdd>
    </>
  )
}
export default ComUserActivity
