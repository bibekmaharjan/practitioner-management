import config from '../config';
import http from '../utils/http';
import PractitionerResponse from '../domain/responses/PractitionerResponse';

/**
 * Fetch practitioner list.
 *
 * @returns {Promise<PractitionerResponse>}
 */
export async function fetchPractitioners(): Promise<PractitionerResponse> {
  return await http.get(config.endpoints.practitioners);
}
