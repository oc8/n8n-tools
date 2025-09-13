import type { HttpContext } from '@adonisjs/core/http'
import mermaid from 'mermaid'

export default class MermaidController {
  public async validate({ request, response }: HttpContext) {
    try {
      const { code } = request.only(['code'])

      if (!code) {
        return response.status(400).json({
          valid: false,
          error: 'Missing mermaid code in request body'
        })
      }

      // Initialize mermaid in a safe way for validation
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'strict'
      })

      // Parse and validate the mermaid code
      const parseResult = await mermaid.parse(code)

      if (parseResult) {
        return response.json({
          valid: true,
          message: 'Mermaid code is valid'
        })
      } else {
        return response.status(400).json({
          valid: false,
          error: 'Invalid mermaid syntax'
        })
      }
    } catch (error) {
      return response.status(400).json({
        valid: false,
        error: error.message || 'Invalid mermaid syntax'
      })
    }
  }
}