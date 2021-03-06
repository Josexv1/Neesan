// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app, Menu } from "electron";
// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from "env";
import path from "path";
import url from "url";
import * as _app from './helpers/config';
import createWindow from "./helpers/window";
import { devMenuTemplate } from "./menu/dev_menu_template";
import { editMenuTemplate } from "./menu/edit_menu_template";
import { issueMenu } from './menu/issue_menu';


const setApplicationMenu = () => {
  const menus = [editMenuTemplate, issueMenu];
  if (env.name !== "production") {
    menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== "production") {
  const userDataPath = app.getPath("userData");
  app.setPath("userData", `${userDataPath} (${env.name})`);
}

app.on("ready", () => {
  setApplicationMenu();

  if (_app.height === '') {
    _app.height = 1000;
    _app.width = 600;
  }

  const mainWindow = createWindow("main", {
    width: _app.width,
    height: _app.height,
    minWidth: 955,
    minHeight: 740
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "app.html"),
      protocol: "file:",
      slashes: true
    })
  );

  if (env.name === "development") {
    mainWindow.openDevTools();
  }
});

app.on("window-all-closed", () => {
  app.quit();
});
