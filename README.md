
# Next.js Authentication Starter

This is a comprehensive starter template for building a responsive web application using Next.js 14, TypeScript, and Tailwind CSS. It includes user authentication features, leveraging JSON Web Tokens (JWT) and cookies for session management.

## Features

- **Responsive Design**: The UI is fully responsive and adaptable to various screen sizes.
- **Authentication Pages**: Includes Login, Signup, and Profile management pages.
- **JWT and Cookies**: Uses JWT for secure authentication and cookies for session persistence.

## Prerequisites

- Node.js installed on your machine.
- An instance of the FastAPI backend running locally at port 8080. The backend repository can be found here: [FastAPI Auth Starter](https://github.com/arizabruno/fastapi-auth-starter).

## Getting Started

1. **Clone the repository**
   Clone this repository to your local machine using:
   ```bash
   git clone https://github.com/arizabruno/nextjs-auth-starter.git
   ```

2. **Install dependencies**
   Navigate into the project directory and install the required dependencies:
   ```bash
   npm install
   ```

3. **Run the development server**
   Start the development server by running:
   ```bash
   npm run dev
   ```
   This will host the app at `http://localhost:3000`.

## Configuration

Ensure that your backend API is running at `http://localhost:8080` as the front end expects to communicate with this URL for API requests.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or improvements.

## License

Distributed under the MIT License. See `LICENSE` for more information.
