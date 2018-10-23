import './index.css';

import('./a').then(({ wrapFunc }) => wrapFunc(11));

let name = 'zh';

require(`./d/${name}`);
