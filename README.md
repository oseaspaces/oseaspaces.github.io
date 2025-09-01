# Osea Spaces Hugo Website

This is a clean Hugo website converted from the original Webflow site, with no external dependencies or Webflow code.

## Structure

- **Home Page**: Features full-page hero image, company info banner, and project gallery
- **About Page**: Two-column layout with company description and team information
- **Contact Page**: Contact information and form
- **Projects**: Dynamic project gallery using markdown files

## Adding New Projects

To add a new project to the gallery:

1. Create a new `.md` file in `content/projects/`
2. Add project images to `static/images/projects/`
3. Use this template for the markdown file:

```markdown
---
title: "Your Project Title"
location: "City, Country"
year: "2024"
service: "Interior Design / Architecture"
weight: 1
images:
  - "/images/projects/image1.jpg"
  - "/images/projects/image2.jpg"
  - "/images/projects/image3.jpg"
---

Your project description goes here.

Additional paragraphs can be added for more detailed descriptions.
```

## Building and Serving

- Development: `hugo server --buildDrafts`
- Production build: `hugo --minify`
- Output is in the `public/` folder

## Features

- ✅ Clean, responsive design matching original
- ✅ Image sliders for project galleries  
- ✅ No Webflow dependencies
- ✅ Easy content management via markdown
- ✅ Contact form (works with Netlify)
- ✅ SEO optimized
- ✅ Fast loading

## Deployment

The site is ready for deployment on GitHub Pages, Netlify, Vercel, or any static hosting service.