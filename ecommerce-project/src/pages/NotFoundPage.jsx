import { Header } from '../components/Header'
import './NotFoundPage.css';

export function NotFoundPage() {
  return(
    <>
      <title>404: Not Found</title>

      <Header />

      <div className="not-found-container">
        <p>404: Page not found.</p>
      </div>
      

    </>
  );
}