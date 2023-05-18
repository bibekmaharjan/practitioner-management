import axios from 'axios';

import config from '../config';
import RequestConfig from '../domain/misc/RequestConfig';
import PractitionerPayload from '../domain/requests/PractitionerPayload';
import PractitionerResponse from '../domain/responses/PractitionerResponse';

/**
 * Fetch practitioner list.
 *
 * @returns {Promise<PractitionerResponse>}
 */
export async function fetchPractitioners(reqConfig: RequestConfig): Promise<PractitionerResponse> {
  return await axios.get(config.endpoints.practitioners, reqConfig);
}

/**
 * Add practitioner to list.
 *
 */
export async function addPractitioner(practitionerData: PractitionerPayload, reqConfig: RequestConfig) {
  const formDataToSubmit = new FormData();
  Object.entries(practitionerData).forEach(([key, value]) => formDataToSubmit.append(key, value));

  return await axios.post(config.endpoints.practitioners, formDataToSubmit, reqConfig);
}
