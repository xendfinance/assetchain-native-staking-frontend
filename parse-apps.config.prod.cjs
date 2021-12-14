module.exports = {
    apps : [{
        name        : 'StakeUI',
        script      : 'npm run start:server',
        watch       : false,
        merge_logs  : true,
        cwd         : '/var/www/stake.xend.finance',
    }]
};