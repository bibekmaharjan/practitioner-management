import config from '../config';
import http from '../utils/http';
import { interpolate } from '../utils/interpolate';
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

/**
 * Edit practitioner to list.
 *
 */
export async function editPractitioner(practitionerData: PractitionerPayload, id: number) {
  const formDataToSubmit = new FormData();
  Object.entries(practitionerData).forEach(([key, value]) => formDataToSubmit.append(key, value));

  const url = interpolate(config.endpoints.editPractitioners, { id });

  return await http.put(url, formDataToSubmit);
}

/**
 * Delete practitioner list.
 *
 */
export async function deletePractitioner(id: number) {
  const url = interpolate(config.endpoints.deletePractitioners, { id });

  return await http.delete(url);
}
