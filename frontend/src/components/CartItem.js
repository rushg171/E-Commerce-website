import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

export function CartItem(props) {
  return (
    <Card className="m-3 p-3 border-5" style={{ width: '48rem' }}>
      <Row>
        <Col>
          <div>
            <Card.Img src={require('../imgs/7.webp')} />
          </div>
        </Col>
        <Col>
          <div>
            <Card.Text class="mb-0">
              Bharat Lifestyle Fabric 3 + 1 + 1 Sofa Set
            </Card.Text>
            <p class="text-muted mt-0 mb-2">
              <small>Seating: 3</small>
            </p>
            <h4>₹13,999</h4>
          </div>
        </Col>
        <Col>
          <Card.Subtitle class="mt-1 text-muted">
            <small>Delivery by 16 Aug, Thursday</small>
          </Card.Subtitle>
        </Col>
      </Row>
    </Card>
  );
}
