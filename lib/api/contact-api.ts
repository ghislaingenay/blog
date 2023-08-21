import { BACK_END_URL } from "@constants/global.const";
import { ContactFormAttrs } from "@interfaces/contact.interface";
import { APIResponse } from "@interfaces/global.interface";
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
      };
    })
    .catch((err) => {
      console.log(err);
      return { message: err.message, isSuccess: false, data: [] };
    });
};

// client side
export const setReadMessage = async (
  formId: string,
  accessToken: string
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
    .then((res) => {
      return { updated: true };
    })
    .catch((err) => {
      return { updated: false };
    });
};
