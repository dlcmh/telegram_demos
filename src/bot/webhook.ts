import { onDone } from './handle-replies/on-done';
import { onEnd } from './handle-replies/on-end';
import { onStart } from './on-start';
import { Handler } from './types';

export const handler: Handler = async (req, res) => {
  res.sendStatus(200);

  const { body } = req;
  console.log('received at webhook', { body: JSON.stringify(body) });

  const { message } = body;
  if (message) {
    const {
      chat: { first_name, last_name, id: chat_id },
      entities,
      text,
    } = message;
    const { type } = entities[0];
    if (type === 'bot_command' && text === '/start') {
      console.log({ first_name, last_name, text });

      onStart(chat_id);
      return;
    }
  }

  const { callback_query } = body;
  if (callback_query) {
    const {
      from: { first_name, last_name },
      message: {
        chat: { id: chat_id },
        message_id,
      },
      data,
    } = callback_query;

    if (data) {
      const { action, total, target } = JSON.parse(data);

      console.log({ first_name, last_name, action, total, target });

      switch (action) {
        case 'done': {
          await onDone(chat_id, message_id, total, target);
          break;
        }
        case 'end': {
          onEnd(chat_id, message_id, total);
          break;
        }
        default:
          break;
      }
    }
  }
};
