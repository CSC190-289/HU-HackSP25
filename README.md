# Journey
Journey is a mobile journaling application that allows users to write daily journal entries, where an AI model conducts sentiment analysis to keep a daily record of the user’s feelings. Journey’s motivation is to enhance the journaling experience by serving as an emotional outlet, and allowing users to track their emotional stress on a daily basis. By providing a compartmentalized record of their emotions, users can keep track of their emotional patterns, and can access the content of particular journal entries to reflect and realize possible triggers for negative emotions. 

## Features

- Record Little moments of your day through small journal entries
- Real time date and time of your previous entries
- Mobile and web-friendly interface 
- 

## Getting Started
To run Journey locally, follow these steps:

### Prerequisites

- Node.js installed (recommended version: 22.x or later)
- Corepack enabled (run `corepack enable`)
  - On Windows, you may have to run your terminal as administrator in order to enable corepack. 
- Yarn installed globally (run `npm install -g yarn` if not installed)

### Installation

1. Clone the repository:
   ```bash
    git@github.com:CSC190-289/Journey.git
   ```
2. Navigate to the project directory:
    ```bash
    cd pulsecheck
    ```
3. Install dependencies
    ```bash
    yarn install
    ```

## Development Scripts

The following scripts are available in the `package.json` file:

- `yarn dev`: Starts the app for development.
- `yarn test`: Runs test scripts using [Vitest](https://vitest.dev/)
- `yarn build`: Builds the app for production.
- `yarn lint`: Checks source code quality using ESLint.
- `yarn format`: Formats source code using Prettier.
- `yarn format:check`: Lists source files that do not follow the project's configured format rules.
- `yarn preview`: Previews the project's production build.