import { Pcard } from './Pcard';
import { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const sofaUrl = 'http://localhost:8888/sofa';

export const Collection = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(sofaUrl, { mode: 'cors' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((sofaData) => {
        setData(sofaData);
      })
      .catch((err) => {
        setData(null);
        setError(err);
        console.log(err);
      })
      .finally(setLoading(false));
  }, []);

  return (
    <div>
      {loading && <div>Loading your shofa...</div>}
      {error && <div>{`Error fetching sofas- ${error}`}</div>}
      {data && (
        <Row xs={1} sm={2} md={3} lg={4} className="g-1">
          {data.map((_, idx) => (
            <Col key={data[idx].ProductID}>
              <Pcard details={data[idx]} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
