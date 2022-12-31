const fs = require('fs');
const moment = require('moment');
const simpleGit = require('simple-git');
const randomInt = require('random-int').default || require('random-int');


const git = simpleGit();

const data = JSON.parse(fs.readFileSync('data.json'));

(async () => {
  for (let date in data) {
    const count = data[date];
    for (let i = 0; i < count; i++) {
      const time = moment(date)
        .add(randomInt(0, 23), 'hours')
        .add(randomInt(0, 59), 'minutes');

      fs.writeFileSync(
        'dummy.txt',
        `${date} - Commit #${i + 1} at ${time.format()}\n`,
        { flag: 'a' }
      );

      await git.add('.');
      await git.commit(`Commit #${i + 1} on ${date}`, {
        '--date': time.toISOString(),
      });
    }
  }

  console.log("✅ Commits complete! Now push the repo to GitHub.");
})();
