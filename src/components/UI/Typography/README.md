# Typography Component

A flexible and reusable typography component for the Stretch Landing page.

## Usage

```jsx
import { Typography } from './components';

// Use as standard HTML elements
<Typography as="h1">Heading 1</Typography>
<Typography as="p">Paragraph text</Typography>

// Use with custom typography variants
<Typography as="hero-title">STRETCH</Typography>
<Typography as="section-title">What is Stretch?</Typography>
<Typography as="section-subtitle">Use Cases</Typography>

// Override element while keeping variant styling
<Typography as="div" variant="hero-title">Custom hero</Typography>

// Add custom classes
<Typography as="p6" className="text-center">Centered text</Typography>

// Use with any HTML attributes
<Typography as="p" id="intro" aria-label="Introduction">
  Welcome text
</Typography>
```

## Props

| Prop        | Type      | Default | Description                                          |
| ----------- | --------- | ------- | ---------------------------------------------------- |
| `as`        | string    | `'p'`   | HTML element or typography variant to render         |
| `variant`   | string    | -       | Optional typography variant (overrides `as` styling) |
| `className` | string    | -       | Additional CSS classes                               |
| `children`  | ReactNode | -       | Content to render                                    |
| `...rest`   | any       | -       | Additional HTML attributes                           |

## Available Variants

### Custom Typography Variants

- `hero-title` - Large hero titles (48px → 112px, ExtraBold)
- `section-title` - Section headings (40px → 72px, ExtraBold/Bold)
- `section-subtitle` - Section subtitles (23px, SemiBold)
- `menu-link` - Navigation links (16px → 23px, Regular/SemiBold)
- `p6` - Small paragraph (14px, Regular)
- `p6-bold` - Small bold paragraph (14px, Bold)
- `p4` - Medium paragraph (24px, Regular)
- `p4-bold` - Medium bold paragraph (24px, Bold)
- `p3-title` - Title paragraph (28px, Bold)
- `hero-feature` - Hero features with opacity (14px → 20px)
- `button-text` - Button labels (18px → 32px, Bold)

### Standard HTML Elements

- `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- `p`, `span`, `div`, `section`, `article`
- `label`, `strong`, `em`, `small`, `blockquote`

## Examples

```jsx
// Hero section
<Typography as="hero-title">STRETCH</Typography>

// Section with subtitle
<Typography as="section-title">What is Stretch?</Typography>
<Typography as="section-subtitle">
  A seamless SaaS platform for cross-platform performance
</Typography>

// Navigation
<Typography as="menu-link">Solutions</Typography>

// Body text
<Typography as="p4">
  Stretch is a seamless SaaS platform that sheds light on duplication...
</Typography>

// Features with custom class
<Typography as="hero-feature" className="text-justify">
  Trusted by leading marketers and agencies
</Typography>

// Semantic heading with custom styling
<Typography as="h1" variant="section-title">
  Custom Heading
</Typography>
```
