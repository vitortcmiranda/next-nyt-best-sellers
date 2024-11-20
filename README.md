# NYT Bestsellers Books SPA

## Overview
This project is a Single Page Application (SPA) built with Next.js that displays the current New York Times Bestsellers books. The application fetches data from the NYT API and presents it in an attractive and interactive layout. Each book's details, including the title, author, cover image, and a brief description, are displayed along with links to purchase the book on Amazon.

## Features
- *Latest NYT Bestsellers:* Displays the latest New York Times bestsellers across different categories.
- *Interactive Layout:* A clean and responsive design that works seamlessly on both desktop and mobile devices.
- *Detailed Views:* Each book entry includes its title, author, cover image, description, and a "Buy on Amazon" button.
- *Top 3 Highlight:* The top 3 books in each category receive special treatment with medal icons (gold, silver, bronze) for added emphasis.
- *Caching:* Implements caching using Redis to minimize API calls and improve performance.
- *API Integration:* Fetches data from the New York Times API.

## Technology Stack
- *Framework:* Next.js (React)
- *Styling:* Tailwind CSS for styling and responsive design
- *State Management:* React hooks
- *API Integration:* Axios for making API requests
- *Caching:* Redis for caching API responses

## Getting Started
To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Redis server

### Installation
1. Clone the repository:
    ```
    git clone https://github.com/vitortcmiranda/nyt-bestsellers-spa.git
    cd nyt-bestsellers-spa
    ```
2. Install NPM packages:
    
 ```
    npm install
    
    or if you prefer using Yarn:
    
 ```
    yarn install
    
3. Create a .env.local file in the root directory and add your NYT API key and base URL:
    
env
    NEXT_PUBLIC_API_KEY=your_nyt_api_key
    NEXT_PUBLIC_API_URL=https://api.nytimes.com/svc/books/v3
    
4. Start the Redis server. You can use Docker for this:
    
 ```
    docker run -d -p 6379:6379 redis
 ```
    
### Running the Application
To run the application in development mode:
```
    npm run dev
```
or
```
    yarn dev
```
Open http://localhost:3000 with your browser to see the result.


## File Structure

```
├──/src
│   ├──/app
│   │   ├──/aggregates
│   │   │   ├──/nytimes-api
│   │   │   │   ├──nytimes-api.ts
│   │   │   │   ├──nytimes-api-response.ts
│   │   │   ├──/redis-api/
│   │   │       ├──/redis-api.ts
│   │   ├──/components
│   │   │   ├──/Title.tsx
│   │   │   ├──/Books.tsx
├── .env.local
├── package.json
├── README.md
└── tsconfig.json
```

## Acknowledgements
- New York Times Books API for providing the data.
- Next.js for the framework.
- Tailwind CSS for styling.
