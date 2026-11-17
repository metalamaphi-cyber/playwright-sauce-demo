# Playwright Sauce Demo POM Project

A comprehensive web automation suite for [Sauce Demo](https://www.saucedemo.com/) using Playwright and the Page Object Model (POM) pattern.

## 🚀 Key Features
- **Page Object Model**: Organized into `pages/` and `tests/` for high maintainability.
- **CI/CD Pipeline**: Integrated with GitHub Actions to run tests automatically on every push.
- **Dynamic Locators**: Robust selection of inventory items by name.
- **Extensive Test Coverage**: Includes Login, Cart persistence, Sorting, multi-item Checkout, and negative testing.

## 📁 Project Structure
- `pages/`: Contains Page Object classes (`LoginPage`, `InventoryPage`, `CheckoutPage`).
- `tests/`: Contains test specifications (`*.spec.ts`).
- `.github/workflows/`: CI/CD configuration for GitHub Actions.

## 🛠️ Setup & Execution
1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run all tests**:
   ```bash
   npx playwright test
   ```
3. **View reports**:
