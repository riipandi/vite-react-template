# StyleX Implementation Plan for Extra Components

## Overview
Implement StyleX styling for 12 extra components based on origin Tailwind styles from `@origin/extras/`.

## Component Complexity Analysis

### Tier 1 - Simple Components (Direct Translation)
1. **stack** - Flexbox layout with direction/spacing variants
   - ✅ Can implement: flex, gap, flex-direction, flex-wrap
   - ❌ Defer: `*:data-[slot=separator]:-my-2` (compound selector)

2. **spinner** - SVG spinner with animation
   - ✅ Can implement: keyframes animation, size variants
   - ✅ All features implementable

3. **label** - Form label
   - ✅ Can implement: flex, gap, text, cursor
   - ❌ Defer: `has-[>[disabled],>[data-disabled]]:cursor-not-allowed` (has selector)
   - ❌ Defer: `[&_p[data-slot=text]]:not-first:mt-0` (compound selector)

4. **link** - Anchor link with variants
   - ✅ Can implement: colors, sizes, underline states, focus-visible
   - ❌ Defer: disabled states (requires data-disabled handling)

### Tier 2 - Medium Complexity
5. **hotkey** - Keyboard shortcut display
   - ✅ Can implement: layout, colors, shadows
   - ❌ Defer: `in-data-[slot=tooltip-content]:*` (parent selector)
   - ❌ Defer: `[&_svg:not([class*="size-"])]:size-3` (child selector)

6. **chip** - Badge/tag component
   - ✅ Can implement: variants, sizes, layout
   - ❌ Defer: pseudo-elements (::before, ::after)

7. **textarea** - Multiline input
   - ✅ Can implement: base styles, variants, sizes
   - ❌ Defer: `placeholder:*` states
   - ❌ Defer: `field-sizing-content` (utility)
   - ⚠️ Partial: `hover:not-[[disabled],[data-disabled]]:not-focus:` (complex nesting)

8. **typography** - Text components (Heading, Text, Lead, Strong, Code)
   - ✅ Can implement: most text styles
   - ❌ Defer: `scroll-m-20` (scroll margin)
   - ❌ Defer: `not-first:mt-2` (sibling selector)
   - ❌ Defer: `text-balance` (utility)

### Tier 3 - High Complexity (Heavy Deferrals)
9. **icon-box** - Decorative icon container
   - ⚠️ Major issue: Relies heavily on `::before` and `::after` pseudo-elements
   - ❌ Defer: All pseudo-element styling (gradient overlays)
   - ❌ Defer: `[&_svg:not([class*=size-])]:size-*` (child selectors)
   - ✅ Can implement: base layout, sizes, border-radius

10. **item** - List item with slots
    - ⚠️ Complex compound selectors throughout
    - ❌ Defer: `[a]:cursor-pointer` (child selector)
    - ❌ Defer: `[a,button]:hover:*` (compound child hover)
    - ❌ Defer: `has-data-checked:*` (has selector)
    - ❌ Defer: `[&_svg:not([class*=size-])]:size-*` (child selector)
    - ✅ Can implement: base layout, colors, gaps, padding

11. **blockquote** - Quote with decorative elements
    - ⚠️ Uses `::before` for quote mark decoration
    - ❌ Defer: All `::before` pseudo-element styling
    - ✅ Can implement: layout, colors, borders, text styles

12. **card** - Complex card layout
    - ⚠️ Extremely complex compound selectors
    - ❌ Defer: `has-[svg]:*` (has selector)
    - ❌ Defer: `has-data-[slot=iconbox]:*:data-[slot=card-description]:col-start-2` (multi-level)
    - ❌ Defer: `**:data-[slot=iconbox]:row-span-2` (descendant selector)
    - ❌ Defer: `not-[:has([data-slot=iconbox])]:items-center` (negated has)
    - ✅ Can implement: base layout, variants, colors, shadows

## Implementation Strategy

### Phase 1: Simple Components
Implement stack, spinner, label, link with minimal deferrals.

