# ZenBoard 🚀

ZenBoard is a high-performance, real-time Kanban board application designed to streamline project management and task organization. Inspired by Trello, it provides a fluid and intuitive interface for managing workflows with ease.

## ✨ Features

- **Real-time Updates**: Instant synchronization across all clients powered by [PocketBase](https://pocketbase.io/).
- **Smooth Interactions**: High-quality animations and drag-and-drop functionality using GSAP.
- **Responsive Design**: A seamless experience from desktop to mobile using Tailwind CSS.
- **Modern Stack**: Built with Next.js App Router for optimal performance and SEO.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Backend/Database**: [PocketBase](https://pocketbase.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [pnpm](https://pnpm.io/installation)
- A running instance of [PocketBase](https://pocketbase.io/)

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:Paul-Carouge/ZenBoard.git
   cd ZenBoard
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up your environment variables:
   Create a `.env.local` file in the root directory and add your PocketBase URL:
   ```env
   NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧪 Testing & Linting

To ensure code quality, run the following commands:

```bash
# Run linting
pnpm lint

# Run tests (if configured)
pnpm test
```

## 📄 License

This project is licensed under the MIT License.
