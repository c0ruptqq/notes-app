import { spawnSync } from 'child_process';


const currentTimestamp = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  })

const commitAndPush = async () => {
  try {   
        const commitMessage =`Sync: ${currentTimestamp}`
        spawnSync("git", ["add", "."], { stdio: "inherit" })
        spawnSync("git", ["commit", "-m", commitMessage], { stdio: "inherit" })
        console.log(chalk.green("Done!"))
  } catch (error) {
    console.error(error);
  }
};

// Execute the commit and push
commitAndPush();

