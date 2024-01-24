module.exports = {
  title: "Whisper-WebUI",
  icon: "icon.png",
  description: "A Web UI for easy subtitle using whisper model (https://github.com/jhj0517/Whisper-WebUI)",
  menu: async (kernel) => {
    let installed = await kernel.exists(__dirname, "app", "venv")
    let installing = await kernel.running(__dirname, "install.js")
    if (installing) {
      return [{
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      let session = await kernel.require(__dirname, "session.json")
      let running = await kernel.running(__dirname, "start.json")
      if (running) {
        if (session && session.url) {
          return [{
            icon: "fa-solid fa-rocket",
            text: "Open UI",
            href: session.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.json",
          }]
        } else {
          return [{
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.json",
          }]
        }
      } else {
        return [{
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.json",
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-solid fa-broom",
          text: "Factory Reset",
          href: "reset.js",
        }]
      }
    } else {
      return [{
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.json",
        params: { run: true, fullscreen: true }
      }]
    }
  }
}
