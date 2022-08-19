import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';

export function CartItem(props) {
  return (
    <Card className="my-0 p-0 border-0" style={{ width: '48rem' }}>
      <Row>
        <Col>
          <div>
            <Card.Img
              className="ms-3 pb-5 pt-3 px-2"
              src={require('../' + props.item.ImagePath)}
            />
          </div>
        </Col>
        <Col xs={6} className="p-3">
          <div className="border-5">
            <Card.Text className="mb-0">{props.item.ModelName}</Card.Text>
            <p className="text-muted mt-0 mb-2">
              <small>Seating: {props.item.Seating}</small>
            </p>
            <h4>₹{props.item.Price.toLocaleString()} </h4>
            <div className="d-flex flex-row-reverse mt-4 p-3">
              <Button variant="danger">Remove</Button>
            </div>
          </div>
        </Col>
        <Col>
          <Card.Subtitle className="mt-1 text-muted ">
            <small>Delivery by 16 Aug, Thursday</small>
          </Card.Subtitle>
        </Col>
      </Row>
    </Card>
  );
}
