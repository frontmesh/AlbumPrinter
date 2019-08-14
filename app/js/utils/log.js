
import { debugContainer } from '../selectors/';

const log = msg => debugContainer.innerHTML += `<p>${msg}</p>`;

export default log;
