const {writeFileSync, existsSync, readFileSync} = require("fs");

let URLS = {
    cachyos_proton: "https://api.github.com/repos/CachyOS/proton-cachyos/releases/latest",
    proton_ge: "https://api.github.com/repos/GloriousEggroll/proton-ge-custom/releases/latest",
    proton_em: "https://api.github.com/repos/Etaash-mathamsetty/Proton/releases/latest",
    proton_umu: "https://api.github.com/repos/Open-Wine-Components/umu-proton/releases/latest",
    proton_vanilla: "https://api.github.com/repos/loathingKernel/Proton/releases/latest",
    proton_twintail: "https://api.github.com/repos/TwintailTeam/proton-twintail/releases/latest"
};

let PATHS = {
    cachyos_proton: `${__dirname}/generated/proton_cachyos.json`,
    proton_ge: `${__dirname}/generated/proton_ge.json`,
    proton_em: `${__dirname}/generated/proton_em.json`,
    proton_umu: `${__dirname}/generated/proton_umu.json`,
    proton_vanilla: `${__dirname}/generated/proton_vanilla.json`,
    proton_twintail: `${__dirname}/generated/proton_twintail.json`
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
            let assets_list_arm = r.assets.filter((e) => e.name.includes("slr-arm64.tar.xz"));
            if (assets_list_arm.length === 0) return;
            let asset_arm = assets_list_arm[0];
            let ver = asset.name.match(/\d+\.\d+-\d+/)[0];
            let latest_ver = r.name.match(/\d+\.\d+-\d+/)[0];

            let versioninfo = {
                version: `${ver}-proton-cachyos`,
                url: `${asset.browser_download_url}`,
                urls: {
                    x86_64: `${asset.browser_download_url}`,
                    aarch64: `${asset_arm.browser_download_url}`,
                    x86_64_hash: `${asset["digest"]}`.replace("sha256:", ""),
                    aarch64_hash: `${asset_arm["digest"]}`.replace("sha256:", "")
                },
                hash: `${asset["digest"]}`.replace("sha256:", "")
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
                aarch64_supported: true,
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
                    aarch64: "",
                    x86_64_hash: `${asset["digest"]}`.replace("sha256:", ""),
                    aarch64_hash: ""
                },
                hash: `${asset["digest"]}`.replace("sha256:", "")
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
                aarch64_supported: false,
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
                    aarch64: "",
                    x86_64_hash: `${asset["digest"]}`.replace("sha256:", ""),
                    aarch64_hash: ""
                },
                hash: `${asset["digest"]}`.replace("sha256:", "")
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
                aarch64_supported: false,
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
                    aarch64: "",
                    x86_64_hash: `${asset["digest"]}`.replace("sha256:", ""),
                    aarch64_hash: ""
                },
                hash: `${asset["digest"]}`.replace("sha256:", "")
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
                aarch64_supported: false,
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
            let assets_list_arm = r.assets.filter((e) => e.name.includes("arm64.tar.xz"));
            if (assets_list_arm.length === 0) return;
            let asset_arm = assets_list_arm[0];
            let ver = asset.name.match(/\d+\.\d+-\d+/)[0];
            let latest_ver = r.name.match(/\d+\.\d+-\d+/)[0];

            let versioninfo = {
                version: `${ver}-proton-vanilla`,
                url: `${asset.browser_download_url}`,
                urls: {
                    x86_64: `${asset.browser_download_url}`,
                    aarch64: `${asset_arm.browser_download_url}`,
                    x86_64_hash: `${asset["digest"]}`.replace("sha256:", ""),
                    aarch64_hash: `${asset_arm["digest"]}`.replace("sha256:", "")
                },
                hash: `${asset["digest"]}`.replace("sha256:", "")
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
                aarch64_supported: true,
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
        case "proton_twintail": {
            let rsp = await fetch(`${URLS.proton_twintail}`);
            if (rsp.status !== 200) return;
            let r = await rsp.json();
            let assets_list = r.assets.filter((e) => e.name.includes("slr-x86_64.tar.xz"));
            if (assets_list.length === 0) return;
            let asset = assets_list[0];
            let assets_list_arm = r.assets.filter((e) => e.name.includes("slr-arm64.tar.xz"));
            if (assets_list_arm.length === 0) return;
            let asset_arm = assets_list_arm[0];
            let ver = asset.name.match(/\d+\.\d+-\d+/)[0];
            let latest_ver = r.name.match(/\d+\.\d+-\d+/)[0];

            let versioninfo = {
                version: `${ver}-proton-twintail`,
                url: `${asset.browser_download_url}`,
                urls: {
                    x86_64: `${asset.browser_download_url}`,
                    aarch64: `${asset_arm.browser_download_url}`,
                    x86_64_hash: `${asset["digest"]}`.replace("sha256:", ""),
                    aarch64_hash: `${asset_arm["digest"]}`.replace("sha256:", "")
                },
                hash: `${asset["digest"]}`.replace("sha256:", "")
            };

            let versionslist = [];
            // append version
            if (process.argv[2] === "append") {
                if (existsSync(PATHS.proton_twintail)) {
                    let currentf = readFileSync(PATHS.proton_twintail);
                    let data = JSON.parse(currentf);
                    versionslist.push(versioninfo);

                    data.versions.forEach(v => {
                        if (v.version.toLowerCase().replace("-proton-twintail", "") !== latest_ver) {versionslist.push(v);}
                    });
                } else {versionslist.push(versioninfo);}
            } else {versionslist.push(versioninfo);}

            final = {
                version: 1,
                display_name: "Proton (Twintail)",
                aarch64_supported: true,
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
generateManifest("proton_twintail").then(r => writeFileSync(PATHS.proton_twintail, JSON.stringify(r, null, 2), {encoding: "utf8"}));