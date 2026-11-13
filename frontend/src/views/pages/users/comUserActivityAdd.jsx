import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
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

const ComUserActivityAdd = forwardRef((props, ref) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    act_name: '',
    act_des: '',
  })
  const [saving, setSaving] = useState(false)
  const [alerk, setAlertk] = useState({
    visible: false,
    message: '',
    color: 'success',
  })
  const [tempErrors, setTempErrors] = useState({})
  const [visibleAddUser, setVisibleAddUser] = useState(false)
  const validateForm = (formData) => {
    const errors = {}
    if (Object.hasOwn(formData, 'act_name')) {
      if (!formData.act_name.trim()) {
        errors.act_name = 'Vui lòng nhập tiêu đề'
      }
    }
    if (Object.hasOwn(formData, 'act_des')) {
      if (!formData.act_des.trim()) {
        errors.act_des = 'Vui lòng nhập nội dung'
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
      formData.use_id = id
      const response = await axiosClient.post(
        `${URL_BACKEND}/user-activities/add`,
        formData
      )
      const result = response.data
      if (result.code == 1) {
        setAlertk({
          visible: true,
          message: result.message,
          color: COLOR_SUCCESS,
        })
        setVisibleAddUser(false)
        setFormData({ act_name: '', act_des: '' })
        props.onActivityAdded?.()
      } else {
        setAlertk({
          visible: true,
          message: result.message,
          color: COLOR_DANGER,
        })
      }
    } catch (err) {
      setAlertk({
        visible: true,
        message: err,
        color: COLOR_DANGER,
      })
    } finally {
      setSaving(false)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const openModal = () => {
    setVisibleAddUser(true)
  }
  useImperativeHandle(ref, () => ({
    openModal,
  }))
  return (
    <>
      <CModal
        alignment="center"
        scrollable
        visible={visibleAddUser}
        onClose={() => setVisibleAddUser(false)}
        aria-labelledby="VerticallyCenteredScrollableExample2"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredScrollableExample2">
            Thêm hoạt động
          </CModalTitle>
        </CModalHeader>
        <CForm onSubmit={handleSubmit} className="row g-3">
          <CModalBody>
            <CCol md={12}>
              <CFormInput
                type="text"
                id="act_name"
                name="act_name"
                label="Tiêu đề"
                value={formData.act_name}
                onChange={handleChange}
                invalid={!!tempErrors.act_name}
                feedback={tempErrors.act_name}
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="text"
                id="act_des"
                name="act_des"
                label="Nội dung"
                value={formData.act_des}
                onChange={handleChange}
                invalid={!!tempErrors.act_des}
                feedback={tempErrors.act_des}
              />
            </CCol>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAddUser(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit" disabled={saving}>
              {saving ? 'Đang lưu...' : 'Lưu'}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
})
export default ComUserActivityAdd
