"use client";

import ContactFormLoading from "@components/loading/components/ContactFormLoading";
import { Divider } from "@components/styles/Divider";
import { BACK_END_URL } from "@constants/global.const";
import { ContactFormAttrs } from "@interfaces/contact.interface";
import {
  APIResponse,
  AuthToken,
  Dictionary,
} from "@interfaces/global.interface";
import { Form, Input } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { clearTimeout } from "timers";

type ContactMeFormProps = {
  dict: Dictionary;
  accessToken: AuthToken;
};

interface FormField {
  name: string;
  label: string;
  rules: any[];
  children: JSX.Element;
}

export const ContactMeForm = ({ dict, accessToken }: ContactMeFormProps) => {
  const [form] = Form.useForm();

  const contactDict = dict.appDirectory.contactMePage;
  const contactForm = contactDict.form;

  const labelDict = contactForm.labels;
  const ruleDict = contactForm.rules;
  const placeholderDict = contactForm.placeholders;

  const [firstLoad, setFirstLoad] = useState(true);

  const [loading, setLoading] = useState(false);

  const [isMessageSent, setIsMessageSent] = useState(false);
  const handleCreateForm = async (values: ContactFormAttrs) => {
    setLoading(true);
    const updatedValues = {
      ...values,
      companyName: values?.companyName || "",
      jobPosition: values?.jobPosition || "",
      language: dict.language,
    };
    const response = (await axios
      .post(`${BACK_END_URL}/contact`, updatedValues, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .catch((err: AxiosError) => {
        console.error((err.response?.data as unknown as any).message);
      })) as AxiosResponse<APIResponse<any>>;
    const { isSuccess } = response.data;
    if (isSuccess) setIsMessageSent(true);
  };

  useEffect(() => {
    if (!isMessageSent) return;
    let timeout: NodeJS.Timeout;
    timeout = setTimeout(() => {
      setIsMessageSent(false);
    });
    return () => {
      clearTimeout(timeout);
    };
  }, [isMessageSent]);

  const inputStyle = { padding: "0.5rem" };
  const buttonClass = loading
    ? "pointer-events-none bg-green-400"
    : "pointer-events-auto";

  useEffect(() => {
    form.setFieldsValue({
      companyName: "",
      jobPosition: "",
    });
    setFirstLoad(false);
  }, [form]);

  const personalFormField: FormField[] = [
    {
      name: "firstName",
      label: contactForm.labels.firstName,
      rules: [
        { required: true, message: contactForm.rules.firstName.required },
        {
          pattern: /^(.){2,50}$/i,
          message: contactForm.rules.firstName.length,
        },
      ],
      children: (
        <Input
          style={{ ...inputStyle }}
          placeholder={placeholderDict.firstName}
        />
      ),
    },
    {
      name: "lastName",
      label: contactForm.labels.lastName,
      rules: [
        { required: true, message: contactForm.rules.lastName.required },
        {
          pattern: /^(.){2,50}$/i,
          message: contactForm.rules.lastName.length,
        },
      ],
      children: (
        <Input
          placeholder={placeholderDict.lastName}
          style={{ ...inputStyle }}
        />
      ),
    },
    {
      name: "jobPosition",
      label: contactForm.labels.jobPosition,
      rules: [{ maxLength: 50, message: contactForm.rules.jobPosition.length }],
      children: (
        <Input
          placeholder={placeholderDict.jobPosition}
          style={{ ...inputStyle }}
        />
      ),
    },
    {
      name: "companyName",
      label: contactForm.labels.companyName,
      rules: [
        { maxLength: 100, message: contactForm.rules.companyName.length },
      ],
      children: (
        <Input
          style={{ ...inputStyle }}
          placeholder={placeholderDict.companyName}
        />
      ),
    },
  ];

  const emailFormField: FormField[] = [
    {
      name: "email",
      label: labelDict.email,
      rules: [
        { required: true, message: ruleDict.email.required },
        { type: "email", message: ruleDict.email.type },
      ],
      children: (
        <Input style={{ ...inputStyle }} placeholder={placeholderDict.email} />
      ),
    },
    {
      name: "subject",
      label: labelDict.subject,
      rules: [
        { required: true, message: ruleDict.subject.required },
        { pattern: /^(.){2,200}$/i, message: ruleDict.subject.length },
      ],
      children: (
        <Input
          style={{ ...inputStyle }}
          placeholder={placeholderDict.subject}
        />
      ),
    },
    {
      name: "message",
      label: labelDict.message,
      rules: [
        { required: true, message: ruleDict.message.required },
        { pattern: /^(.){2,1000}$/i, message: ruleDict.message.length },
      ],
      children: (
        <Input.TextArea
          style={{ ...inputStyle }}
          placeholder={placeholderDict.message}
          rows={4}
        />
      ),
    },
  ];

  const Spinner = (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-4 h-4 mr-2 mt-0.5 text-gray-200 animate-spin dark:text-gray-600 fill-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );

  const createFormItems = (formFields: FormField[]) =>
    formFields.map((field) => (
      <>
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          rules={field.rules}
        >
          {field.children}
        </Form.Item>
      </>
    ));

  if (firstLoad) return <ContactFormLoading count={4} />;

  const showSpinnerIfLoading = loading && <span>{Spinner}</span>;

  return (
    <>
      <Divider>{contactDict.contactMe}</Divider>
      <br />
      <Form
        form={form}
        layout="horizontal"
        labelWrap={true}
        labelAlign="left"
        labelCol={{ span: 6 }}
        onFinish={handleCreateForm}
      >
        {createFormItems(personalFormField)}
        <hr className="mt-1 mb-4" />
        {createFormItems(emailFormField)}
      </Form>
      <button
        className={`${buttonClass} bg-green-700 flex max-h-max px-5 py-1 text-white uppercase font-bold text-sm hover:bg-green-600`}
        disabled={loading}
        onClick={() => form.submit()}
      >
        {showSpinnerIfLoading}
        {dict.buttons.send}
      </button>
    </>
  );
};
