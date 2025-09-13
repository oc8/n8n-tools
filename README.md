# n8n Tools API

A collection of utility APIs designed specifically for integration with n8n workflows. This AdonisJS-based service provides validation and processing tools that can be seamlessly integrated into your automation workflows.

## 🎯 Purpose

This API serves as a bridge between n8n and various validation/processing tools, enabling you to:
- Validate code and markup formats
- Process and transform data
- Perform quality checks on user inputs
- Integrate external validation services into your workflows

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd n8n-tools

# Install dependencies
npm install

# Start development server
npm run dev
```

The server will start on `http://localhost:3333`

## 🔧 Available Tools

### 1. Mermaid Diagram Validator

**Endpoint**: `POST /mermaid/validate`

Validates Mermaid diagram syntax and returns validation results. Perfect for ensuring diagram code is valid before rendering or processing.

#### Request Format
```json
{
  "code": "graph TD\n    A[Start] --> B[Process]\n    B --> C[End]"
}
```

#### Response Format
**Success (Valid Code)**:
```json
{
  "valid": true,
  "message": "Mermaid code is valid"
}
```

**Error (Invalid Code)**:
```json
{
  "valid": false,
  "error": "No diagram type detected matching given configuration for text: invalid code"
}
```

**Error (Missing Code)**:
```json
{
  "valid": false,
  "error": "Missing mermaid code in request body"
}
```

## 🔗 n8n Integration

### Using the Mermaid Validator in n8n

1. **Add HTTP Request Node**
   - Method: POST
   - URL: `http://your-server:3333/mermaid/validate`
   - Headers: `Content-Type: application/json`

2. **Configure Request Body**
   ```json
   {
     "code": "{{ $json.mermaidCode }}"
   }
   ```

3. **Process Response**
   Use the response to conditionally proceed in your workflow:
   - Check `{{ $json.valid }}` to determine if validation passed
   - Access error details via `{{ $json.error }}` for debugging

### Example n8n Workflow

```
[Webhook] → [Set Variables] → [HTTP Request (Validate)] → [IF Valid] → [Process Diagram]
                                                        → [IF Invalid] → [Send Error Email]
```

### Common Use Cases

- **Documentation Workflows**: Validate diagrams before committing to repositories
- **Content Management**: Ensure user-submitted diagrams are valid before publication
- **Quality Assurance**: Batch validate multiple diagrams in documentation systems
- **API Validation**: Check diagram syntax in content APIs before processing

## 🛠 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format

# Type checking
npm run typecheck
```

### Project Structure

```
├── app/
│   ├── controllers/         # API controllers
│   │   └── mermaid_controller.ts
│   ├── middleware/          # Custom middleware
│   └── exceptions/          # Exception handlers
├── config/                  # Configuration files
├── start/
│   └── routes.ts           # Route definitions
├── tests/                  # Test files
└── package.json
```

## 📝 API Documentation

### Base URL
- Development: `http://localhost:3333`
- Production: `https://your-domain.com`

### Authentication
Currently, no authentication is required. Consider adding API keys or JWT tokens for production use.

### Rate Limiting
No rate limiting is currently implemented. Consider adding rate limiting for production deployments.

## 🚀 Deployment

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Navigate to build directory and install production dependencies**
   ```bash
   cd build
   npm ci --omit="dev"
   ```

3. **Start the production server**
   ```bash
   node bin/server.js
   ```

4. **Environment Variables**
   Create a `.env` file in the build directory with your production settings:
   ```env
   NODE_ENV=production
   PORT=3333
   HOST=0.0.0.0
   ```

**Note**: The build process compiles TypeScript to JavaScript and creates a production-ready bundle in the `build` directory.

### Docker Deployment

For containerized deployment, use the provided Dockerfile:

1. **Build the Docker image**
   ```bash
   docker build -t n8n-tools .
   ```

2. **Run the container**
   ```bash
   docker run -p 3333:3333 n8n-tools
   ```

3. **With environment variables**
   ```bash
   docker run -p 3333:3333 -e NODE_ENV=production -e PORT=3333 n8n-tools
   ```

4. **Using Docker Compose (optional)**
   Create a `docker-compose.yml`:
   ```yaml
   version: '3.8'
   services:
     n8n-tools:
       build: .
       ports:
         - "3333:3333"
       environment:
         - NODE_ENV=production
         - PORT=3333
         - HOST=0.0.0.0
       restart: unless-stopped
   ```

   Then run:
   ```bash
   docker-compose up -d
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-tool`)
3. Commit your changes (`git commit -am 'Add new validation tool'`)
4. Push to the branch (`git push origin feature/new-tool`)
5. Create a Pull Request

## 📄 License

This project is licensed under the UNLICENSED license.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the API responses for error details
2. Verify your request format matches the documentation
3. Ensure the server is running and accessible
4. Review the server logs for additional debugging information

## 🔮 Future Tools

Planned additions to the tool collection:
- JSON Schema Validator
- Markdown Syntax Checker
- YAML/XML Validators
- Code Quality Analyzers
- Image Processing Tools

---

*Built with ❤️ for the n8n community*