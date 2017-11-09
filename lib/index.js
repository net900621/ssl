#!/usr/bin/env node

'use strict';

const fs = require('fs');
const exec = require('child_process').exec;
// const repl = require("repl");
const inquirer = require('inquirer');
const args = process.argv;

// var readline = require('readline');

//创建readline接口实例
// var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//     prompt: 'ssl> '
// });

// console.log('请选择您所需要的功能');

// repl.start({
//     prompt: 'Node.js 使用 stdin> ',
//     input: process.stdin,
//     output: process.stdout
// });
// console.log('\n');

// const input = args[2] || '';

var init = function() {
    inquirer.prompt([{
        type: 'list',
        name: 'input',
        message: '选择你所需要的功能',
        choices: [
            'init',
            'list',
            'add'
        ]
    }]).then(function(act) {
        switch (act.input) {
            case 'init':
                exec(('ssh-keygen -t rsa -C "' + (args[2] || 'net900621@163.com') + '"'), (err, stdin, stdout) => {
                    console.log(123);
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('成功');
                    }
                    init();
                });
                break;
            case 'list':
                fs.readFile('/Users/yaoyao/.ssh/id_rsa.pub', (err, data) => {
                    let arr = data.toString().split('ssh-rsa ');
                    arr.splice(0, 1);
                    console.log('list is :\n');
                    arr.forEach((v, i) => {
                        console.log('ssh-rsa ' + v);
                    });
                    init();
                });
                break;
            case 'add':

                inquirer.prompt([{
                    type: 'input',
                    name: 'key',
                    message: 'enter your pub key'
                }, ]).then((input) => {
                    let key = input.key + '\n';
                    fs.open('/Users/yaoyao/.ssh/id_rsa.pub', 'a', function(err, fd) {

                        if (!err) {
                            
                            fs.write(fd, key, function(err) {
                                if (!err) {
                                    init();
                                }
                            });

                        }

                    });
                })
        }
    });
}

init();