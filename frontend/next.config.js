module.exports = {
    webpack(config) {
        config.module.rules.push(
            {
                test: /\.svg$/,
                issuer: {
                    test: /\.(js|ts|jsx|tsx)x?$/,
                },
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(png|jpeg|gif|jp2|webp)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            }
        );
        return config;
    },
};
