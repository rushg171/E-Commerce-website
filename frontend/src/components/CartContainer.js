import { useState, useEffect } from 'react';
import { CartItem } from './CartItem';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

export function CartContainer() {
  const [cartData, setCartData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://localhost:8888/viewcart?UserID=${localStorage.getItem('UserID')}`
    )
      .then((Response) => {
        if (!Response.ok) {
          throw new Error(`Http request error. Status: ${Response.status}`);
        }
        return Response.json();
      })
      .then((resData) => {
        setCartData(resData);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setCartData(null);
      })
      .finally(setIsLoading(false));
  }, []);

  return (
    <div>
      {isLoading && <div>Loading Cart....</div>}
      {error && <div>{`Error Occured: ${error}`}</div>}
      {cartData && (
        <Card className="m-5 p-0" style={{ width: '56rem' }}>
          <ListGroup>
            {cartData.map((_, idx) => (
              <ListGroup.Item key={cartData[idx].ItemID}>
                <CartItem item={cartData[idx]} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
    </div>
  );
}
