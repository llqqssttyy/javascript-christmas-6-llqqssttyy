import ReservationController from './services/ReservationController.js';

class App {
  async run() {
    const reservationController = new ReservationController();

    await reservationController.reservation();
  }
}

export default App;
