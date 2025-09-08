# Osea Spaces Hugo Website

This is a clean Hugo website, built for OSEA Spaces.

## Structure

- **Home Page**: Features full-page hero image, company info banner, and project gallery
- **About Page**: Two-column layout with company description and team information
- **Contact Page**: Contact information and form

## Adding New Projects

To add a new project to the gallery:

1. Create a new `.md` file in [`content/projects/[project-name.md]`](https://github.com/oseaspaces/oseaspaces.github.io/new/main/content/projects).
   - Notice hyphen for project name: -.
2. Use this template for the markdown file:

```markdown
---
title: "Your Project Title"
location: "City, Country"
year: "2024"
service: "Interior Design / Architecture / Furniture Fabrication"
weight: 5 (this defines the order of the projects at time of making, there were 4 projects on the website so the new one should be 5)
images:
  - "/images/projects/project_name/1.jpg" (notice underscore: _ )
  - "/images/projects/project_name/2.jpg"
  - "/images/projects/project_name/3.jpg"
  - "/images/projects/project_name/4.jpg"
---

Your project description goes here. This can include detailed information about the project, materials used, collaborations, and design process. Use [Markdown](https://www.markdownguide.org/basic-syntax/).

You can add multiple paragraphs for comprehensive project descriptions.

Add links like: In collaboration with: [Partner Name](https://instagram.com/handle)
```

3. Create a folder for project images in [`static/images/projects/[project_name]/`](https://github.com/oseaspaces/oseaspaces.github.io/new/main/static/images/projects).
   - Notice underscore for image folder: \_.
   - Notice at the top it says "Name your file...", type your new project_name with a / at the end, this will create a new folder.

## Building locally

- Open a terminal
- Clone the repo: `git clone https://github.com/oseaspaces/oseaspaces.github.io.git`
- cd into it: `cd oseaspaces.github.io`
- Development: `hugo server --buildDrafts`
- Output is in the `public/` folder
