# 🎨 Elementor to Puck Converter

A Next.js application that converts Elementor JSON data to Puck Editor format and back, enabling seamless bidirectional data transformation between the two systems.

## 🎯 Case Requirements

This project implements the "JSON to Puck Converter" case with the following requirements:

### ✅ **Widget Library**
- **HeadingBlock** - Configurable headings (H1-H6) with alignment options
- **TextBlock** - Rich text editor with HTML support
- **ButtonBlock** - Interactive buttons with variants (primary, secondary, outline)
- **IconBlock** - Font Awesome icons with size and color options

### ✅ **JSON Conversion**
- **Elementor JSON → Puck format** - Complete transformation
- **Puck format → Elementor JSON** - Bidirectional conversion
- **Props mapping** - Exact mapping as specified in the case

### ✅ **Test Scenarios**
1. ✅ **Load Elementor JSON** - Import and validate Elementor data
2. ✅ **Display in Puck Editor** - Convert and render in Puck format
3. ✅ **Edit Widgets** - Modify headings, text, buttons interactively
4. ✅ **Convert Back to Elementor** - Transform edited data back to Elementor format
5. ✅ **Check Console Results** - Verify data integrity and conversion accuracy

## 🛠️ Technology Stack

- **Next.js 15** - App Router
- **Puck Editor 0.19.1** - Latest version
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Modern styling
- **Font Awesome** - Icon support

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with navigation
│   ├── test-converter/    # Complete test suite
│   └── editor/            # Puck Editor interface
├── components/            # React components
│   ├── HeadingBlock.tsx   # Heading widget
│   ├── TextBlock.tsx      # Text widget
│   ├── ButtonBlock.tsx    # Button widget
│   ├── IconBlock.tsx      # Icon widget
│   └── PuckEditor.tsx     # Puck Editor wrapper
├── converter/             # Conversion logic
│   └── json-to-puck.ts    # Bidirectional converter
└── types/                 # TypeScript definitions
    └── index.ts           # Type definitions
```

## 🔄 Conversion Mapping

### Widget Type Mapping
```typescript
const WIDGET_MAPPING = {
  'heading' → 'HeadingBlock',
  'text-editor' → 'TextBlock',
  'button' → 'ButtonBlock',
  'icon' → 'IconBlock'
};
```

### Props Mapping
```typescript
const PROPS_MAPPING = {
  'title' → 'children',
  'header_size' → 'level',
  'align' → 'alignment',
  'text' → 'children',
  'editor' → 'children'
};
```

## 📥 Input: Elementor JSON

```json
{
  "content": [
    {
      "id": "3ab5483",
      "settings": {
        "title": "What we do",
        "header_size": "h6",
        "align": "left"
      },
      "widgetType": "heading",
      "elType": "widget"
    },
    {
      "id": "2ab32d24",
      "settings": {
        "title": "We build awesome themes",
        "header_size": "h2",
        "align": "left"
      },
      "widgetType": "heading",
      "elType": "widget"
    },
    {
      "id": "6475a8c5",
      "settings": {
        "text": "Learn more"
      },
      "widgetType": "button",
      "elType": "widget"
    },
    {
      "id": "166beb3",
      "settings": {
        "selected_icon": {
          "value": "fas fa-star-of-life"
        },
        "align": "left"
      },
      "widgetType": "icon",
      "elType": "widget"
    },
    {
      "id": "5388efac",
      "settings": {
        "editor": "Habitant faucibus sollicitudin fames..."
      },
      "widgetType": "text-editor",
      "elType": "widget"
    }
  ],
  "title": "Test Page"
}
```

## 📤 Output: Puck Format

```json
{
  "content": [
    {
      "type": "HeadingBlock",
      "props": {
        "id": "3ab5483",
        "children": "What we do",
        "level": "h6",
        "alignment": "left"
      }
    },
    {
      "type": "HeadingBlock",
      "props": {
        "id": "2ab32d24",
        "children": "We build awesome themes",
        "level": "h2",
        "alignment": "left"
      }
    },
    {
      "type": "ButtonBlock",
      "props": {
        "id": "6475a8c5",
        "children": "Learn more",
        "href": "#",
        "variant": "primary"
      }
    },
    {
      "type": "IconBlock",
      "props": {
        "id": "166beb3",
        "icon": "fas fa-star-of-life",
        "size": "md",
        "color": "primary"
      }
    },
    {
      "type": "TextBlock",
      "props": {
        "id": "5388efac",
        "children": "Habitant faucibus sollicitudin fames...",
        "alignment": "left"
      }
    }
  ],
  "root": {
    "title": "Test Page"
  }
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd elementor-puck-case

# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage

1. **Home Page** (`/`) - Overview and navigation
2. **Test Converter** (`/test-converter`) - Complete test suite with 5 scenarios
3. **Editor** (`/editor`) - Interactive Puck Editor interface

## 🧪 Testing

The application includes a comprehensive test suite that covers all 5 required scenarios:

1. **Load Elementor JSON** - Validates input data
2. **Convert to Puck** - Tests forward conversion
3. **Edit Widgets** - Simulates user editing
4. **Convert Back** - Tests reverse conversion
5. **Check Results** - Verifies data integrity

Run the test suite by visiting `/test-converter` and following the step-by-step process.

## 🎨 Features

### Modern UI/UX
- **Gradient backgrounds** - Beautiful visual design
- **Responsive layout** - Works on all devices
- **Interactive buttons** - Hover effects and animations
- **Real-time preview** - See changes instantly
- **Console logging** - Detailed conversion tracking

### Component Library
- **HeadingBlock** - 6 heading levels with alignment
- **TextBlock** - Rich text with HTML support
- **ButtonBlock** - Multiple variants and sizes
- **IconBlock** - Font Awesome icons with customization

### Conversion Engine
- **Bidirectional mapping** - Elementor ↔ Puck
- **Data integrity** - Preserves all properties
- **Error handling** - Graceful fallbacks
- **Type safety** - Full TypeScript support

## 📚 Documentation

- [Puck Editor Documentation](https://puckeditor.com/docs/getting-started)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Goal**: Enable seamless conversion between Elementor JSON and Puck Editor format, allowing users to edit Elementor content in Puck and export it back to Elementor format!
