---
name: Obsidian Engineering
colors:
  surface: '#111317'
  surface-dim: '#111317'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#6bd8cb'
  on-secondary: '#003732'
  secondary-container: '#29a195'
  on-secondary-container: '#00302b'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#ca8100'
  on-tertiary-container: '#3e2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#111317'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 20px
  margin: 32px
---

## Brand & Style
The design system is engineered for deep-focus environments where high-performance data and precision are paramount. The aesthetic is a fusion of **Corporate Modern** reliability and **Minimalist** restraint, characterized by a matte-dark foundation that reduces ocular fatigue during long sessions.

The brand personality is authoritative, technical, and premium. It evokes the feeling of a high-end cockpit or a specialized laboratory instrument. Visual interest is achieved not through heavy decoration, but through **subtle glows**, high-precision micro-interactions, and the strategic use of light as a functional signal rather than just an ornament.

## Colors
The palette is built upon an ultra-low-luminance "Obsidian" base. 

- **Base Colors**: We utilize a range of matte charcoals starting from `#0A0B0D`. Surfaces never reach pure black, ensuring depth remains visible.
- **Primary (Deep Purple)**: Used for core actions and primary focus states. It should feel rich and saturated, not pastel.
- **Success (Teal)**: A vibrant teal replaces traditional green for a more technical, modern engineering feel.
- **Warning (Amber)**: A refined, high-visibility amber for alerts that demands attention without breaking the professional atmosphere.
- **Semantic Accents**: Colors are often applied as "light-leaks" or thin 1px accents rather than large fills to maintain the matte aesthetic.

## Typography
Typography is split between functional UI text and technical data. 

**Hanken Grotesk** provides a sharp, contemporary sans-serif feel for all interface elements and headers, offering excellent legibility at small scales. **JetBrains Mono** is reserved for code blocks, terminal outputs, and metadata labels, reinforcing the "engineering workspace" narrative.

For mobile, `display-lg` scales down to `32px` to ensure content fits within the narrower viewport without excessive wrapping.

## Layout & Spacing
The design system employs a **Fixed Grid** for documentation and dashboard views to maintain a rigorous, organized structure. 

- **Desktop (1440px+)**: 12-column grid, 80px margins, 24px gutters.
- **Tablet (768px - 1439px)**: 8-column grid, 32px margins, 20px gutters.
- **Mobile (Up to 767px)**: 4-column grid, 16px margins, 16px gutters.

Spacing follows a strict 4px base unit. Component internal padding should be tight and condensed (`8px` to `12px`) to maximize information density, common in professional developer tools.

## Elevation & Depth
In a matte dark theme, traditional shadows are replaced by **Tonal Layers** and **Subtle Outlines**.

- **Level 0 (Background)**: `#0A0B0D` - The canvas.
- **Level 1 (Card/Container)**: `#16191E` - Raised surface with a 1px solid border (`#2D3139`).
- **Level 2 (Popovers/Modals)**: `#1C2026` - Features a subtle "Inner Glow" (0.5px white at 5% opacity) on the top edge to simulate light hitting a physical bevel.

**Glows**: Interactive elements use a primary-tinted outer glow (`0px 0px 12px rgba(139, 92, 246, 0.2)`) instead of heavy shadows to indicate focus or activity.

## Shapes
The shape language is "Soft" but disciplined. A standard `0.25rem` (4px) radius is used for buttons and inputs to keep the workspace feeling precise and technical. Larger containers like cards use `0.5rem` (8px). 

Avoid fully rounded (pill) shapes unless used for status indicators or notification badges, where distinct contrast in geometry helps them stand out from the structural UI.

## Components
- **Buttons**: Primary buttons use a solid Deep Purple fill. Secondary buttons are ghost-style with a 1px border. Hover states should trigger a subtle increase in the primary glow effect.
- **Input Fields**: Matte backgrounds (`#0F1115`) with a 1px border. On focus, the border transitions to teal or purple with a soft outer glow.
- **Code Blocks**: Always use a slightly darker background than the surrounding card to create an inset "well" effect. Use syntax highlighting based on the Primary/Success/Warning palette.
- **Chips/Status**: Use JetBrains Mono for the text. Status indicators use a "dot" prefix with a breathing pulse animation for active states.
- **Navigation**: Sidebar items use a vertical bar (2px width) in the primary color to indicate the active state, rather than a full-width background highlight.
- **Scrollbars**: Minimalist, thin (4px) "trackless" bars in a muted grey that only appear on hover to maintain the clean, matte look.