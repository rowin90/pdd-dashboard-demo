import { useState } from 'react'
import './OrderBoard.css'

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
  const [searchForm, setSearchForm] = useState({
    orderId: '',
    productName: '',
    createTime: '',
    orderTime: '',
    payTime: '',
    completeTime: '',
    warehouse: '',
    status: '',
    forceOrder: ''
  })

  const handleSearch = () => {
    // 搜索逻辑
    console.log('搜索:', searchForm)
  }

  const handleReset = () => {
    setSearchForm({
      orderId: '',
      productName: '',
      createTime: '',
      orderTime: '',
      payTime: '',
      completeTime: '',
      warehouse: '',
      status: '',
      forceOrder: ''
    })
  }

  return (
    <div className="order-board-page">
      <header>
        <h2>PDD下单管理后台</h2>
      </header>

      <div className="search-form">
        <div className="form-row">
          <div className="form-item">
            <label>订单ID</label>
            <input
              type="text"
              value={searchForm.orderId}
              onChange={(e) => setSearchForm({ ...searchForm, orderId: e.target.value })}
              placeholder="订单ID"
            />
          </div>
          <div className="form-item">
            <label>商品名称</label>
            <input
              type="text"
              value={searchForm.productName}
              onChange={(e) => setSearchForm({ ...searchForm, productName: e.target.value })}
              placeholder="商品名称"
            />
          </div>
          <div className="form-item">
            <label>创建时间</label>
            <input
              type="text"
              value={searchForm.createTime}
              onChange={(e) => setSearchForm({ ...searchForm, createTime: e.target.value })}
              placeholder="创建时间"
            />
          </div>
          <div className="form-item">
            <label>下单时间</label>
            <input
              type="text"
              value={searchForm.orderTime}
              onChange={(e) => setSearchForm({ ...searchForm, orderTime: e.target.value })}
              placeholder="下单时间"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item">
            <label>支付时间</label>
            <input
              type="text"
              value={searchForm.payTime}
              onChange={(e) => setSearchForm({ ...searchForm, payTime: e.target.value })}
              placeholder="支付时间"
            />
          </div>
          <div className="form-item">
            <label>完成时间</label>
            <input
              type="text"
              value={searchForm.completeTime}
              onChange={(e) => setSearchForm({ ...searchForm, completeTime: e.target.value })}
              placeholder="完成时间"
            />
          </div>
          <div className="form-item">
            <label>仓库地址</label>
            <input
              type="text"
              value={searchForm.warehouse}
              onChange={(e) => setSearchForm({ ...searchForm, warehouse: e.target.value })}
              placeholder="仓库地址"
            />
          </div>
          <div className="form-item">
            <label>状态</label>
            <select
              value={searchForm.status}
              onChange={(e) => setSearchForm({ ...searchForm, status: e.target.value })}
            >
              <option value="">全部</option>
              <option value="已同步">已同步</option>
              <option value="未同步">未同步</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-item">
            <label>是否强制下单</label>
            <select
              value={searchForm.forceOrder}
              onChange={(e) => setSearchForm({ ...searchForm, forceOrder: e.target.value })}
            >
              <option value="">全部</option>
              <option value="是">是</option>
              <option value="否">否</option>
            </select>
          </div>
          <div className="form-actions">
            <button onClick={handleSearch}>搜索</button>
            <button onClick={handleReset}>重置</button>
          </div>
        </div>
      </div>

      <div className="task-list">
        <table>
          <thead>
            <tr>
              <th>订单ID</th>
              <th>时间信息</th>
              <th>商品信息</th>
              <th>下单数量/SKU信息</th>
              <th>同步单号</th>
              <th>手机号</th>
              <th>状态</th>
              <th>运单号</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.orderId}</td>
                <td>
                  <div>创建时间：{task.createTime}</div>
                  <div>下单时间：{task.orderTime}</div>
                  <div>支付时间：{task.payTime}</div>
                  <div>完成时间：{task.completeTime}</div>
                  <div>同步时间：{task.syncTime}</div>
                </td>
                <td>
                  <div>商品：{task.product}</div>
                  <div>价格：{task.price}</div>
                  <div>仓库地址：{task.warehouse}</div>
                  <div>是否强制下单：{task.forceOrder ? '是' : '否'}</div>
                </td>
                <td>
                  <div>下单数量：{task.quantity}</div>
                  <div>SKU信息：{task.sku}</div>
                  <div>单价：{task.unitPrice}</div>
                  <div>总价：{task.totalPrice}</div>
                </td>
                <td>{task.syncOrderId}</td>
                <td>{task.phone}</td>
                <td>{task.status}</td>
                <td>{task.trackingNumber}</td>
                <td>
                  <div className="action-buttons">
                    <button>重做</button>
                    <button>补充单号</button>
                    <button>补充运单号</button>
                    <button>发起同步任务</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
