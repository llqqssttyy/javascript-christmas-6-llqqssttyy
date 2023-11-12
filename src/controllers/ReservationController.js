import InputView from '../InputView.js';
import OutputView from '../OutputView.js';
import EventPlanner from '../models/EventPlanner.js';

class ReservationController {
  #inputView;

  #outputView;

  #eventPlanner;

  constructor() {
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  async reservation() {
    this.#outputView.printStart();

    await handleException(async () => await this.#getDate());
  }

  async #getDate() {
    const date = await this.#inputView.readDate();
  }
}

export default ReservationController;
