const axios = require('axios');
const ngrok = require('ngrok');

async function main() {
  const ngrokUrl = await ngrok.connect(7777);
  const url = [
    'https://api.telegram.org',
    'bot1354228166:AAG2Oq_z9KppZ-H068YaZQ7_Hg9Jxb8q4bI',
    `setWebhook?url=${ngrokUrl}/webhook`,
  ].join('/');
  console.log({ ngrokUrl, url });
  const response = await axios({
    method: 'get',
    url,
  });
  const { data } = response;
  console.log({ data });
}

if (require.main === module) {
  main();
}
