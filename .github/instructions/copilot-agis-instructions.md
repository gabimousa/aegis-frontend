---
applyTo: '*
*'
---

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

## Project Context

This is a React application built with Nx workspace structure that serves as the **frontend for an Inventory Management System**. The application connects to a backend service via **GraphQL API** to manage inventory data, products, stock levels, and related operations.

### Application Purpose

- Inventory tracking and management
- Product catalog management
- Stock level monitoring
- Inventory operations (add, update, remove items)
- Reporting and analytics for inventory data

### API Integration

- Uses GraphQL for all backend communication
- Implement queries for data fetching
- Implement mutations for data modifications
- Consider using Apollo Client or similar GraphQL client library for state management

## UI Framework Guidelines

### React Bootstrap Usage

When generating React components or UI code, **always prefer react-bootstrap components** over regular HTML elements or custom styling:

- Use `Container`, `Row`, `Col` for layout instead of div with custom CSS
- Use `Button` component instead of `<button>` elements
- Use `Card`, `Card.Header`, `Card.Body`, `Card.Footer` for card layouts
- Use `Form`, `Form.Group`, `Form.Control`, `Form.Label` for forms
- Use `Nav`, `Navbar`, `NavDropdown` for navigation
- Use `Modal`, `Alert`, `Badge`, `Spinner` for common UI patterns
- Use `Table` component for tabular data
- Use Bootstrap utility classes for spacing, colors, and responsive design

### Import Statements

Always import react-bootstrap components at the top of React files:

```typescript
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
```

### Styling Approach

- Prefer Bootstrap utility classes over custom CSS when possible
- Use react-bootstrap's built-in props for styling (e.g., `variant`, `size`, `className`)
- Maintain consistency with Bootstrap's design system

### CSS Modules and SCSS

When custom styling is needed beyond Bootstrap utilities:

- **Use CSS Modules** for component-specific styling
- **Write all CSS code in SCSS format** (`.module.scss` files)
- Import styles using: `import styles from './ComponentName.module.scss';`
- Apply styles using: `className={styles.className}`
- Use SCSS features like variables, nesting, mixins, and functions
- Keep styles scoped to components to avoid global conflicts

Example structure:

```typescript
// Component file: MyComponent.tsx
import styles from './MyComponent.module.scss';

export const MyComponent = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Title</h1>
  </div>
);
```

```scss
// Style file: MyComponent.module.scss
.container {
  padding: 1rem;

  .title {
    color: $primary-color;
    font-size: 1.5rem;
  }
}
```

### Icons

For all icons in the application, **use tabler-icons-react** instead of HTML classes or other icon libraries:

- Import specific icons from `tabler-icons-react`
- Use PascalCase naming for icon components
- Icons are React components that can accept props like `size`, `color`, `stroke`
- Prefer using icons consistently throughout the application

Example usage:

```typescript
import { IconHome, IconUser, IconSettings, IconPackage } from 'tabler-icons-react';

export const MyComponent = () => (
  <div>
    <Button>
      <Activity size={48} color="red" />
      Home
    </Button>
    <Package size={48} strokeWidth={2} color={'black'} />
  </div>
);
```

Common inventory management icons to use:

- `IconPackage` - for products/items
- `IconBoxSeam` - for inventory/stock
- `IconTruck` - for suppliers/shipping
- `IconUsers` - for customers
- `IconChartBar` - for analytics/reports
- `IconPlus`, `IconEdit`, `IconTrash` - for CRUD operations
