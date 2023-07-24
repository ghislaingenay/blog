"use client";

import { DivProps, PostTopic } from "@interfaces/global.interface";
import $ from "jquery";
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

  const changeTopic = (name: string) => {
    console.log($(`#name-${name}`));
    const activeClass = "bg-slate-300 rounded-lg bg-opacity-0.5 selected";
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

  const createDivTopicPropsLgScreen = (topic: string): TopicDivProps => {
    const DIV_CLASS_LG =
      "grid px-5 grid-cols-6 place-self-center justify-between items-center";
    return { className: DIV_CLASS_LG, topic };
  };

  const topicIcons: Record<PostTopic, any> | any = {
    [PostTopic.DATABASES]: "FaDatabase",
    [PostTopic.DATA_SCIENCE]: "FaDatabase",
    [PostTopic.AI]: "FaDatabase",
    [PostTopic.WEB_DEVELOPMENT]: <BiCode />,
    [PostTopic.PERSONAL]: "FaDatabase",
    [PostTopic.OTHERS]: "FaDatabase",
    [PostTopic.DEVOPS]: "FaDatabase",
  };

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
        {topicList.map(({ name, count }) => (
          <DivTopic
            {...createDivTopicPropsLgScreen(name)}
            key={name}
            id={`name-${name}`}
          >
            <p className="col-span-5 text-sm font-bold">{name} </p>
            <span className="col-span-1">
              <Tag color="gray">{count}</Tag>
            </span>
          </DivTopic>
        ))}
      </div>
    </>
  );
};
