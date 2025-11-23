import { useState } from 'react'
import { Table, Form, Input, Select, Button, Card, Typography, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'

const { Title } = Typography
const { Option } = Select

interface OrderTask {
  id: number
  orderId: string
  createTime: string
  orderTime: string
  payTime: string
  completeTime: string
  syncTime: string
  product: string
  price: string
  warehouse: string
  forceOrder: boolean
  quantity: number
  sku: string
  unitPrice: string
  totalPrice: string
  syncOrderId: string
  phone: string
  status: string
  trackingNumber: string
}

// 模拟任务数据
const initialTasks: OrderTask[] = [
  {
    id: 1,
    orderId: 'PDD20240121001',
    createTime: '2024-01-21 08:30:00',
    orderTime: '2024-01-21 08:35:00',
    payTime: '2024-01-21 08:36:00',
    completeTime: '2024-01-21 09:15:00',
    syncTime: '2024-01-21 09:20:00',
    product: 'iPhone 15 Pro Max 256GB',
    price: '¥ 8999',
    warehouse: '上海市浦东新区张江高科技园区',
    forceOrder: true,
    quantity: 1,
    sku: 'IPHONE15PM256GB-BLUE',
    unitPrice: '¥ 8,999',
    totalPrice: '¥ 8,999',
    syncOrderId: 'SYNC20240121001',
    phone: '13800138001',
    status: '已同步',
    trackingNumber: '—'
  },
  {
    id: 2,
    orderId: 'PDD20240121002',
    createTime: '2024-01-21 09:00:00',
    orderTime: '2024-01-21 09:05:00',
    payTime: '2024-01-21 09:06:00',
    completeTime: '2024-01-21 09:08:00',
    syncTime: '2024-01-21 09:10:00',
    product: 'MacBook Pro 14寸 M3',
    price: '¥ 12999',
    warehouse: '北京市海淀区中关村大街',
    forceOrder: false,
    quantity: 1,
    sku: 'MBP14M3-512GB-SILVER',
    unitPrice: '¥ 12,999',
    totalPrice: '¥ 12,999',
    syncOrderId: 'SYNC20240121002',
    phone: '13800138002',
    status: '已同步',
    trackingNumber: '—'
  },
  {
    id: 3,
    orderId: 'PDD20240121003',
    createTime: '2024-01-21 10:00:00',
    orderTime: '2024-01-21 10:05:00',
    payTime: '2024-01-21 10:06:00',
    completeTime: '2024-01-21 10:20:00',
    syncTime: '2024-01-21 10:25:00',
    product: 'iPad Pro 12.9寸',
    price: '¥ 8999',
    warehouse: '广州市天河区天河路',
    forceOrder: true,
    quantity: 2,
    sku: 'IPADPRO129-256GB-SPACE',
    unitPrice: '¥ 8,999',
    totalPrice: '¥ 17,998',
    syncOrderId: 'SYNC20240121003',
    phone: '13800138003',
    status: '已同步',
    trackingNumber: 'SF1234567890'
  }
]

export default function OrderBoard() {
  const [tasks] = useState<OrderTask[]>(initialTasks)
  const [form] = Form.useForm()

  const handleSearch = (values: any) => {
    console.log('搜索:', values)
  }

  const handleReset = () => {
    form.resetFields()
  }

  const columns: ColumnsType<OrderTask> = [
    {
      title: '订单ID',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 150,
    },
    {
      title: '时间信息',
      key: 'timeInfo',
      width: 200,
      render: (_, record) => (
        <div>
          <div>创建时间：{record.createTime}</div>
          <div>下单时间：{record.orderTime}</div>
          <div>支付时间：{record.payTime}</div>
          <div>完成时间：{record.completeTime}</div>
          <div>同步时间：{record.syncTime}</div>
        </div>
      ),
    },
    {
      title: '商品信息',
      key: 'productInfo',
      width: 250,
      render: (_, record) => (
        <div>
          <div>商品：{record.product}</div>
          <div>价格：{record.price}</div>
          <div>仓库地址：{record.warehouse}</div>
          <div>是否强制下单：{record.forceOrder ? '是' : '否'}</div>
        </div>
      ),
    },
    {
      title: '下单数量/SKU信息',
      key: 'quantityInfo',
      width: 200,
      render: (_, record) => (
        <div>
          <div>下单数量：{record.quantity}</div>
          <div>SKU信息：{record.sku}</div>
          <div>单价：{record.unitPrice}</div>
          <div>总价：{record.totalPrice}</div>
        </div>
      ),
    },
    {
      title: '同步单号',
      dataIndex: 'syncOrderId',
      key: 'syncOrderId',
      width: 150,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },
    {
      title: '运单号',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: () => (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Button size="small" block>重做</Button>
          <Button size="small" block>补充单号</Button>
          <Button size="small" block>补充运单号</Button>
          <Button size="small" type="primary" block>发起同步任务</Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Title level={2}>PDD下单任务看板</Title>

      <Card style={{ marginBottom: 16 }}>
        <Form
          form={form}
          layout="inline"
          onFinish={handleSearch}
          style={{ marginBottom: 0 }}
        >
          <Form.Item name="orderId" label="订单ID">
            <Input placeholder="订单ID" allowClear />
          </Form.Item>
          <Form.Item name="productName" label="商品名称">
            <Input placeholder="商品名称" allowClear />
          </Form.Item>
          <Form.Item name="createTime" label="创建时间">
            <Input placeholder="创建时间" allowClear />
          </Form.Item>
          <Form.Item name="orderTime" label="下单时间">
            <Input placeholder="下单时间" allowClear />
          </Form.Item>
          <Form.Item name="payTime" label="支付时间">
            <Input placeholder="支付时间" allowClear />
          </Form.Item>
          <Form.Item name="completeTime" label="完成时间">
            <Input placeholder="完成时间" allowClear />
          </Form.Item>
          <Form.Item name="warehouse" label="仓库地址">
            <Input placeholder="仓库地址" allowClear />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select placeholder="全部" allowClear style={{ width: 120 }}>
              <Option value="已同步">已同步</Option>
              <Option value="未同步">未同步</Option>
            </Select>
          </Form.Item>
          <Form.Item name="forceOrder" label="是否强制下单">
            <Select placeholder="全部" allowClear style={{ width: 120 }}>
              <Option value="是">是</Option>
              <Option value="否">否</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                搜索
              </Button>
              <Button onClick={handleReset} icon={<ReloadOutlined />}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={tasks}
          rowKey="id"
          scroll={{ x: 1500 }}
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
