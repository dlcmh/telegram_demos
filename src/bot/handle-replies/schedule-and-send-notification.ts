import env from '../../env';
import { EDIT_MESSAGE_REPLY_MARKUP_URL, SEND_MESSAGE_URL } from '../constants';
import { axiosSend } from './utils/axios-send';
import { pluralizedPushups } from './utils/pluralized-pushups';

export const timers = {};

export function scheduleAndSendNotification(
  chat_id: number,
  message_id: number,
  total: number,
  target: number
): void {
  timers[chat_id] = setTimeout(
    send,
    parseInt(env.MICROSECONDS_LATER), // execute `send` function N microseconds later
    chat_id,
    message_id,
    total,
    target
  );
}

// this function will execute N microseconds later
async function send(
  chat_id: number,
  message_id: number,
  total: number,
  target: number
): Promise<void> {
  // (A) clears buttons from the previous "...wait for the notification" message
  //   - https://stackoverflow.com/a/47867344
  axiosSend({
    data: {
      chat_id,
      message_id,
    },
    method: 'post',
    url: EDIT_MESSAGE_REPLY_MARKUP_URL,
  });

  const newTarget = target + 1;
  const newTotal = total + target;

  // (B) notifies by:
  //   - sending message "Do X pushups now!"
  //   - displaying callback buttons:
  //   - `done` - the pushup repetitions were done
  //   - `end` - user decides not to do the suggested repetitions
  console.log('sending notification', { chat_id });
  axiosSend({
    data: {
      chat_id,
      text: [
        `Do ${newTarget}`,
        `${pluralizedPushups(newTarget)} now!`,
        `(You have already crushed ${newTotal}!)`,
      ].join(' '),
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Crushed it!',
              callback_data: JSON.stringify({
                action: 'done',
                total: newTotal,
                target: newTarget,
              }),
            },
          ],
          [
            {
              text: 'No more!',
              callback_data: JSON.stringify({
                action: 'end',
                total: newTotal,
                target: newTarget,
              }),
            },
          ],
        ],
      },
    },
    method: 'post',
    url: SEND_MESSAGE_URL,
  });
}
