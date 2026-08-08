import {
  FacebookAdsApi,
  ServerEvent,
  EventRequest,
  UserData,
  CustomData,
} from "facebook-nodejs-business-sdk";

const PIXEL_ID = process.env.FB_PIXEL_ID;
const ACCESS_TOKEN = process.env.FB_CONVERSIONS_API_TOKEN;
const TEST_EVENT_CODE = process.env.FB_TEST_EVENT_CODE;

let apiReady = false;

interface SendServerEventParams {
  eventName: string;
  eventId: string;
  eventSourceUrl: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbp?: string;
  fbc?: string;
  email?: string;
  phone?: string;
  contentName?: string;
}

/**
 * Sends a server-side event to Meta's Conversions API. Silently no-ops when
 * FB_PIXEL_ID / FB_CONVERSIONS_API_TOKEN aren't configured, and never throws
 * — this is a best-effort tracking call and must not affect the user-facing
 * flow that triggers it (e.g. the contact form).
 */
export async function sendFacebookServerEvent(
  params: SendServerEventParams
): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) return;

  try {
    if (!apiReady) {
      FacebookAdsApi.init(ACCESS_TOKEN);
      apiReady = true;
    }

    const userData = new UserData();
    if (params.clientIpAddress) userData.setClientIpAddress(params.clientIpAddress);
    if (params.clientUserAgent) userData.setClientUserAgent(params.clientUserAgent);
    if (params.fbp) userData.setFbp(params.fbp);
    if (params.fbc) userData.setFbc(params.fbc);
    // setEmail/setPhone normalize + SHA-256 hash the value before it's ever
    // sent over the wire to Meta, per Conversions API requirements.
    if (params.email) userData.setEmail(params.email);
    if (params.phone) userData.setPhone(params.phone);

    const customData = new CustomData();
    if (params.contentName) customData.setContentName(params.contentName);

    const serverEvent = new ServerEvent()
      .setEventName(params.eventName)
      .setEventTime(Math.floor(Date.now() / 1000))
      .setEventId(params.eventId)
      .setEventSourceUrl(params.eventSourceUrl)
      .setUserData(userData)
      .setCustomData(customData)
      .setActionSource("website");

    const eventRequest = new EventRequest(ACCESS_TOKEN, PIXEL_ID).setEvents([
      serverEvent,
    ]);
    if (TEST_EVENT_CODE) eventRequest.setTestEventCode(TEST_EVENT_CODE);

    await eventRequest.execute();
  } catch (error) {
    console.error("Meta Conversions API event failed:", error);
  }
}
