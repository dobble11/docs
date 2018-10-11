import './index.css';

let func = data => dispatch => console.log(data, dispatch);

let hdc = 12;

let wrapFunc = (...arg) => func(...arg)(hdc);

wrapFunc(11);
