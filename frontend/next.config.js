module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.(png|jpeg|gif|jp2|webp)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
            },
        });
        return config;
    },
};
