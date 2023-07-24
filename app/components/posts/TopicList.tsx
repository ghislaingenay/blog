"use client";

import { DivProps, PostTopic } from "@interfaces/global.interface";
import $ from "jquery";
import { useCallback, useEffect, useState } from "react";
import { BiCode } from "react-icons/bi";
import { Tag } from "../Tag";

type TopicListProps = {
  topics: PostTopicSearch[];
};

interface TopicDivProps extends DivProps {
  children?: React.ReactNode;
  className: string;
  topic: string;
}

export const TopicList = ({ topics }: TopicListProps) => {
  const addSpaceToTopicName = (name: string) => name.replaceAll("_", " ");
  const addNameStrToTopicName = (topicName: string) => `name-${topicName}`;
  const removeNameStrToTopicName = (topicName: string) =>
    topicName?.replace("name-", "") || topicName;

  const topicList = topics.map((topic) => {
    return { ...topic, id: addNameStrToTopicName(topic.name) };
  });
  console.log("tp", topics);

  const ACTIVE_LI_CLASS = "bg-slate-300 rounded-lg bg-opacity-0.5";

  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(
    undefined
  );
  const isSelected = (name: string) => name === selectedTopic;
  // const isSelected = (name: string) => $(`li#${name}`).hasClass("selected");
  const [generatedId, setGeneratedId] = useState<string | undefined>(undefined);

  // const idLink = idHTMLLiElement.replace("name-", "");

  useEffect(() => {
    $("li")
      .off("click")
      .on("click", function (e) {
        const liElement = ($(this).parent("id") as any)
          .prevObject[0] as HTMLLIElement;
        const idHTMLLiElement = liElement.getAttribute("id") as string;
        setGeneratedId(
          (Math.random() * 10000).toString(36).substring(2) +
            "+" +
            idHTMLLiElement
        );
      });
  }, []);

  const LI_CLASS_LG =
    "grid px-5 grid-cols-6 place-self-center justify-between items-center mb-1 py-2";

  const topicIconsLg: Record<PostTopic, any> | any = {
    [PostTopic.DATABASES]: "FaDatabase",
    [PostTopic.DATA_SCIENCE]: "FaDatabase",
    [PostTopic.AI]: "FaDatabase",
    [PostTopic.WEB_DEVELOPMENT]: <BiCode />,
    [PostTopic.PERSONAL]: "FaDatabase",
    [PostTopic.OTHERS]: "FaDatabase",
    [PostTopic.DEVOPS]: "FaDatabase",
  };

  const topicKeys = Object.keys(PostTopic);

  useEffect(() => {
    const listId = generatedId?.split("+")[1];
    const topicKey = removeNameStrToTopicName(listId as string);
    console.log("listId", listId, topicKey);
    console.log("hhh", $(`a#WEB_DEVELOPMENT`).get());
    if (listId === selectedTopic) {
      topicKeys.forEach((topic) => {
        $(`a#${topic}`).removeClass("hidden");
      });
      return setSelectedTopic(undefined);
    } else {
      const unSelectedTopicKeys = topicKeys.filter((key) => key !== topicKey);
      unSelectedTopicKeys.forEach((topic) => {
        $(`a#${topic}`).addClass("hidden");
      });
      $(`a#${topicKey}`).removeClass("hidden");
      return setSelectedTopic(listId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatedId]);

  const setActivatedStyle = useCallback(
    (name: string) => {
      if (name === selectedTopic) return `${LI_CLASS_LG} ${ACTIVE_LI_CLASS}`;
      else return `${LI_CLASS_LG}`;
    },
    [selectedTopic]
  );

  return (
    <>
      {/* ----* Small screen *---- */}
      <div className="grid lg:hidden grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
        {topics.map(({ name }) => (
          <div
            key={name}
            id={`name-${name}`}
            className="flex flex-wrap justify-between items-center"
          >
            {topicIconsLg[name] && (
              <span className="col-span-1">{topicIconsLg[name]}</span>
            )}
          </div>
        ))}
      </div>

      {/* --- Large screen --- */}
      <div className="hidden lg:block w-10/12 mx-auto">
        <h3 className="text-center border border-b-black border-t-black border-l-0 border-r-0 py-1 mx-auto">
          Main topics
        </h3>
        <div className="list-none block" role="list">
          {topicList.map(({ name, count, id }) => {
            return (
              <>
                <li className={setActivatedStyle(id)} key={name} id={id}>
                  <span className="col-span-5 text-sm font-bold m-0">
                    {addSpaceToTopicName(name)}{" "}
                  </span>
                  <small className="col-span-1">
                    <Tag color="gray">{count}</Tag>
                  </small>
                </li>
                <li
                  className={setActivatedStyle("name-dfdg")}
                  key={name}
                  id="name-dfdg"
                >
                  <span className="col-span-5 text-sm font-bold m-0">Gt </span>
                  <small className="col-span-1">
                    <Tag color="gray">3</Tag>
                  </small>
                </li>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
