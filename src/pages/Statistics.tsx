import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, Typography } from 'antd'

const { Title } = Typography

// 模拟统计数据
const data = [
  { date: '2024-01-01', orders: 120, success: 100, successRate: 83.3 },
  { date: '2024-01-02', orders: 150, success: 130, successRate: 86.7 },
  { date: '2024-01-03', orders: 180, success: 160, successRate: 88.9 },
  { date: '2024-01-04', orders: 200, success: 180, successRate: 90.0 },
  { date: '2024-01-05', orders: 160, success: 140, successRate: 87.5 },
  { date: '2024-01-06', orders: 220, success: 200, successRate: 90.9 },
  { date: '2024-01-07', orders: 250, success: 230, successRate: 92.0 },
]

export default function Statistics() {
  return (
    <div>
      <Title level={2}>PDD下单统计图</Title>
      <Card>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#8884d8" name="下单数" />
            <Line yAxisId="left" type="monotone" dataKey="success" stroke="#82ca9d" name="成功数" />
            <Line yAxisId="right" type="monotone" dataKey="successRate" stroke="#ff7300" name="成功率(%)" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
