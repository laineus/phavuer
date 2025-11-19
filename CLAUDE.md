# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview
Phavuer is a wrapper library that integrates Phaser 3 with Vue 3, enabling declarative game development. It allows developers to control Phaser game objects through Vue components instead of using Phaser's imperative API.

## Essential Commands

### Development
- `npm install` - Install dependencies
- `npm run dev` - Start development server with hot reload
- `npm run preview` - Preview production build

### Build
- `npm run build` - Build library for production (outputs to `dist/`)
- `npm run build:watch` - Build in watch mode for continuous development

### Code Quality
- `npm run lint` - Check code with ESLint
- `npm run lint:fix` - Fix linting issues automatically
- `npm test` - Run tests with Vitest

### Testing
- Tests are located in `src/components/__tests__/`
- Run specific test: `npm test -- <test-name>`
- Tests run in Chrome browser environment

## Architecture Overview

### Core Concepts
1. **Vue Components wrap Phaser Objects**: Each Phaser game object (Sprite, Text, Rectangle, etc.) has a corresponding Vue component
2. **Dependency Injection**: Uses Vue's provide/inject for passing Phaser instances through component tree
3. **Reactive Props**: All Phaser properties can be controlled via Vue's reactivity system
4. **initGameObject()**: The main function that bridges Vue and Phaser, handling prop watching, events, and lifecycle

### Component Pattern
Every Phaser wrapper component follows this structure:
```javascript
1. Import dependencies
2. Define props (extends gameObjectProps)
3. Define emits (extends gameObjectEmits)
4. In setup():
   - Inject scene/container
   - Create Phaser object
   - Call initGameObject()
   - Provide object for children
   - Return object
5. Template with <slot />
```

### Key Files
- `src/index.js` - Main exports and entry point
- `src/components/initGameObject.js` - Core Vue-Phaser bridge logic
- `src/components/setters.js` - Maps Vue props to Phaser methods
- `src/components/Game.vue` - Root component that creates Phaser.Game
- `src/components/Scene.vue` - Scene wrapper component

### Component Hierarchy
```
Game → Scene → GameObjects (Text, Sprite, Rectangle, etc.) → Container (can nest)
```

### Important Patterns
- Props are kebab-case in templates but converted to camelCase for Phaser
- v-model supported for x, y, tween, and other properties
- Events are automatically set up when interactive props are used
- Objects are properly cleaned up on component unmount

## Distribution
The library builds to:
- `dist/phavuer.min.js` - UMD format
- `dist/phavuer.esm.min.js` - ES module format
- `types/phavuer.d.ts` - TypeScript definitions

## Documentation
- Main docs: https://phavuer.laineus.com
- Storybook components in `docs/` directory
