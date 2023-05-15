import axios from 'axios';

import config from '../config';
import RequestConfig from '../domain/misc/RequestConfig';
import PractitionerResponse from '../domain/responses/PractitionerResponse';

/**
 * Fetch practitioner list.
 *
 * @returns {Promise<PractitionerResponse>}
 */
 export async function fetchPractitioners(reqConfig: RequestConfig): Promise<PractitionerResponse> {
    return await axios.get(config.endpoints.practitioners, reqConfig);
  }