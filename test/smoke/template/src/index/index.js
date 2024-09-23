import { helloworld } from './helloworld';
import '../../common';

const newDiv = document.createElement('div');
newDiv.innerHTML = helloworld();
document.body.appendChild(newDiv);
