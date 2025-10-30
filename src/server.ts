/**
 * Este es el archivo server.ts compatible con Netlify.
 * Reemplaza el contenido de tu `src/server.ts` con esto.
 */
import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';

const angularAppEngine = new AngularAppEngine();

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext();

  // Aquí se pueden definir endpoints de API de ejemplo.
  // Descomenta y define los endpoints según sea necesario.
  // const pathname = new URL(request.url).pathname;
  // if (pathname === '/api/hello') {
  //   return Response.json({ message: 'Hello from the API' });
  // }

    const result = await angularAppEngine.handle(request, context);
    return result || new Response('Not found', { status: 404 });
    }

    /**
     * El manejador de peticiones (request handler) usado por el CLI de Angular (servidor de desarrollo y durante el build).
     */
    export const reqHandler = createRequestHandler(netlifyAppEngineHandler);