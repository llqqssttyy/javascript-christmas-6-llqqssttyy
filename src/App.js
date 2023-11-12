import ReservationController from './controllers/ReservationController.js';

class App {
  async run() {
    const reservationController = new ReservationController();

    await reservationController.reservation();
  }
}

export default App;
