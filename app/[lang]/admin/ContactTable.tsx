"use client";
import { ContactFormAttrs } from "@interfaces/contact.interface";
import { AuthToken } from "@interfaces/global.interface";
import { setReadMessage } from "@lib-api/contact-api";
import { Table } from "antd";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";

type FormTableProps = {
  formData: ContactFormAttrs[];
  accessToken: AuthToken;
};

export const FormTable = ({ formData, accessToken }: FormTableProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  const changeReadStatus = async (id: string) => {
    setLoading(true);
    await setReadMessage(id, accessToken)
      .then(({ updated }) => {
        if (updated) revalidatePath("/admin/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const tableColumns = [
    {
      align: "center" as const,
      title: "Name",
      render: ({ firstName, lastName }: ContactFormAttrs) => (
        <p>
          {firstName} {lastName}
        </p>
      ),
    },
    {
      align: "center" as const,
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      align: "center" as const,
      title: "Company",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      align: "center" as const,
      title: "Read",
      render: ({ isRead, _id }: Required<ContactFormAttrs>) => (
        <p>
          {isRead ? (
            "Yes"
          ) : (
            <button onClick={() => changeReadStatus(_id)}></button>
          )}
        </p>
      ),
    },
  ];

  const expandRowRendered = (record: ContactFormAttrs) => (
    <>
      <h2>Subject {record.subject}</h2>;
      <hr className="my-0.5" />
      <p>{record.message}</p>
    </>
  );

  return (
    <Table
      dataSource={formData}
      columns={tableColumns}
      loading={loading}
      expandable={{
        expandedRowRender: (record: ContactFormAttrs) =>
          expandRowRendered(record),
      }}
    />
  );
};
