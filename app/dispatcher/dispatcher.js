import { Dispatcher } from 'flux';


class AppDispatcher extends Dispatcher {
  dispatch(actionType, data) {
    super.dispatch({ actionType, data });
  }
}


export default new AppDispatcher();
