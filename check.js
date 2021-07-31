const axios = require("axios");
const { gitlogPromise } = require("gitlog");

const options = {
  repo: __dirname + "/",
  fields: ["hash", "abbrevHash", "subject", "authorName", "authorDateRel"],
};

async function checkBlockchain() {
  try {
    let remoteCommits = await axios.get(
      "https://api.github.com/repos/akshay8033/AuthPoliceV2/commits"
    );

    const localCommits = await gitlogPromise(options);

    for (let i = 0; i < remoteCommits.data.length - 1; i++) {
      if (remoteCommits.data[i].commit.message != localCommits[i].subject) {
        throw Error("Hash mismatch");
      }
    }

    console.log("All good. Ready to add the transaction!");
  } catch (err) {
    console.log("Blockchain is tampered");
    console.log(err);
  }
}

checkBlockchain();
