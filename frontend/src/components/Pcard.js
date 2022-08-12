import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function Pcard(props) {
  return (
    <Card className="m-3 border-0" style={{ height: '30rem' }}>
      <div style={{ height: '18rem' }}>
        <Card.Img
          variant="top"
          src={require('../' + props.details.ImagePath)}
        />
      </div>
      <Card.Body>
        <Card.Text style={{ height: '3rem' }}>
          {props.details.ModelName}
        </Card.Text>
        <Card.Title>₹{props.details.Price.toLocaleString()}</Card.Title>
        <Card.Subtitle className="my-1">
          Seating: {props.details.Seating}
        </Card.Subtitle>
        <Button className="float-end" variant="primary">
          Buy Now
        </Button>
      </Card.Body>
    </Card>
  );
}
