import { config } from '../env';
import Status from './status';
import Strings from './strings/';


export default {
  Status,
  Strings: Strings[config.language],
};
