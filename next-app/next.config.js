/** @type {import('next').NextConfig} */
const nextConfig = {}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { setupDevBindings } = require('@cloudflare/next-on-pages/__experimental__next-dev');

setupDevBindings({
    kvNamespaces: ['MY_KV'],
});

module.exports = nextConfig
