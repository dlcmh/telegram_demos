import { Application, Request, Response } from 'express';
import { handler as Webhook } from './bot/webhook';

export function routes(app: Application): void {
  app.get('/', (_req: Request, res: Response) => res.send('Hello there!'));

  app.post('/webhook', Webhook);
}
