import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';

const testCasesPLN_USD = [
    { amount: '150', expected: 'PLN 150.00 = $42.86' },
    { amount: '25', expected: 'PLN 25.00 = $7.14' },
    { amount: '300', expected: 'PLN 300.00 = $85.71' },
    { amount: '350', expected: 'PLN 350.00 = $100.00' },
  ];

  const testCasesUSD_PLN = [
    { amount: '5', expected: '$5.00 = PLN 17.50' },
    { amount: '50', expected: '$50.00 = PLN 175.00' },
    { amount: '170', expected: '$170.00 = PLN 595.00' },
    { amount: '320', expected: '$320.00 = PLN 1,120.00' },
  ];
  const testCases = [
    { amount: '140', from: 'PLN', to: 'PLN', expected: 'PLN 140.00 = PLN 140.00' },
    { amount: '85', from: 'PLN', to: 'PLN', expected: 'PLN 85.00 = PLN 85.00' },
    { amount: '220', from: 'USD', to: 'USD', expected: '$220.00 = $220.00' },
    { amount: '365', from: 'USD', to: 'USD', expected: '$365.00 = $365.00' },
  ];

  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    it('should render proper info about conversion when PLN -> USD', () => {  
        for(const testObj of testCasesPLN_USD) {
          render(<ResultBox from="PLN" to="USD" amount={parseInt(testObj.amount)} />);
          const output = screen.getByTestId('amount-output');
          expect(output).toHaveTextContent(testObj.expected);
          cleanup();
        }
      });
      it('should render proper info about conversion when USD -> PLN', () => {  
        for(const testObj of testCasesUSD_PLN) {
          render(<ResultBox from="USD" to="PLN" amount={parseInt(testObj.amount)} />);
          const output = screen.getByTestId('amount-output');
          expect(output).toHaveTextContent(testObj.expected);
          cleanup();
        }
      });
      it('should render proper info about conversion when PLN -> PLN or USD -> USD', () => {  
        for(const testObj of testCases) {
          render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
          const output = screen.getByTestId('amount-output');
          expect(output).toHaveTextContent(testObj.expected);
          cleanup();
        }
      });
      it('should render "Wrong value..." when value is < 0', () => {  
        render(<ResultBox from='USD' to='PLN' amount={-1} />);
        const output = screen.getByTestId('wrong-output');
        expect(output).toHaveTextContent('Wrong value...');
        cleanup();
    });
});