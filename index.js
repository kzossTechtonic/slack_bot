const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot ({
    token: 'xoxb-592521732928-606039409431-0X5nS9Szp8t2lB7HxCcrDuHh',
    name: 'jokebot'
});

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    }

    bot.postMessageToChannel(
        'bot_testing', 
        'Get Ready To Laugh With @Jokebot!', 
        params
    );
});

// Error Handle
bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }

    handleMessage(data.text);
});

// Respond to Data
function handleMessage(message) {
    if(message.includes(' chucknorris')) {
        chuckJoke();
    }
}

// Tell a Chuck Norris Joke
function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random')
    .then(res => {
        const joke = res.data.value.joke;

        const params = {
            icon_emoji: ':laughing:'
        }
    
        bot.postMessageToChannel(
            'bot_testing', 
            `Chuck Norris: ${joke}`, 
            params
        );

    })
}