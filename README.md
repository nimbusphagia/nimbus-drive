# Nimbus Drive

A Google Drive-inspired file manager built with Node.js and Express. Users can organize files and folders, upload content to the cloud, and share files via public links.

🔗 **Live demo:** [nimbusdrive-eight.vercel.app](https://nimbusdrive-eight.vercel.app)

---

## Features

- **Authentication** — Local sign-up and login using Passport.js with persistent sessions
- **File management** — Upload, download, and delete files; create and delete folders
- **Cloud storage** — Files are stored on Cloudinary; only metadata is kept in the database
- **Folder nesting** — Organize files into nested folder structures
- **Public sharing** — Generate shareable public links for individual files
- **Server-side rendering** — UI rendered with Pug templates via Express

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Auth | Passport.js (Local Strategy) |
| ORM | Prisma |
| Database | PostgreSQL |
| File storage | Cloudinary |
| Views | Pug |

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Cloudinary account

### Installation

```bash
git clone https://github.com/nimbusphagia/nimbus-drive.git
cd nimbus-drive
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/nimbus_drive"

SESSION_SECRET="your-session-secret"

CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Database Setup

```bash
npx prisma migrate dev
```

### Run

```bash
npm start
```

The app will be available at `http://localhost:3000`.

---

## Project Structure

```
nimbus-drive/
├── config/         # Passport and Cloudinary configuration
├── db/             # Database queries
├── prisma/         # Schema and migrations
├── public/         # Static assets (CSS, JS)
├── src/            # Routes and controllers
├── views/          # Pug templates
└── app.js          # Entry point
```
