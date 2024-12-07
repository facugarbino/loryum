# Loryum
<img width="1153" alt="image" src="https://github.com/user-attachments/assets/5083dbbf-5232-40f7-9bea-d3dd43e38b26">


## Demo

You can try out Loryum here: [https://loryum.garbino.com.ar](https://loryum.garbino.com.ar)

## Overview

Loryum is a modern social application for posting text and images, with features including GitHub OAuth-based authentication and the ability to comment on other users' posts. The app provides a seamless experience for content creation and interaction, utilizing cutting-edge technologies for its frontend and backend.

## Features

Loryum offers a range of features to provide a seamless and engaging experience for its users:

1. **Authentication**:
   - Log in using **GitHub OAuth**, with your GitHub name, username, and avatar automatically used for your profile in the app.

2. **Index Page**:
   - View all user posts on the index page without needing to log in.
   - Click on a user’s profile to see only their posts on a dedicated profile page.
   - Access the comments section by pressing the icon below each post.

3. **Posting and Commenting**:
   - Logged-in users can create new posts and comment on other users' posts.
   - Each post supports up to **4 images**, with a maximum size of **1 MB per image**.

4. **Responsive Design**:
   - The app is fully responsive and optimized for use on both PCs and mobile devices.

5. **Theme Switching**:
   - Easily toggle between **dark theme** and **light theme** for a personalized viewing experience.

## Architecture

The application leverages a **server-side rendering (SSR)** architecture with components designed to interact directly with the backend and database. Key aspects of the architecture include:

- **Frontend**: Built with **Next.js** and TypeScript, ensuring a fast and efficient user experience with server-rendered and dynamic client-side components.
- **Backend**: Manages communication with the database using **Supabase**, a robust backend-as-a-service platform powered by PostgreSQL.
- **Database**: Supabase acts as both the database and authentication service, simplifying backend operations while ensuring strong security practices.
  - Supabase also integrates GitHub OAuth out-of-the-box for a streamlined authentication flow.

## Approach and Methodology

1. **Development Process**:
   - The project was developed solo, following an incremental approach with small, meaningful Git commits to ensure progress was manageable and traceable.
   - Development started with implementing the GitHub OAuth process, followed by building the UI with mocked data to refine user interactions before connecting it to the backend.

2. **User Experience**:
   - Prioritized a seamless and intuitive user interface to provide a pleasant experience, ensuring ease of navigation and efficient workflows.
   - Implemented real-time feedback using **toasts** to inform users of successful actions (e.g., post creation) or errors, enhancing interactivity and clarity.

3. **Performance Optimization**:
   - Leveraged **server-side rendering (SSR)** to improve performance and user experience.
   - Fetched the first page of posts on the backend during the initial load, eliminating the need for loading spinners and ensuring that users see content immediately upon visiting the page.

4. **Data Integration**:
   - Focused on connecting the frontend to the Supabase backend after finalizing the UI. This ensured smoother transitions between mocked and live data without disrupting the core design.

5. **Testing and Validation**:
   - End-to-end testing was conducted using Cypress, validating critical user flows such as authentication, post creation, and data accuracy.
   - Testing ensured stability and consistency, especially in scenarios involving real-time interactions with the backend.

## Running the Application Locally

Follow these steps to set up and run Loryum on your local machine:

### Prerequisites
1. Install [Node.js](https://nodejs.org/).
2. Install the Supabase CLI by following [Supabase CLI Installation Guide](https://supabase.com/docs/guides/cli).

### Setup

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:facugarbino/loryum.git
   cd loryum
   ```

2. **Initialize Supabase**:
   Run the following commands to set up the Supabase environment:
   ```bash
   supabase init
   supabase start
   ```
   This will configure the local Supabase instance and run necessary database migrations.

3. **Environment Variables**:
   - Copy the provided `.env.example` file to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Replace placeholder values in `.env.local` with your own settings.
   - Create a GitHub OAuth application [here](https://github.com/settings/developers) and add the client ID and secret to the `.env.local` file.

4. **Install Dependencies**:
   ```bash
   npm install
   ```

5. **Run the Application**:
   Start the development server:
   ```bash
   npm run dev
   ```

6. **Access the Application**:
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Tests

### Running Tests
Loryum uses Cypress for end-to-end (E2E) testing. These tests ensure the application behaves as expected in real-world user scenarios. To run the Cypress tests:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Prepare the Cypress environment:
   - Copy the `cypress.env.json.example` file to a new file named `cypress.env.json`:
     ```bash
     cp cypress.env.json.example cypress.env.json
     ```
   - Add your GitHub credentials (GitHub username and password) to the `cypress.env.json` file.

3. Open the Cypress test runner:
   ```bash
   npx cypress open
   ```

4. Select the desired test in the Cypress UI to run it.

Alternatively, run all tests in headless mode:
```bash
npx cypress run
```

### Test Coverage
The test suite currently includes:

- End-to-end tests for the GitHub OAuth login process.
- Post creation flow, ensuring:
  - Posts are successfully created.
  - Posts appear in the feed with the correct content, and user information.
  

## Security

Loryum ensures secure user interactions with **Supabase Auth**, which provides:

- Secure GitHub OAuth for user authentication.
- Role-based access control and row-level security for database operations.

## License

Loryum is licensed under the [MIT License](LICENSE.txt).
