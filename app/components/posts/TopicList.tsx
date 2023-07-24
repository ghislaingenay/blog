"use client";

import { DivProps, PostTopic } from "@interfaces/global.interface";
import $ from "jquery";
import { useCallback, useState } from "react";
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
  const removeSpaceFromTopicName = (name: string) => name.replaceAll(" ", "_");
  const addSpaceToTopicName = (name: string) => name.replaceAll("_", " ");
  const topicList = topics.map((topic) => {
    return { ...topic, name: removeSpaceFromTopicName(topic.name) };
  });

  const ACTIVE_DIV_CLASS = "bg-slate-300 rounded-lg bg-opacity-0.5";

  const isSelected = (name: string) => name === selectedTopic;
  const generateId = (topicName: string) => `name-${topicName}`;
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(
    undefined
  );

  // const idLink = idHTMLLiElement.replace("name-", "");
  // console.log(idLink);
  const changeDisplayData = (
    isSelected: boolean,
    idHTMLLiElement: string
  ) => {};

  $("li")
    .off("click")
    .on("click", function (e) {
      e.stopPropagation();
      const liElement = ($(this).parent("id") as any)
        .prevObject[0] as HTMLLIElement;
      const idHTMLLiElement = liElement.getAttribute("id") as string;
      const isSelectedElement = isSelected(idHTMLLiElement);
      if (isSelectedElement) setSelectedTopic(undefined);
      else setSelectedTopic(idHTMLLiElement);
      changeDisplayData(isSelectedElement, idHTMLLiElement);
    });

  const LI_CLASS_LG =
    "grid px-5 grid-cols-6 place-self-center justify-between items-center mb-1 py-2";

  const topicIcons: Record<PostTopic, any> | any = {
    [PostTopic.DATABASES]: "FaDatabase",
    [PostTopic.DATA_SCIENCE]: "FaDatabase",
    [PostTopic.AI]: "FaDatabase",
    [PostTopic.WEB_DEVELOPMENT]: <BiCode />,
    [PostTopic.PERSONAL]: "FaDatabase",
    [PostTopic.OTHERS]: "FaDatabase",
    [PostTopic.DEVOPS]: "FaDatabase",
  };

  const setActivatedStyle = useCallback(
    (topic: string) => {
      if (selectedTopic === topic) return `${LI_CLASS_LG} ${ACTIVE_DIV_CLASS}`;
      else return LI_CLASS_LG;
    },
    [selectedTopic]
  );

  return (
    <>
      {/* ----* Small screen *---- */}
      <div className="grid lg:hidden grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
        {topicList.map(({ name }) => (
          <div
            key={name}
            id={`name-${name}`}
            className="flex flex-wrap justify-between items-center"
          >
            {topicIcons[name] && (
              <span className="col-span-1">{topicIcons[name]}</span>
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
          {topicList.map(({ name, count }) => (
            <li
              className={setActivatedStyle(generateId(name))}
              key={name}
              id={generateId(name)}
            >
              <span className="col-span-5 text-sm font-bold m-0">{name} </span>
              <small className="col-span-1">
                <Tag color="gray">{count}</Tag>
              </small>
            </li>
          ))}
        </div>
      </div>
    </>
  );
};
