import { Header } from '../components/Header'
import './NotFoundPage.css';

export function NotFoundPage( {cart} ) {
  return(
    <>
      <title>404: Not Found</title>

      <Header cart={cart} />

      <div className="not-found-container">
        <p>404: Page not found.</p>
      </div>
      

    </>
  );
}