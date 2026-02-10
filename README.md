# 📋DAY 7 FINAL TASK: E-commerce Store 🛒 or "E-Commerce Mini App" — Full React Skill Test

A full-featured E-commerce application demonstrating advanced React concepts and E-commerce Store.

## 🎯 Objective
Build a small **E-commerce Store** app that brings together:

• API calls (Axios / Fetch)

• Redux Toolkit (state management)

• React Router (multiple pages)

• Context API (theme toggle / auth)

• Hooks (useState, useEffect, useReducer, useRef, useMemo, useCallback)

• Custom Hooks

• Basic authentication simulation

• Error boundaries

• Optimizations (lazy loading, Suspense)

## ✨ Features Implemented

## 🔥 App Features: 
✅ **1.Routing (React Router):**
- Home page with product listing

- Product detail page with single product view

- Shopping cart management

- Checkout page with form validation

- Login/Authentication page

- Protected routes (checkout requires login)

• Pages:

o / → Home (product list)

o /cart → Shopping cart

o /product/:id → Single product details

o /checkout → Checkout page

o /login → Login page (simulated auth)

✅ **2.Product Listing & API Integration:**
- Fetches products from Fake Store API (https://fakestoreapi.com/)

- Product filtering by category and search

- Product cards with ratings and pricing

- Loading spinners during API calls

- Error handling and fallback UI

• Fetch products from API (e.g., Fake Store API).

• Show product image, title, price.

✅ **3. Cart System Redux Toolkit State Management:**
- Redux store configuration with `configureStore`

- Cart slice with complete CRUD actions

- `addToCart`, `removeFromCart`, `increaseQuantity`, `decreaseQuantity`

- Optimized selectors with `useSelector`

- Dispatch actions with `useDispatch`

• Add to Cart

• Increase / Decrease Quantity

• Remove from Cart

• Total Price Calculation

• Use useSelector, useDispatch cleanly.

✅ **4. Authentication (Context API):**
- **AuthContext**: Login/logout functionality with localStorage persistence

- **ThemeContext**: Light/Dark mode toggle with localStorage persistence

- Protected checkout route based on authentication status

• Create AuthContext to handle login/logout.

• If not logged in → redirect to /login when trying to access /checkout.

✅ **5. Theme Toggle (Context API):**

• Light / Dark mode toggle.

• Save preference in localStorage.

✅ **6.Performance (React Hooks + Optimization):**
- `useState`: Local state management for forms and UI

- `useEffect`: Side effects for API calls and theme updates

- `useReducer`: Complex form state management in checkout

- `useRef`: Focus management for input fields

- `useMemo`: Memoized filtered products list

- `useCallback`: Memoized event handlers for cart operations

- Custom hooks: `useAuth`, `useCart`, `useTheme`

✅ **7.Error Handling (Error Boundary):**
- Error Boundary component for error recovery

- Graceful fallback UI for failed API calls

- Form validation with error messages

• Wrap product details or checkout page with an ErrorBoundary.

• Show fallback UI if API fetch fails.

✅ **8. Lazy Loading (Suspense):**

• Lazy load some routes like /checkout or /product/:id.

✅ **9.Performance Optimization:**
- React.lazy and Suspense for code splitting

- Lazy loading of ProductDetail and Checkout routes

- Memoization of expensive computations

- Optimized re-renders with useCallback

✅ **10.UI/UX Features:**
- Tailwind CSS for styling

- Light/Dark mode support

- Responsive design (mobile-first)

- Toast notifications for user feedback

- Loading spinners

- Professional and clean UI

✅ **11.Data Persistence:**
- Cart items saved to localStorage

- Theme preference saved to localStorage

- User authentication state saved to localStorage

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Navigation with cart count & theme toggle
│   ├── ProductCard.jsx      # Product display card
│   ├── CartItem.jsx         # Shopping cart item
│   ├── ErrorBoundary.jsx    # Error boundary wrapper
│   ├── LoadingSpinner.jsx   # Loading indicator
│   └── Toast.jsx            # Toast notification
├── pages/
│   ├── Home.jsx             # Product listing page
│   ├── ProductDetail.jsx    # Single product details
│   ├── Cart.jsx             # Shopping cart
│   ├── Checkout.jsx         # Checkout form
│   └── Login.jsx            # Login page
├── context/
│   ├── AuthContext.jsx      # Authentication context
│   └── ThemeContext.jsx     # Theme context
├── redux/
│   ├── cartSlice.js         # Cart state & actions
│   └── store.js             # Redux store configuration
├── hooks/
│   ├── useAuth.js           # Custom auth hook
│   ├── useCart.js           # Custom cart hook
│   └── useTheme.js          # Custom theme hook
├── utils/                   # Utility functions
├── App.jsx                  # Main app component
├── index.css                # Global styles with Tailwind
└── main.jsx                 # Entry point
```

## 🗺 User Flow Example
- User opens Home → sees products → clicks "Add to Cart"

- User clicks on a product → navigates to Product Details

- User goes to Cart → reviews items → clicks Checkout

- If NOT logged in → Redirected to Login

- After login → Proceed to Checkout

## 🚀 Getting Started

## Prerequisites
- Node.js 16+ 
- npm or yarn

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

## 🎯 Usage Guide

### User Flow:

1. **Browse Products**
   - Home page displays all products from Fake Store API
   - Filter by category or search by name
   - Click "View" to see product details
   - Click "Add" to add to cart

2. **Product Details**
   - See full product description
   - Adjust quantity before adding to cart
   - Product rating and category information

3. **Shopping Cart**
   - View all cart items
   - Adjust quantities (increase/decrease)
   - Remove items
   - View total price calculation
   - Proceed to checkout (requires login)

4. **Login**
   - Demo authentication (any username, password min 6 chars)
   - Redirects to checkout after login
   - Logout option in navbar

5. **Checkout**
   - Fill shipping information
   - Enter payment details
   - Form validation with error messages
   - Order confirmation

6. **Theme Toggle**
   - Light/Dark mode toggle in navbar
   - Persists user preference
   - Applied to entire application

## 🔑 Key Technologies

- **React 19** - UI library
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

## 💾 Data Persistence

All user data persists in localStorage:
- Cart items
- Theme preference (light/dark mode)
- Authentication state

Data resets on browser cache clear.

## 🎓 Learning Outcomes

By exploring this app, you'll understand:
- ✅ State management with Redux Toolkit
- ✅ Routing with React Router v6
- ✅ Context API for global state (Auth & Theme)
- ✅ All major React hooks and custom hooks
- ✅ API integration with error handling
- ✅ Component composition and reusability
- ✅ Performance optimization techniques
- ✅ Error boundaries and error handling
- ✅ Form validation and useReducer patterns
- ✅ Responsive design with Tailwind CSS

## 📝 API Reference

**Fake Store API**: 
```
https://fakestoreapi.com/
```
- `GET /products` - Get all products
- `GET /products/:id` - Get product details
- `GET /products/categories` - Get all categories

## 🐛 Troubleshooting

**Products not loading?**
- Check internet connection
- Verify Fake Store API is accessible
- Check browser console for errors

**Cart not persisting?**
- Enable localStorage in browser settings
- Check browser storage quota

**Authentication issues?**
- Clear localStorage and retry
- Ensure password is at least 6 characters

## ✨BONUS (Super Strong if you do it):
• Loader Spinners during API loading

• Toast Notifications (Success/Error on cart actions)

• LocalStorage persistence for cart

• Nice UI with TailwindCSS or Styled Components

## You'll have practiced EVERY important production-level React skill:
- State Management (Redux)
- Routing (React Router)
- Context Handling (Auth, Theme)
- API Communication (Axios/Fetch)
- Performance Optimization (Memo, Callback, Reducer)
- Error Handling (Error Boundaries)
- App Structure Best Practices
- SSR/SSG knowledge if you want to deploy on Next.js later

## 🛒E-commerce Mini App — Final Validation Checklist ✅

### 🔥1.Basic Setup
• Project created (Vite / CRA / Next.js).

• Folder structure organized (components/, pages/, redux/, context/,hooks/).

### 📡2.API Fetching
• Used fetch or axios to get products from API.

• Show loading spinner while fetching.

• Show error message if fetching fails.

### 🌍3.Routing (React Router)
• / → Home page (product listing).

• /cart → Cart page.

• /product/:id → Product detail page.

• /checkout → Checkout page (protected route).

• /login → Login page.

### 📦4.Redux Toolkit
• Configured Redux store using configureStore.

• Created cartSlice with createSlice.

• Actions for Add to Cart, Remove, Increase, Decrease item quantity.

• Used useSelector to read cart state.

• Used useDispatch to update cart state.

### 🧠5.Context API
• Created AuthContext (handles login/logout).

• Created ThemeContext (light/dark toggle).

• Protected checkout route with AuthContext.

### ⚡6.Hooks Usage
• useState (local states like search, form inputs).

• useEffect (side-effects like fetching data).

• useReducer (for checkout form or complex form state).

• useRef (focus input fields).

• useMemo (memoize filtered product list).

• useCallback (memoize event handlers like addToCart).

• Custom Hooks created (like useAuth, useCart).

### 🛡️7.Error Handling
• Created an ErrorBoundary component.

• Wrapped at least product detail or checkout in ErrorBoundary.

• Displayed fallback UI for errors.

### 🛠️8.Optimization
• Used React.lazy and Suspense for lazy loading routes.

• Show fallback spinner while lazy loading.

### 🎨9.UI / UX
• Used TailwindCSS / Styled Components for styling.

• Mobile responsive design (basic).

• Cart page shows correct Total Amount.

• Light/Dark mode toggle works and persists.

### 💾10.Persistence (Optional but Good)
• Cart state saved to localStorage.

• Theme preference saved to localStorage.

• User auth (isLoggedIn) saved to localStorage.



