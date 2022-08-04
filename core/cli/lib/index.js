module.exports = core;

const semver = require('semver')
const colors = require('colors/safe')
const constant = require('./constant')
const pkg = require('../package.json')
const log = require('@zheye-cli-dev/log')
let argv

async function core() {
    try {
        checkVersion()
        checkNodeVersion()
        checkRoot()
        checkUserHome()
        checkInputArgs()
        log.verbose('debug', 'test debug log')
        checkEnv()
        checkGlobalUpdate()
    }catch(e) {
        log.error('cli', colors.red(e.message))
    }
}

async function checkGlobalUpdate () {
    //  1.获取最新版本号和模块名
    const currentVersion = pkg.version
    const npmName = pkg.name
    //  2.调用npmAPI，获取所有版本号
    const { getNpmSemverVersion } = require('@zheye-cli-dev/get-npm-info')
    const latestVersion = await getNpmSemverVersion(currentVersion, npmName)
    //  3.提取所有版本号，比对哪些版本号大于当前版本号
    //  4.获取最新版本号，提示用户更新到最新的版本号
    if (latestVersion && semver.gt(latestVersion, currentVersion)) {
        log.warn(colors.yellow(`请手动更新 ${npmName}，当前版本：${currentVersion}，最新版本：${latestVersion}
            更新命令：npm install -g ${npmName}
        `))
    }
}

function checkEnv () {
    require('dotenv').config()
    // console.log(process.env)
}

function checkInputArgs () {
    argv = require('minimist')(process.argv.slice(2))
    checkArgs()
}

function checkArgs () {
    if (argv.debug) {
        process.env.LOG_LEVEL = 'verbose'
    } else {
        process.env.LOG_LEVEL = 'info'
    }
    log.level = process.env.LOG_LEVEL
}

function checkUserHome () {
    const home = require('os').homedir
    const pathExists = require('path-exists')
    if (!home || !pathExists(home)) {
        throw Error('当前登录用户主目录不存在')
    }
}

function checkRoot () {
    const rootCheck = require('root-check')
    rootCheck()
    //  如果是0则是root用户
    // console.log(process.geteuid())

}

function checkNodeVersion() {
    //  第一步，获取当前node版本
    const currentNodeVersion = process.version
    //  第二步，对比最低版本
    if (!semver.gt(currentNodeVersion, constant.LOW_NODE_VERSION)) {
        throw Error(`zheye-cli需要安装v${constant.LOW_NODE_VERSION}以上版本的Node.js`)
    }
}

function checkVersion() {
    log.info('cli', pkg.version)
}

