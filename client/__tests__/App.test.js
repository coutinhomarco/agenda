import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import App from '../src/App';
import { BrowserRouter } from 'react-router-dom';


test('renders learn react link', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const linkElement = screen.getByText(/your agenda/i);
    expect(linkElement).toBeInTheDocument();
});