### Phase 2: Medium Components
Implement hotkey, chip, textarea, typography with partial deferrals.

### Phase 3: Complex Components
Implement icon-box, item, blockquote, card with extensive deferrals.

## Token Mapping Reference

### Colors
- `text-foreground-neutral` → `colorVar.fgNeutral`
- `text-foreground-neutral-faded` → `colorVar.fgNeutralFaded`
- `text-foreground-primary` → `colorVar.fgPrimary`
- `text-foreground-critical` → `colorVar.fgCritical`
- `text-foreground-positive` → `colorVar.fgPositive`
- `text-foreground-warning` → `colorVar.fgWarning`
- `text-on-background-*` → `colorVar.onBg*`
- `bg-background-*` → `colorVar.bg*`
- `ring-border-*` → `colorVar.border*`

### Spacing
- `gap-2` → `spaceVar[2]`
- `px-3` → `paddingInline: spaceVar[3]`
- `py-2` → `paddingBlock: spaceVar[2]`
- `p-4` → `padding: spaceVar[4]`

### Typography
- `text-xs` → `fontSizeVar.xs`
- `text-sm` → `fontSizeVar.sm`
- `text-base` → `fontSizeVar.md`
- `text-lg` → `fontSizeVar.lg`
- `text-xl` → `fontSizeVar.xl`
- `font-medium` → `fontWeightVar.medium`
- `font-semibold` → `fontWeightVar.semibold`
- `font-bold` → `fontWeightVar.bold`

### Radius
- `rounded-sm` → `radiusVar.xs`
- `rounded` → `radiusVar.sm`
- `rounded-md` → `radiusVar.md`
- `rounded-lg` → `radiusVar.lg`
- `rounded-full` → `radiusVar.full`

### Shadows
- `shadow-xs` → `shadowVar.xs`
- `shadow-sm` → `shadowVar.sm`
- `shadow` → `shadowVar.md`
- `shadow-md` → `shadowVar.md`
- `shadow-lg` → `shadowVar.lg`
- `shadow-xl` → `shadowVar.xl`
- `shadow-raised` → `shadowVar.raised`

## Implementation Notes

### Variant Pattern
Use `stylex.createTheme()` for color variants when multiple CSS variables need to change together.

### Conditional Styles
Use `stylex.props()` with conditional expressions:
```tsx
{...stylex.props(
  baseStyles.base,
  variantStyles[variant],
  sizeStyles[size],
  condition && conditionalStyles.style
)}
```

### Deferral Comments
Use `// ans:` comments to mark deferred features:
```tsx
// ans: pseudo-element styling deferred - requires ::before/::after support
// ans: compound selector deferred - requires parent/child selector support
```

### State Handling
For hover/focus states, use StyleX pseudo-class support:
```tsx
':hover': { ... },
':focus-visible': { ... },
':active': { ... }
```

### Data Attributes
For data attributes, use attribute selectors:
```tsx
'[data-state=open]': { ... },
'[data-disabled]': { ... }
```

## Success Criteria
- [ ] All 12 components have StyleX implementations
- [ ] Typecheck passes (`pnpm typecheck`)
- [ ] Build passes (`pnpm build`)
- [ ] All tests pass (`pnpm test`)
- [ ] Deferred features documented with `ans:` comments
- [ ] Component API remains unchanged
- [ ] Visual output matches origin as closely as StyleX allows

## Execution Order
1. stack.stylex.tsx
2. spinner.stylex.ts
3. label.stylex.tsx
4. link.stylex.tsx
5. hotkey.stylex.tsx
6. chip.stylex.ts
7. textarea.stylex.tsx
8. typography.stylex.tsx
9. icon-box.stylex.tsx
10. item.stylex.tsx
11. blockquote.stylex.tsx
12. card.stylex.tsx

After each implementation:
- Run `pnpm typecheck` to verify types
- Run `pnpm build` to verify compilation
- Run `pnpm test` to verify functionality
- Document any deferrals with `ans:` comments
