## 🚀 Getting Started

#### ⚙️ Prepare the environment

1. Make sure you have [Node.js](https://nodejs.org/) installed, preferably with [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/). Ensure that your Node.js version is **20.0.0 or higher**.

2. Clone this repository.

3. Move to ` .env.development` file. You have two options:

- Option 1: I have deployed the backend, so you can still use it without changing this file.

```bash
   NEXT_PUBLIC_API_ENDPOINT="https://dashboard-server-c814.onrender.com/api"

```

Sometime my backend is not available, so you need to install it manually with option 2

- Option 2 (Run local) :
  Clone and run this back-end: [https://github.com/le-dat/dashboard-server](https://github.com/le-dat/dashboard-server) for this project and update ` .env.development` file

```bash
    NEXT_PUBLIC_API_ENDPOINT="http://localhost:4000/api"

```

4. Install the dependencies

```bash
   yarn install   |   npm install
```

#### 🏁 Run app in your browser

Run the following command at the root path of the project

```bash
   yarn start:${env}  |  npm run start:${env}
```

- **dev**: Development environment used during application development and testing.

## 🔑 Key Features

- Dat Dashboard

  - Authentication: Sign-up, login, and logout functionality. Only authenticated users should be able to view access dashboard.
  - CRUD user managerment
  - Responsive for Mobile and PC

## 🛠️ Tech Stack

#### 💻 Languages

- HTML
- CSS
- TypeScript

#### 📚 Frameworks/Libraries

- **Next.js:** Used for building user interfaces with a component-based architecture.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom user interfaces.

## 📁 Structure

```plaintext
DAT-DASHBOARD/
│
├── .__tests__/
├── .env/
├── .husky/
├── .vscode/
├── public/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── provider/
│   ├── service/
│   └── store/
│   └── styles/
│   ├── types/
│   ├── utils/
├──
```

## 📝 Version

0.1.0

## Author

Le Quoc Dat. See the [Website Portfolio](https://ledat-portfolio.vercel.app/) for details.
