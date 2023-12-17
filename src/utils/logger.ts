import chalk from "chalk";

export default new class {
    info(log: string) {
        console.info(`${chalk.blueBright("[INFO]")} ${log}`);
    };

    error(log: any) {
        console.log(`${chalk.redBright("[ERROR]")} ${log}`);
    };
};