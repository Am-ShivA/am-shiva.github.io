---
title: 'Clickable Cards'
date: '2020-05-28'
slug: clickable-cards
tags:
  - CSS
  - HTML
  - JavaScript
  - React
  - Styled Components
  - Web Development
---

A collection of clickable card components built with React and Styled Components.

[View Demo](https://codepen.io/Am-ShivA/pen/xxRBvgd?editors=1100)

Card layout where the card itself isn't an anchor link, but the whole card is clickable (with a `:before` pseudo element on the main `<a>`). Links inside of the card are still clickable.

## CSS

```css
.grid__item {
  &:hover,
  &:focus-within {
    background-color: #eee;
  }

  a {
    position: relative;
    z-index: 1;
  }

  h2 {
    a {
      position: static;

      &:hover,
      &:focus {
        color: blue;
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        transition: background-color 0.1s ease-out;
        background-color: transparent;
      }
    }
  }
}
```
