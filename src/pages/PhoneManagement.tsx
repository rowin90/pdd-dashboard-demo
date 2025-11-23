import { useState } from 'react'
import { Table, Switch, Card, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'

const { Title } = Typography

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

  const columns: ColumnsType<Phone> = [
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: '手机开关',
      key: 'phoneSwitch',
      render: (_, record) => (
        <Switch
          checked={record.phoneSwitch}
          onChange={() => toggleSwitch(record.id, 'phoneSwitch')}
        />
      ),
    },
    {
      title: '团队开关',
      key: 'teamSwitch',
      render: (_, record) => (
        <Switch
          checked={record.teamSwitch}
          onChange={() => toggleSwitch(record.id, 'teamSwitch')}
        />
      ),
    },
    {
      title: '风控开关',
      key: 'riskSwitch',
      render: (_, record) => (
        <Switch
          checked={record.riskSwitch}
          onChange={() => toggleSwitch(record.id, 'riskSwitch')}
        />
      ),
    },
  ]

  return (
    <div>
      <Title level={2}>手机管理</Title>
      <Card>
        <Table
          columns={columns}
          dataSource={phones}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </Card>
    </div>
  )
}
