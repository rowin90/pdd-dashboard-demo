import { Card, Typography, Row, Col } from 'antd'

const { Title } = Typography

export default function VideoDemo() {
  return (
    <div>
      <Title level={2}>视频演示</Title>
      <Row gutter={[24, 24]}>
      <Col xs={24} lg={12}>
          <Card title="下单视频" bordered={false}>
            <video
              controls
              style={{ width: '100%', maxHeight: '500px' }}
              src="/order.mp4"
            >
              您的浏览器不支持视频播放
            </video>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="复制单号视频" bordered={false}>
            <video
              controls
              style={{ width: '100%', maxHeight: '500px' }}
              src="/copySn.mp4"
            >
              您的浏览器不支持视频播放
            </video>
          </Card>
        </Col>

      </Row>
    </div>
  )
}
