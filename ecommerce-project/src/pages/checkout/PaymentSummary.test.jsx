import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router'
import userEvent from '@testing-library/user-event'
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary'

vi.mock('axios');

describe('Payment Summary Component', () => {
  let loadCart;
  let user;
  let paymentSummary;

  beforeEach(() => {
    loadCart = vi.fn();

    axios.get.mockImplementation(async (urlPath) => { // async since needs to return a promise
      // axios.get(url);
      // Normally returns a response (an object) with the property '.data'
      if (urlPath === '/api/products') {
        return {
          data: [  {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
              stars: 4.5,
              count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
          },
          {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            image: "images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            rating: {
              stars: 4,
              count: 127
            },
            priceCents: 2095,
            keywords: ["sports", "basketballs"]
          }]
        }
      }
    });
    
    user = userEvent.setup();

    paymentSummary = {
      totalItems: 3,
      productCostCents: 4275,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 4774,
      taxCents: 477,
      totalCostCents: 5251
    };


  })

  it('displays details correctly', async () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
      </MemoryRouter>
    );

    expect(screen.getByText('Items (3):')).toBeInTheDocument();

    // method 1: by element (for first 3 costs)
    const productCost = screen.getByTestId('payment-summary-product-cost');
    expect(productCost).toHaveTextContent('$42.75');

    const shippingCost = screen.getByTestId('payment-summary-shipping-cost');
    expect(shippingCost).toHaveTextContent('$4.99');

    const totalBeforeTax = screen.getByTestId('payment-summary-total-before-tax');
    expect(totalBeforeTax).toHaveTextContent('$47.74');

    // method 2: by text (for last 2 costs)
    expect(
      within(screen.getByTestId('payment-summary-tax')).getByText('$4.77')
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId('payment-summary-total')).getByText('$52.51')
    ).toBeInTheDocument();
  })

  it('places order correctly', async () => {
    function Location() {
      const location = useLocation();
      return(
        <div
          data-testid="url-path">
            {location.pathname}
        </div>
      )
    }

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
        <Location />
      </MemoryRouter>
    );

    const placeOrderButton = screen.getByTestId('place-order-button');
    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith(
      '/api/orders'
    );
    expect(loadCart).toHaveBeenCalled();

    const locationComponent = screen.getByTestId('url-path');
    expect(locationComponent).toHaveTextContent('/orders')

  })

})