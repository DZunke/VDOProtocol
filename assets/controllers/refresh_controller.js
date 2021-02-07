import {Controller} from 'stimulus';

export default class extends Controller {
    refresh(e) {
        e.preventDefault();
        location.reload();
    }
}
