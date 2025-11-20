# ProSa Circular Economy - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Open the Project
Simply open `index.html` in your web browser. That's it!

**Recommended**: Use a local web server for best results
- **VS Code**: Install "Live Server" extension and click "Go Live"
- **Python**: Run `python -m http.server 8000` in the project folder
- **Node.js**: Run `npx serve` in the project folder

### 2. Explore the Main Page
- See the circular infographic with all 6 participants
- Hover over the colored circles to see connections light up
- Notice the rotating animated rings

### 3. Navigate to Participant Pages
Click on any participant circle:
- **DHI** (top) - Scrap material management with table
- **DEW** (top-right) - Steel production data
- **Claas** (bottom-right) - Manufacturing specifications
- **EJOT** (bottom) - Component production
- **Siebau** (bottom-left) - Product assembly with Merkmals
- **Endkunde** (top-left) - End customer view

### 4. Test the Features

#### On Any Participant Page:
1. **Enter some data** in the form fields
2. **Upload a file** by dragging & dropping or clicking the upload button
3. Watch the **action bar appear** at the bottom
4. Click **"Speichern"** to save your data
5. **Refresh the page** - your data is still there!
6. Click **"Home"** to return to the main page

#### Try DHI's Special Feature:
1. Go to DHI page
2. Enter numbers in "Bedarfsmenge" and "Verfügbare Menge"
3. Watch "Fehlmenge" calculate automatically!

#### Try Siebau → Endkunde Flow:
1. Go to Siebau page
2. Enter an "Endprodukt" name and "Menge Endprodukt"
3. Click "Speichern"
4. Go to Endkunde page
5. See your data displayed automatically!

### 5. Test Keyboard Shortcuts
- **Ctrl+S** (or Cmd+S): Save current form
- **Escape**: Return to home page

## 📱 Test on Mobile
Open the same page on your phone - it's fully responsive!

## 🎨 Customize (Optional)

### Change Colors
Edit `common.css` and modify the CSS variables at the top:
```css
:root {
    --color-primary: #56ab91;  /* Change this */
    --color-primary-medium: #2d8659;  /* And this */
}
```

### Add New Fields
1. Open any participant HTML file (e.g., `dew.html`)
2. Copy an existing form group
3. Change the `id` and `name` attributes
4. Save and reload!

## 🔍 Troubleshooting

### Data not saving?
- Check browser console for errors
- Make sure localStorage is enabled in your browser
- Try clearing browser cache

### Upload not working?
- Check file size (max 15MB by default)
- Check file type (PDF, Excel, Word files supported)

### Styling looks broken?
- Make sure `common.css` is in the same folder
- Clear browser cache
- Check browser console for 404 errors

## 💡 Tips

1. **Auto-save is enabled**: Your data saves every 30 seconds automatically
2. **Unsaved changes warning**: If you try to leave with unsaved changes, you'll get a warning
3. **Reset button**: Click "Zurücksetzen" to reload the page and discard changes
4. **File preview**: After uploading, you'll see the filename and size
5. **Mobile friendly**: All pages work perfectly on phones and tablets

## 🎯 Next Steps

Check out `DOCUMENTATION.md` for:
- Complete feature list
- Technical details
- Future enhancement ideas
- API integration suggestions

## ⚡ Pro Tips

- Use Chrome DevTools (F12) to inspect the circular economy data flow
- Check localStorage to see how data is stored
- Modify `common.js` to add custom validation rules
- Add new participant pages by copying and modifying existing ones

---

**Enjoy using ProSa Circular Economy System! 🌱♻️**
