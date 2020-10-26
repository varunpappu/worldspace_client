import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Main } from './Main';
import 'antd/dist/antd.css'


export class App {
    constructor() {
        this.render();
    }

    private render(): void {
        ReactDOM.render(React.createElement(Main, { app: this }), document.getElementById("app"));
    }
}
new App();
