import axios from 'axios';

import config from '../config';
import { interpolate } from '../utils/interpolate';
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

/**
 * Edit practitioner to list.
 *
 */
export async function editPractitioner(practitionerData: PractitionerPayload, id: number, reqConfig: RequestConfig) {
  const formDataToSubmit = new FormData();
  Object.entries(practitionerData).forEach(([key, value]) => formDataToSubmit.append(key, value));

  const url = interpolate(config.endpoints.editPractitioners, { id });

  return await axios.put(url, formDataToSubmit, reqConfig);
}

/**
 * Delete practitioner list.
 *
 */
export async function deletePractitioner(id: number, reqConfig: RequestConfig) {
  const url = interpolate(config.endpoints.deletePractitioners, { id });

  return await axios.delete(url, reqConfig);
}
