import { BACK_END_URL } from "@constants/global.const";
import { ContactFormAttrs } from "@interfaces/contact.interface";
import { APIResponse, AuthToken } from "@interfaces/global.interface";
import { getToken } from "@lib/functions/auth.fn";
import axios from "axios";

// server side
export const getForms = async (): Promise<APIResponse<ContactFormAttrs[]>> => {
  const accessToken = await getToken();
  return await fetch(`${BACK_END_URL}/contact/forms`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(async (res) => {
      const data = (await res.json()) as APIResponse<ContactFormAttrs[]>;
      return {
        ...data,
        statusCode: res.status,
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        message: err.message,
        isSuccess: false,
        data: [],
        statusCode: err.statusCode,
      };
    });
};

// client side
export const setReadMessage = async (
  formId: string,
  accessToken: AuthToken
): Promise<{ updated: boolean }> => {
  return await axios
    .post(
      `${BACK_END_URL}/contact/${formId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then(() => {
      return { updated: true };
    })
    .catch(() => {
      return { updated: false };
    });
};
