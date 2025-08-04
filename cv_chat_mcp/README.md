# CV Chat MCP

## Project Overview
The CV Chat MCP project is an Express-based application that facilitates chat interactions, specifically designed to handle resume-related queries. It allows users to upload their resumes and receive tailored responses based on the content of the uploaded files.

## File Structure
```
cv_chat_mcp
├── src
│   ├── router
│   │   └── chat.ts          # Defines chat-related routes and handles file uploads
│   └── conroller
│       └── chat.ts          # Contains logic for processing chat requests
├── uploads                   # Directory for storing uploaded files
├── package.json              # npm configuration file with dependencies and scripts
├── tsconfig.json             # TypeScript configuration file
├── .gitignore                # Specifies files and directories to be ignored by Git
└── README.md                 # Documentation for the project
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd cv_chat_mcp
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the server:
   ```
   npm start
   ```
2. Access the chat interface by navigating to `http://localhost:3000/chat` in your web browser.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.