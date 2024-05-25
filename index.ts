#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"

class Student {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Person {
    students: Student[] = [];
    addStudent(obj: any) {
        this.students.push(obj);
    }
}
console.log(chalk.bold.red("WECOME TO OBJECT ORIENTED PROGRAMMING"))

let persons = new Person();

 async function start(persons:Person){


    do {
        let answer = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: "Whom would you like to interact with:",
                choices:["Staff","Student","Exit"]
            }
        ]);

        if(answer.select === "Staff"){
            console.log(chalk.yellow("You have approached the staff room. You can ask any question."));    
        } else if(answer.select === "Student"){
            let ans = await inquirer.prompt({
                name:"student",
                type:"input",
                message:"Enter the student's name you wish to engage with:"
            })
            let student = persons.students.find(val => val == ans.student)
            if(!student){
                persons.addStudent(ans.student);
                console.log(chalk.green(`Hello I am ${ans.student}. Nice to talk tos you!`));
                console.log(chalk.green("New student added"));
                console.log(chalk.green("Current student list:"));
                console.log(chalk.green(persons.students));
            } else {
                console.log(chalk.greenBright(`Hello I am ${student}. Nice to talk to  you again!`));
                console.log(chalk.greenBright("Existing student list:"));
                console.log(chalk.greenBright(persons.students));   
            }
        } else if (answer.select === "Exit"){
            console.log(chalk.bgCyan("Exiting the program..."));
            process.exit()
        }
    } while (true);
};

start(persons);