# Scent of Sahara - MINURSO Memorial Website

A tribute website dedicated to the memories of all United Nations Military Observers who served in MINURSO.

## Features

- 🏠 **Home Page** - Hero section with stats and quick links
- 🗺️ **Geography** - Information about Western Sahara
- 📜 **History** - Timeline and historical information
- 👥 **People & Culture** - Local population and culture
- 🎖️ **My Duty** - Experiences as UN Observer
- 📔 **Diary** - Personal reflections and daily experiences
- 📸 **Photo Gallery** - Collection of memories
- 💭 **My Thoughts** - Murphy's Laws and G6's Laws
- 🔐 **Admin Panel** - Full content management system

## Admin Panel

Access the admin panel at: `/admin.html`

**Default Login:**
- Username: `admin`
- Password: `admin123`

**Features:**
- Edit all website content
- Upload and manage images
- Add/remove sections
- Export/Import data
- Change password

## File Structure

```
/
├── index.html              # Home page
├── admin.html             # Admin panel
├── geography.html         # Geography page
├── history.html          # History page
├── people-culture.html    # People & Culture page
├── duty.html             # Duty page
├── diary.html            # Diary page
├── gallery.html          # Photo gallery
├── thoughts.html         # Thoughts page
├── css/
│   ├── style.css         # Main website styles
│   └── admin.css         # Admin panel styles
├── js/
│   ├── main.js           # Main website JavaScript
│   ├── admin.js          # Admin panel JavaScript
│   ├── content-loader.js # Content loader
│   └── extract-content.js # Content extractor
└── images/               # Image files
    ├── geography/
    ├── history/
    ├── people-culture/
    ├── duty/
    ├── diary/
    ├── gallery/
    └── thoughts/
```

## Deployment

### GitHub Pages (Recommended)

1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in repository settings
4. Your site will be live at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

See `DEPLOYMENT.md` for detailed instructions.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage (for admin data)

## License

This project is dedicated to all UNMOs who served in MINURSO.


**Note:** This website uses client-side storage (localStorage) for admin panel data. For production use, consider implementing a backend database.
