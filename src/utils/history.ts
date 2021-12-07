import { createBrowserHistory } from 'history';

export default function (path: string) {
    createBrowserHistory().push(path);
    createBrowserHistory().go(0);
}


