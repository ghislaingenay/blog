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
  const topicList = topics.map((topic) => {
    return { ...topic, name: removeSpaceFromTopicName(topic.name) };
  });

  const activeClass = "bg-slate-300 rounded-lg bg-opacity-0.5 selected";
  const changeTopic = (name: string) => {
    console.log($(`#name-${name}`));
    const isSelected = (name: string) =>
      $(`#name-${name}`).hasClass("selected");
    const findSelectedTopic = topicList.find(({ name }) => isSelected(name));

    console.log({
      findSelectedTopic,
      result: !findSelectedTopic,
      selected: isSelected(name),
      name,
    });
    if (isSelected(name)) return $(`#name-${name}`).removeClass(activeClass);
    if (!findSelectedTopic) return $(`#name-${name}`).addClass(activeClass);
    if (findSelectedTopic) {
      $(`#name-${findSelectedTopic.name}`).removeClass(activeClass);
      return $(`#name-${name}`).addClass(activeClass);
    }
    return;
  };

  const DivTopic = ({ children, className, topic }: TopicDivProps) => {
    const initialDivProps = (
      name: string,
      className: string
    ): Omit<TopicDivProps, "topic"> => {
      return {
        key: name,
        onClick: () => changeTopic(name),
        className: className,
      };
    };
    const name = topic;
    return (
      <>
        <div {...initialDivProps(name, className)} key={name}>
          {children}
        </div>
      </>
    );
  };

  const isSelected = (name: string) => name === selectedTopic;
  const generateId = (topicName: string) => `name-${topicName}`;
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(
    undefined
  );

  $("li")
    .off("click")
    .on("click", function (e) {
      e.stopPropagation();
      const liElement = ($(this).parent("id") as any)
        .prevObject[0] as HTMLLIElement;
      const idHTMLLiElement = liElement.getAttribute("id") as string;
      console.log({ idHTMLLiElement, sleected: isSelected(idHTMLLiElement) });
      if (isSelected(idHTMLLiElement)) return setSelectedTopic(undefined);
      setSelectedTopic(idHTMLLiElement);
    });

  const DIV_CLASS_LG =
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
      if (selectedTopic === topic)
        return `${DIV_CLASS_LG} bg-slate-300 rounded-lg bg-opacity-0.5 selected py-2`;
      else return DIV_CLASS_LG;
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
            onClick={() => changeTopic(name)}
          >
            {topicIcons[name] && (
              <span className="col-span-1">{topicIcons[name]}</span>
            )}
          </div>
        ))}
      </div>

      {/* --- Large screen --- */}
      <div className="hidden lg:block">
        <h3 className="text-center border border-b-black border-t-black border-l-0 border-r-0 py-1 w-3/4 mx-auto">
          Main topics
        </h3>
        <ul className="list-none block">
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
        </ul>
      </div>
    </>
  );
};
