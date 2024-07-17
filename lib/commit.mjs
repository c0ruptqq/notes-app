import { spawnSync } from 'child_process';
import chalk from "chalk"

const currentTimestamp = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  })

export const commitAndPush = async () => {
  try {   
        const commitMessage =`Sync: ${currentTimestamp}`
        spawnSync("git", ["add", "."], { stdio: "inherit" })
        spawnSync("git", ["commit", "-m", commitMessage], { stdio: "inherit" })
        spawnSync("git", ["push", "-uf"], {
          stdio: "inherit",
        })
        console.log(chalk.green("Done!"))
  } catch (error) {
    console.error(error);
  }
};

// Execute the commit and push


