const {writeFileSync, existsSync, readFileSync} = require("fs");

let URLS = {
    cachyos_proton: "https://api.github.com/repos/CachyOS/proton-cachyos/releases/latest",
    proton_ge: "https://api.github.com/repos/GloriousEggroll/proton-ge-custom/releases/latest",
    proton_em: "https://api.github.com/repos/Etaash-mathamsetty/Proton/releases/latest",
    proton_umu: "https://api.github.com/repos/Open-Wine-Components/umu-proton/releases/latest",
    proton_vanilla: "https://api.github.com/repos/loathingKernel/Proton/releases/latest"
};

let PATHS = {
    cachyos_proton: `${__dirname}/generated/proton_cachyos.json`,
    proton_ge: `${__dirname}/generated/proton_ge.json`,
    proton_em: `${__dirname}/generated/proton_em.json`,
    proton_umu: `${__dirname}/generated/proton_umu.json`,
    proton_vanilla: `${__dirname}/generated/proton_vanilla.json`
}

async function generateManifest(proton_type = "proton_cachyos") {
    let final = {};
    switch (proton_type) {
        case "proton_cachyos": {
            let rsp = await fetch(`${URLS.cachyos_proton}`);
            if (rsp.status !== 200) return;
            let r = await rsp.json();
            let assets_list = r.assets.filter((e) => e.name.includes("slr-x86_64.tar.xz"));
            if (assets_list.length === 0) return;
            let asset = assets_list[0];
            let ver = asset.name.match(/\d+\.\d+-\d+/)[0];
            let latest_ver = r.name.match(/\d+\.\d+-\d+/)[0];

            let versioninfo = {
                version: `${ver}-proton-cachyos`,
                url: `${asset.browser_download_url}`,
                urls: {
                    x86_64: `${asset.browser_download_url}`,
                    aarch64: ""
                }
            };

            let versionslist = [];
            // append version
            if (process.argv[2] === "append") {
                if (existsSync(PATHS.cachyos_proton)) {
                    let currentf = readFileSync(PATHS.cachyos_proton);
                    let data = JSON.parse(currentf);
                    versionslist.push(versioninfo);

                    data.versions.forEach(v => {
                        if (v.version.toLowerCase().replace("-proton-cachyos", "") !== latest_ver) {versionslist.push(v);}
                    });
                } else {versionslist.push(versioninfo);}
            } else {versionslist.push(versioninfo);}

            final = {
                version: 1,
                display_name: "Proton (CachyOS)",
                versions: versionslist,
                paths: {
                    wine32: "proton",
                    wine64: "proton",
                    wine_server: "files/bin/wineserver",
                    wine_boot: ""
                }
            };
        }
        break;
        case "proton_ge": {
            let rsp = await fetch(`${URLS.proton_ge}`);
            if (rsp.status !== 200) return;
            let r = await rsp.json();
            let assets_list = r.assets.filter((e) => e.name.includes(".tar.gz"));
            if (assets_list.length === 0) return;
            let asset = assets_list[0];
            let ver = `${asset.name.match(/(\d+)-(\d+)/)[0].replace("-", ".")}`;
            let latest_ver = `${r.name.match(/(\d+)-(\d+)/)[0].replace("-", ".")}`;

            let versioninfo = {
                version: `${ver}-proton-ge`,
                url: `${asset.browser_download_url}`,
                urls: {
                    x86_64: `${asset.browser_download_url}`,
                    aarch64: ""
                }
            };

            let versionslist = [];
            // append version
            if (process.argv[2] === "append") {
                if (existsSync(PATHS.proton_ge)) {
                    let currentf = readFileSync(PATHS.proton_ge);
                    let data = JSON.parse(currentf);
                    versionslist.push(versioninfo);

                    data.versions.forEach(v => {
                        if (v.version.toLowerCase().replace("-proton-ge", "") !== latest_ver) {versionslist.push(v);}
                    });
                } else {versionslist.push(versioninfo);}
            } else {versionslist.push(versioninfo);}

            final = {
                version: 1,
                display_name: "Proton (GE)",
                versions: versionslist,
                paths: {
                    wine32: "proton",
                    wine64: "proton",
                    wine_server: "files/bin/wineserver",
                    wine_boot: ""
                }
            };
        }
        break;
        case "proton_em": {
            let rsp = await fetch(`${URLS.proton_em}`);
            if (rsp.status !== 200) return;
            let r = await rsp.json();
            let assets_list = r.assets.filter((e) => e.name.includes(".tar.xz"));
            if (assets_list.length === 0) return;
            let asset = assets_list[0];
            let ver = `${asset.name.match(/\d+\.\d+-\d+/)[0]}`;
            let latest_ver = `${r.name.match(/\d+\.\d+-\d+/)[0]}`;

            let versioninfo = {
                version: `${ver}-proton-em`,
                url: `${asset.browser_download_url}`,
                urls: {
                    x86_64: `${asset.browser_download_url}`,
                    aarch64: ""
                }
            };

            let versionslist = [];
            // append version
            if (process.argv[2] === "append") {
                if (existsSync(PATHS.proton_em)) {
                    let currentf = readFileSync(PATHS.proton_em);
                    let data = JSON.parse(currentf);
                    versionslist.push(versioninfo);

                    data.versions.forEach(v => {
                        if (v.version.toLowerCase().replace("-proton-em", "") !== latest_ver) {versionslist.push(v);}
                    });
                } else {versionslist.push(versioninfo);}
            } else {versionslist.push(versioninfo);}

            final = {
                version: 1,
                display_name: "Proton (EM)",
                versions: versionslist,
                paths: {
                    wine32: "proton",
                    wine64: "proton",
                    wine_server: "files/bin/wineserver",
                    wine_boot: ""
                }
            };
        }
        break;
        case "proton_umu": {
            let rsp = await fetch(`${URLS.proton_umu}`);
            if (rsp.status !== 200) return;
            let r = await rsp.json();
            let assets_list = r.assets.filter((e) => e.name.includes(".tar.gz"));
            if (assets_list.length === 0) return;
            let asset = assets_list[0];
            let ver = `${asset.name.match(/\d+\.\d+-\w+/)[0]}`;
            let latest_ver = `${r.name.match(/\d+\.\d+-\w+/)[0]}`;

            let versioninfo = {
                version: `${ver}-proton-umu`,
                url: `${asset.browser_download_url}`,
                urls: {
                    x86_64: `${asset.browser_download_url}`,
                    aarch64: ""
                }
            };

            let versionslist = [];
            // append version
            if (process.argv[2] === "append") {
                if (existsSync(PATHS.proton_umu)) {
                    let currentf = readFileSync(PATHS.proton_umu);
                    let data = JSON.parse(currentf);
                    versionslist.push(versioninfo);

                    data.versions.forEach(v => {
                        if (v.version.toLowerCase().replace("-proton-umu", "") !== latest_ver) {versionslist.push(v);}
                    });
                } else {versionslist.push(versioninfo);}
            } else {versionslist.push(versioninfo);}

            final = {
                version: 1,
                display_name: "Proton (UMU)",
                versions: versionslist,
                paths: {
                    wine32: "proton",
                    wine64: "proton",
                    wine_server: "files/bin/wineserver",
                    wine_boot: ""
                }
            };
        }
        break;
        case "proton_vanilla": {
            let rsp = await fetch(`${URLS.proton_vanilla}`);
            if (rsp.status !== 200) return;
            let r = await rsp.json();
            let assets_list = r.assets.filter((e) => e.name.includes("x86_64.tar.xz"));
            if (assets_list.length === 0) return;
            let asset = assets_list[0];
            let ver = asset.name.match(/\d+\.\d+-\d+/)[0];
            let latest_ver = r.name.match(/\d+\.\d+-\d+/)[0];

            let versioninfo = {
                version: `${ver}-proton-vanilla`,
                url: `${asset.browser_download_url}`,
                urls: {
                    x86_64: `${asset.browser_download_url}`,
                    aarch64: ""
                }
            };

            let versionslist = [];
            // append version
            if (process.argv[2] === "append") {
                if (existsSync(PATHS.proton_vanilla)) {
                    let currentf = readFileSync(PATHS.proton_vanilla);
                    let data = JSON.parse(currentf);
                    versionslist.push(versioninfo);

                    data.versions.forEach(v => {
                        if (v.version.toLowerCase().replace("-proton-vanilla", "") !== latest_ver) {versionslist.push(v);}
                    });
                } else {versionslist.push(versioninfo);}
            } else {versionslist.push(versioninfo);}

            final = {
                version: 1,
                display_name: "Proton (Vanilla)",
                versions: versionslist,
                paths: {
                    wine32: "proton",
                    wine64: "proton",
                    wine_server: "files/bin/wineserver",
                    wine_boot: ""
                }
            };
        }
        break;
    }
    return final;
}

generateManifest("proton_cachyos").then(r => writeFileSync(PATHS.cachyos_proton, JSON.stringify(r, null, 2), {encoding: "utf8"}));
generateManifest("proton_ge").then(r => writeFileSync(PATHS.proton_ge, JSON.stringify(r, null, 2), {encoding: "utf8"}));
generateManifest("proton_em").then(r => writeFileSync(PATHS.proton_em, JSON.stringify(r, null, 2), {encoding: "utf8"}));
generateManifest("proton_umu").then(r => writeFileSync(PATHS.proton_umu, JSON.stringify(r, null, 2), {encoding: "utf8"}));
generateManifest("proton_vanilla").then(r => writeFileSync(PATHS.proton_vanilla, JSON.stringify(r, null, 2), {encoding: "utf8"}));