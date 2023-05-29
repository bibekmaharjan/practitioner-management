import config from '../config';
import http from '../utils/http';
import PractitionerPayload from '../domain/requests/PractitionerPayload';
import PractitionerResponse from '../domain/responses/PractitionerResponse';

/**
 * Fetch practitioner list.
 *
 * @returns {Promise<PractitionerResponse>}
 */
export async function fetchPractitioners(): Promise<PractitionerResponse> {
  return await http.get(config.endpoints.practitioners);
}

/**
 * Add practitioner to list.
 *
 */
export async function addPractitioner(practitionerData: PractitionerPayload) {
  const formDataToSubmit = new FormData();
  Object.entries(practitionerData).forEach(([key, value]) => formDataToSubmit.append(key, value));

  return await http.post(config.endpoints.practitioners, formDataToSubmit);
}
