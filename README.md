# Olivier Kouassi Portfolio

Personal portfolio built with Next.js 15, React, TypeScript, and Tailwind CSS.

It includes:
- A localized public portfolio (`en` and `fr`)
- A projects showcase fed by Back4App
- An admin area to create, edit, and delete projects
- Image uploads through Cloudinary
- Light/dark theme support

## Tech Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- `next-international` for i18n
- Parse SDK + Back4App for data/auth
- Cloudinary for image hosting

## Features

- Landing page with hero, about, projects, and contact sections
- Locale-based routing with English and French content
- Admin login page backed by Parse
- Project management UI for CRUD operations
- Server routes for project data and image uploads

## Project Structure

```text
app/
  [locale]/        Localized pages and layouts
  api/             API routes for projects and uploads
components/        Portfolio sections, admin UI, shared UI components
lib/               Parse setup and shared utilities
locales/           Translation dictionaries
public/            Static assets and images
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env`

Add the following variables:

```env
# Back4App REST API
B4A_APP_ID=
B4A_REST_KEY=
B4A_SERVER_URL=https://parseapi.back4app.com


For admin side to update add projects
you'll need Parse to identify with Back4app and Cloudinary to store your project Thumbnail

# Parse client SDK
NEXT_PUBLIC_PARSE_APP_ID=
NEXT_PUBLIC_PARSE_JS_KEY=
NEXT_PUBLIC_PARSE_SERVER_URL=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_UPLOAD_PRESET=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Routes

- `/en` or `/fr`: public portfolio
- `/en/login` or `/fr/login`: admin login
- `/en/admin` or `/fr/admin`: admin dashboard
- `/api/projects`: list and create projects
- `/api/projects/[id]`: update and delete a project
- `/api/upload`: upload a project image to Cloudinary

## Data Model

Projects are expected to use fields similar to:

```ts
type Project = {
  objectId?: string
  title: string
  description: string
  techStack: string[]
  github: string
  demo?: string
  video?: string
  imageUrl: string
}
```

## Notes

- Middleware redirects users into localized routes with `en` as the default locale.
- The admin UI currently manages projects only.
- Project images fall back to `/placeholder.svg` when no image is provided.
