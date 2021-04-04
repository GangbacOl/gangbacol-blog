import axios from 'axios';

import { BASEURL } from './baseUrl';

export const getUser = async (data: number): Promise<object> => await axios.get(`${BASEURL}`, { data });
