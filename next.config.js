/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/github",
                destination: "https://github.com/MannuVilasara",
                permanent: true,
            },
            {
                source: "/gh",
                destination: "https://github.com/MannuVilasara",
                permanent: true,
            },
            {
                source: "/github/:slug*",
                destination: "https://github.com/MannuVilasara/:slug*",
                permanent: true,
            },
            {
                source: "/gh/:slug*",
                destination: "https://github.com/MannuVilasara/:slug*",
                permanent: true,
            },
            {
                source: "/linkedin",
                destination: "https://www.linkedin.com/in/mannu-vilasara-736549284/",
                permanent: true,
            },
            {
                source: "/discord",
                destination: "https://discord.com/users/1035439449070383106",
                permanent: true,
            },
            {
                source: "/spotify",
                destination: "https://open.spotify.com/user/31yuds6br2ppbgmy7n6khxbex2ye",
                permanent: true,
            },
            {
                source: "/chess",
                destination: "https://lichess.org/mannuvilasara",
                permanent: true,
            },
            {
                source: "/yt",
                destination: "https://www.youtube.com/channel/UCeItsBDoZD805nrIDHI3SVg",
                permanent: true,
            },
            {
                source: "/youtube",
                destination: "https://www.youtube.com/channel/UCeItsBDoZD805nrIDHI3SVg",
                permanent: true,
            },
        ]
    }
}

module.exports = nextConfig
