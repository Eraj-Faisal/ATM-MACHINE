#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue("\n \tATM MACHINE\n"));
let myBalance = 10000; //Dollars
let myPin = 1245;
let pinAnswer = await inquirer.prompt({
    name: "pin",
    message: chalk.yellow("Enter Your Pin Code: "),
    type: "number"
});
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nCorrect Pin Code, Login Successfully !!!\n"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: chalk.yellow("Please Select Options"),
            type: "list",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.yellow("Select a Withdrawal Method: "),
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastcashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: chalk.yellow("Select Amount"),
                    choices: [1000, 2000, 5000, 10000, 20000]
                }
            ]);
            if (fastcashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastcashAns.fastCash;
                console.log(`${fastcashAns.fastCash} Withdraw Successfully`);
                console.log(`Your Remaining Balance is ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "Enter your Amount",
                    type: "number"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insuficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Amount Withdraw Successfully!`);
                console.log(`Your Remaining Amount is ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log("Your Remaining Balance is : " + myBalance);
    }
}
else {
    console.log(chalk.red("Incorrect Pin Number"));
}
