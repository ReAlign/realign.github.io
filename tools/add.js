const fs = require('fs');
const path = require('path');

const ejs = require('ejs');
const fse = require('fs-extra');
const moment = require('moment');
const inquirer = require('inquirer');

const join = path.join;

const base = join(__dirname, '..', 'src');

const filePath = join(base, '.template', 'tpl.ejs');

const getCateList = () => {
    const dirPath = join(base, 'categories');
    const arr = [];
    let files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const allowExt = '.md';
        const fPath = join(dirPath, file);
        const stats = fs.statSync(fPath);
        const ext = path.extname(file);
        if(stats.isFile() && ext === allowExt && file !== 'README.md') {
            const value = file.substr(0, file.length - allowExt.length);
            arr.push({
                value,
                name: value,
            });
        }
    });
    // console.log(arr);
    return arr;
};

const getPromptList = () => {
    return [
        {
            type: 'input',
            message: '路径(./src/posts/)',
            name: 'postPath',
            default: ''
        },
        {
            type: 'input',
            message: '标题',
            name: 'title',
            default: '标题'
        },
        {
            type: 'input',
            message: '描述',
            name: 'description',
            default: '描述'
        },
        {
            type: 'input',
            message: '摘录',
            name: 'excerpt',
            default: '摘录'
        },
        {
            type: 'checkbox',
            name: 'cates',
            message: '分类',
            choices: getCateList(),
        },
        {
            type: 'checkbox',
            name: 'tags',
            message: '标签',
            choices: getCateList(),
        },
        {
            type: 'input',
            message: '创建时间',
            name: 'createdTime',
            default: moment().format('YYYY-MM-DD HH:mm')
        },
        {
            type: 'input',
            message: '更新时间',
            name: 'updatedTime',
            default: moment().format('YYYY-MM-DD HH:mm')
        },
        {
            type: 'input',
            message: 'meta-keywords',
            name: 'contents',
            default: ''
        }
    ];
};

const Add = () => {
    inquirer.prompt(getPromptList()).then((answers = {}) => {
        const { postPath = '' } = answers;
        const newPath = join(base, 'posts', `${postPath}.md`);
        ejs.renderFile(filePath, answers, {}, (err, str) => {
            fse.ensureFile(newPath, () => {
                fs.writeFile(newPath, str, () => {
                    console.log('post created.');
                });
             })
        });
    });
};

Add();

// getCateList();