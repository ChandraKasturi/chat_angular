# Chat Angular Application

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.2.

## Overview

This is a simple chat interface built with Angular that connects to a FastAPI backend. It's part of the "AI for Engineers Program" training curriculum. The application provides a clean, user-friendly interface for sending messages to an AI backend and displaying the responses in a chat-like format.

## Technologies Used

- Angular 17 (latest version)
- Angular CLI
- TypeScript
- RxJS

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- Angular CLI (`npm install -g @angular/cli`)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Configuration

**Important**: You need to update the API endpoint in `src/app/app.component.ts` to match your environment:

```typescript
// In app.component.ts, find this line:
this.http.post<any>('http://0.0.0.0:5002/chat-test', { userprompt: query })

// Change the URL to your FastAPI backend endpoint
```

## Features

- Clean, responsive UI with a modern design
- Real-time feedback with loading indicators
- Error handling with user-friendly messages
- Markdown text display
- Auto-scrolling to keep the latest messages in view

## Integration with FastAPI

This frontend is designed to work with the FastAPI backend that's built as part of the "AI for Engineers Program". The API endpoint expects a POST request with a JSON body containing a `userprompt` field.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Project Structure

- `src/app/` - Main application code
  - `app.component.ts` - Main component logic
  - `app.component.html` - HTML template
  - `app.component.css` - Component styles
  - `app.config.ts` - Application configuration
  - `app.routes.ts` - Routing configuration

## Contact

For any queries related to this project, please reach out to:

Sri Krishna - srikrishna@mastishka.ai

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## License

This project is part of the "AI for Engineers Program" and should be used in accordance with the program's guidelines.
