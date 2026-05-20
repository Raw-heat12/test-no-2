# PipWise Trader Terminal

PipWise Trader is a high-performance, real-time lot size calculator and risk management suite designed for professional traders. It provides instant pip value calculations and precise lot sizing based on current market prices and trade risk parameters.

## 🚀 Features

- **Real-time Lot Sizing**: Calculate position sizes instantly based on your account balance, risk percentage, and stop loss.
- **Dynamic Pip Value Calculation**: Support for Standard pairs, JPY crosses, and Gold (XAUUSD) with automated math conversions.
- **Trade History**: Keep track of your calculated positions locally.
- **Professional UI**: A sleek, dark-mode terminal interface built with React and Tailwind CSS.
- **Responsive Design**: Optimized for both desktop and mobile trading setups.

## 🛠️ Built With

- [React 19](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand) (State Management)
- [Lucide React](https://lucide.dev/) (Icons)
- [Motion](https://motion.dev/) (Animations)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pipwise-trader.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 📐 Calculation Rules

PipWise uses industry-standard formulas for pip value calculation:
- **Standard Pairs**: 0.0001 = 1 Pip ($10/Lot for USD-quoted pairs).
- **JPY Pairs**: 0.01 = 1 Pip (Pip value depends on USD/JPY rate).
- **XAUUSD (Gold)**: 0.10 Move = 1 Pip ($10 Fixed/Lot).

## 📄 License

This project is licensed under the Apache-2.0 License.

## ⚠️ Disclaimer

PipWise is for educational and informational purposes only. Trading involves significant risk. Always verify your calculations before placing real trades.
