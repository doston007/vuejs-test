import axios from 'axios';
import getPayments from './mocks/getPayments';

/**
 * @var {Axios}
 */
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

/**
 * Load payments data.
 *
 * @param {Object} params
 * @returns {Promise}
 */

if (process.env.NODE_ENV === 'production') {
  getPayments = (params = {}) => instance.request({
    method: 'get',
    url: '/api/v1/payments',
    params,
  });
}

export default {
  instance,
  getPayments,
};
