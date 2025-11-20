# ProSa Circular Economy Project - Documentation

## 📋 Project Overview

This is a web-based circular economy management system for the ProSa project, connecting six participants: DHI, DEW, Claas, EJOT, Siebau, and Endkunde. The system enables data tracking, file management, and information flow throughout the supply chain.

## 🎨 Design Theme

- **Primary Colors**: Green palette (#a8e6cf, #56ab91, #2d8659, #1a6b4a)
- **Secondary Colors**: Grey palette for backgrounds and text
- **Corporate Design**: Clean, modern, professional look
- **Responsive**: Works on desktop, tablet, and mobile devices

## 📁 Project Structure

```
ProSa/
├── index.html          # Main landing page with circular infographic
├── script.js           # Main page JavaScript
├── styles.css          # Main page styles
├── common.css          # Shared styles for all participant pages
├── common.js           # Shared JavaScript utilities
├── dew.html            # DEW participant page
├── dhi.html            # DHI participant page
├── claas.html          # Claas participant page
├── ejot.html           # EJOT participant page
├── siebau.html         # Siebau participant page
├── endkunde.html       # Endkunde participant page
├── img/
│   └── ProSa_cropped.png
└── files/
    └── ProSa.pptx
```

## 🔗 Navigation Flow

```
index.html (Main Hub)
    ├── Click DHI circle → dhi.html
    ├── Click DEW circle → dew.html
    ├── Click Claas circle → claas.html
    ├── Click EJOT circle → ejot.html
    ├── Click Siebau circle → siebau.html
    └── Click Endkunde circle → endkunde.html
```

## 📄 Page Details

### 1. **Main Page (index.html)**
- Interactive circular infographic showing all participants
- Animated rotating rings with arrows
- Clickable participant circles that navigate to respective pages
- Hover effects highlighting connections

### 2. **DEW Page (dew.html)**
**Components:**
- Halbzeug input field (default: "Stüli Claas")
- Menge Halbzeug with formula display: `= Stüli Claas + Menge Halbzeug`
- Upload Stückliste section (drag & drop or click)
- Upload Arbeitsplan section (drag & drop or click)
- **Group 1: Hausnorm Claas**
  - Chemische Werte (input field)
  - Mechanische Werte (input field)
- **Group 2: Schmelzkarte**
  - Chemische Werte (input field)
  - Mechanische Werte (input field)

### 3. **DHI Page (dhi.html)**
**Components:**
- 4-column table with color-coded columns:
  - **Rohmaterial** (green background)
  - **Bedarfsmenge** (orange background)
  - **Verfügbare Menge** (blue background)
  - **Fehlmenge** (pink background) - auto-calculated
- 6 rows for Schrottklasse 1-6
- **Summary section** showing totals for all columns
- **Auto-calculation**: Fehlmenge = Bedarfsmenge - Verfügbare Menge

### 4. **Claas Page (claas.html)**
**Components:**
- Same layout as DEW page
- Halbzeug input
- Menge Halbzeug with formula
- Upload sections (Stückliste & Arbeitsplan)
- **Group 1: Hausnorm EJOT** (different label from DEW)
  - Chemische Werte
  - Mechanische Werte
- **Group 2: Hausnorm Claas**
  - Chemische Werte
  - Mechanische Werte

### 5. **EJOT Page (ejot.html)**
**Components:**
- Same structure as Claas/DEW but with only ONE group
- Halbzeug input
- Menge Halbzeug with formula
- Upload sections (Stückliste & Arbeitsplan)
- **Group 1: Hausnorm EJOT** (only group)
  - Chemische Werte
  - Mechanische Werte

### 6. **Siebau Page (siebau.html)**
**Components:**
- **Endprodukt Information**
  - Endprodukt (input field)
  - Menge Endprodukt (number input)
- Upload sections (Stückliste & Arbeitsplan)
- **Merkmals (Product Characteristics)**
  - **Merkmal 1: Abmessung** (dimensions) + Menge
  - **Merkmal 2: Festigkeitsklasse** (strength class) + Menge
  - **Merkmal 3: Korrosionsbeständigkeit** (corrosion resistance) + Menge
- **Summary section** showing total quantities for each Merkmal

### 7. **Endkunde Page (endkunde.html)**
**Components:**
- Clean, display-only interface
- **Endprodukt** display (large, styled card)
- **Menge** display (large, styled card)
- Loads data from Siebau's saved information
- Read-only information presentation

## 🛠️ Technical Features

### Common CSS Framework (`common.css`)
- CSS variables for consistent theming
- Reusable component styles:
  - Headers and footers
  - Form inputs and labels
  - Upload areas with drag & drop styling
  - Data groups with colored backgrounds
  - Tables with column color coding
  - Action bars and buttons
  - Status messages
- Fully responsive grid systems
- Mobile-first design approach

### Common JavaScript Utilities (`common.js`)
- **ProSaData**: Data management object
  - `save(pageId, data)`: Save to localStorage
  - `load(pageId)`: Load from localStorage
  - `clear(pageId)`: Clear stored data
  
- **FileUploadHandler**: Class for file uploads
  - Drag & drop support
  - File type validation
  - Size validation (default 15MB)
  - Visual feedback for uploaded files
  - File removal functionality
  
- **FormDataManager**: Class for form handling
  - Automatic change tracking
  - Save/load functionality
  - Action bar visibility management
  - Unsaved changes warnings
  
- **Navigation Functions**:
  - `navigateToHome()`: Return to main page
  - `navigateToPage(page)`: Navigate with unsaved changes check
  - `handleLogout()`: Logout with confirmation
  
- **Status Messages**:
  - `showMessage(message, type)`: Display status notifications
  - Auto-dismiss after 5 seconds
  - Types: success, error, info, warning

### Key Features

#### 1. **Auto-Save**
- Saves form data every 30 seconds
- Prevents data loss
- Stores data in localStorage

#### 2. **Data Persistence**
- All form data saved to localStorage
- Data persists across page reloads
- Each participant page has separate storage

#### 3. **File Upload System**
- Drag & drop interface
- Click to browse files
- Visual feedback for uploaded files
- File size and type validation
- Easy file removal

#### 4. **Unsaved Changes Warning**
- Browser warning when leaving with unsaved changes
- Confirmation dialogs before navigation
- Prevents accidental data loss

#### 5. **Keyboard Shortcuts**
- **Ctrl+S** (Cmd+S on Mac): Save current form
- **Escape**: Navigate to home page

#### 6. **Action Bar**
- Fixed bottom bar with Save and Reset buttons
- Appears only when there are unsaved changes
- Sticky positioning for easy access

#### 7. **Responsive Design**
- Works on all screen sizes
- Mobile-optimized layouts
- Touch-friendly interfaces

## 🎯 Data Flow in Circular Economy

```
DHI (Raw Materials)
  ↓
DEW (Steel Production)
  ↓
Claas (Manufacturing)
  ↓
EJOT (Component Production)
  ↓
Siebau (Assembly/Products)
  ↓
Endkunde (End Customer)
```

## 💾 Data Storage

### LocalStorage Structure
```javascript
{
  "prosa_dhi": { /* DHI form data */ },
  "prosa_dew": { /* DEW form data */ },
  "prosa_claas": { /* Claas form data */ },
  "prosa_ejot": { /* EJOT form data */ },
  "prosa_siebau": { /* Siebau form data */ }
}
```

## 🔧 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## 📱 Responsive Breakpoints

- **Desktop**: > 768px (full layout)
- **Tablet**: 481px - 768px (adjusted layout)
- **Mobile**: ≤ 480px (stacked layout)

## 🚀 Future Enhancements (Suggestions)

### Backend Integration
- Connect to a real database (e.g., PostgreSQL, MongoDB)
- RESTful API for data exchange between participants
- Real-time data synchronization
- User authentication system

### Advanced Features
- **Data Validation**: Cross-check data between participants
- **Notifications**: Alert participants when upstream data changes
- **Analytics Dashboard**: Visualize material flow and quantities
- **Export Functions**: Generate PDF reports, Excel exports
- **Version History**: Track changes over time
- **Comments System**: Enable communication between participants
- **Approval Workflow**: Require approval before data propagates

### Security Enhancements
- Role-based access control (RBAC)
- Data encryption
- Audit logs
- Session management
- HTTPS enforcement

### UI/UX Improvements
- Dark mode toggle
- Multi-language support (German/English)
- Advanced search and filtering
- Batch operations
- Customizable dashboards
- Accessibility improvements (WCAG 2.1 compliance)

## 📝 Usage Instructions

### For Participants:

1. **Navigate to Main Page**: Open `index.html`
2. **Select Your Organization**: Click on your circle in the infographic
3. **Enter Data**: Fill in the required fields
4. **Upload Files**: Drag and drop or click to upload Stückliste and Arbeitsplan
5. **Save**: Click the "Speichern" button or press Ctrl+S
6. **Navigate**: Use "Home" button to return to main page

### For Developers:

1. **Open with Live Server**: Use VS Code Live Server or similar
2. **Edit Styles**: Modify `common.css` for global changes
3. **Add Features**: Use `common.js` utilities for consistency
4. **Test Responsiveness**: Use browser dev tools to test different screen sizes

## 🔐 Security Notes

⚠️ **Important**: This is a client-side only implementation using localStorage
- Data is stored locally in the browser
- No server-side validation or authentication
- Not suitable for production without backend integration
- For development/demonstration purposes

## 📞 Support

For questions or issues, please refer to the ProSa project documentation or contact the project administrator.

---

**Version**: 1.0.0  
**Last Updated**: November 2025  
**License**: All rights reserved - ProSa Circular Economy Project
