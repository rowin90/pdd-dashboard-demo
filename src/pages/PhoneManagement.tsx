import { useState } from 'react'
import './PhoneManagement.css'

interface Phone {
  id: number
  phone: string
  ip: string
  phoneSwitch: boolean
  teamSwitch: boolean
  riskSwitch: boolean
}

// 模拟手机数据
const initialPhones: Phone[] = [
  { id: 1, phone: '13800138001', ip: '192.168.1.101:5555', phoneSwitch: true, teamSwitch: false, riskSwitch: true },
  { id: 2, phone: '13800138002', ip: '192.168.1.102:5555', phoneSwitch: false, teamSwitch: true, riskSwitch: false },
  { id: 3, phone: '13800138003', ip: '192.168.1.103:5555', phoneSwitch: true, teamSwitch: true, riskSwitch: false },
  { id: 4, phone: '13800138004', ip: '192.168.1.104:5555', phoneSwitch: false, teamSwitch: false, riskSwitch: true },
  { id: 5, phone: '13800138005', ip: '192.168.1.105:5555', phoneSwitch: true, teamSwitch: false, riskSwitch: true },
  { id: 6, phone: '13800138006', ip: '192.168.1.106:5555', phoneSwitch: false, teamSwitch: true, riskSwitch: false },
  { id: 7, phone: '13800138007', ip: '192.168.1.107:5555', phoneSwitch: true, teamSwitch: true, riskSwitch: true },
  { id: 8, phone: '13800138008', ip: '192.168.1.108:5555', phoneSwitch: false, teamSwitch: false, riskSwitch: false },
  { id: 9, phone: '13800138009', ip: '192.168.1.109:5555', phoneSwitch: true, teamSwitch: false, riskSwitch: false },
  { id: 10, phone: '13800138010', ip: '192.168.1.110:5555', phoneSwitch: false, teamSwitch: true, riskSwitch: true },
]

export default function PhoneManagement() {
  const [phones, setPhones] = useState<Phone[]>(initialPhones)

  const toggleSwitch = (id: number, switchType: 'phoneSwitch' | 'teamSwitch' | 'riskSwitch') => {
    setPhones(phones.map(phone =>
      phone.id === id ? { ...phone, [switchType]: !phone[switchType] } : phone
    ))
  }

  return (
    <div className="phone-management-page">
      <header>
        <h2>PDD下单管理后台</h2>
      </header>
      <div className="phone-list">
        <table>
          <thead>
            <tr>
              <th>手机号</th>
              <th>IP地址</th>
              <th>手机开关</th>
              <th>团队开关</th>
              <th>风控开关</th>
            </tr>
          </thead>
          <tbody>
            {phones.map(phone => (
              <tr key={phone.id}>
                <td>{phone.phone}</td>
                <td>{phone.ip}</td>
                <td>
                  <button
                    className={`switch ${phone.phoneSwitch ? 'on' : 'off'}`}
                    onClick={() => toggleSwitch(phone.id, 'phoneSwitch')}
                  >
                    {phone.phoneSwitch ? '开' : '关'}
                  </button>
                </td>
                <td>
                  <button
                    className={`switch ${phone.teamSwitch ? 'on' : 'off'}`}
                    onClick={() => toggleSwitch(phone.id, 'teamSwitch')}
                  >
                    {phone.teamSwitch ? '开' : '关'}
                  </button>
                </td>
                <td>
                  <button
                    className={`switch ${phone.riskSwitch ? 'on' : 'off'}`}
                    onClick={() => toggleSwitch(phone.id, 'riskSwitch')}
                  >
                    {phone.riskSwitch ? '开' : '关'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
