import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Public } from './auth/public.decorator';

@Controller()
export class SwaggerController {
    @Public()
    @Get('swagger.yaml')
    getSpec(@Res() res: Response) {
        console.log('Fetching swagger.yaml...');
        const path = join(process.cwd(), 'openapi.yaml');
        console.log('Path to openapi.yaml:', path);
        const file = readFileSync(path, 'utf8');
        res.header('Content-Type', 'text/yaml');
        res.send(file);
    }

    @Public()
    @Get('docs')
    getDocs(@Res() res: Response) {
        console.log('Fetching /docs...');
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>API Documentation</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" >
    <style>
        html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
        *, *:before, *:after { box-sizing: inherit; }
        body { margin:0; background: #fafafa; }
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"> </script>
    <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js"> </script>
    <script>
    window.onload = function() {
        const ui = SwaggerUIBundle({
            url: "/swagger.yaml",
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
            ],
            plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout"
        })
        window.ui = ui
    }
    </script>
</body>
</html>`;
        res.send(html);
    }
}
