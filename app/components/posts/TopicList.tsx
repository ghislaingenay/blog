"use client";

import { DivProps, PostTopic } from "@interfaces/global.interface";
import $ from "jquery";
import { useCallback, useEffect, useState } from "react";
import { FaChartBar, FaCode, FaTags, FaUser } from "react-icons/fa";
import { Tag } from "../Tag";

type TopicListProps = {
  topics: PostTopicSearch[];
};

interface TopicDivProps extends DivProps {
  children?: React.ReactNode;
  className: string;
  topic: string;
}

interface LiComponentProps {
  name: PostTopic;
  count: number;
}

export const TopicList = ({ topics }: TopicListProps) => {
  const addSpaceToTopicName = (name: string) => name.replaceAll("_", " ");
  const addNameStrToTopicName = (topicName: string) => `name-${topicName}`;
  const removeNameStrToTopicName = (topicName: string) =>
    topicName?.replace("name-", "") || topicName;

  const topicList = topics.map((topic) => {
    return { ...topic, id: addNameStrToTopicName(topic.name) };
  });

  const ACTIVE_LI_CLASS = "bg-slate-300 rounded-lg bg-opacity-0.5";

  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(
    undefined
  );
  const [generatedId, setGeneratedId] = useState<string | undefined>(undefined);

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

  const topicKeys = Object.keys(PostTopic);

  useEffect(() => {
    const listId = generatedId?.split("+")[1];
    const topicKey = removeNameStrToTopicName(listId as string);
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

  const setActivatedStyleLg = useCallback(
    (name: string) => {
      const LI_CLASS_LG = "mb-1 py-2 px-4";
      if (name === selectedTopic) return `${LI_CLASS_LG} ${ACTIVE_LI_CLASS}`;
      else return `${LI_CLASS_LG}`;
    },
    [selectedTopic]
  );

  const setActivatedStyleSmall = useCallback(
    (name: string) => {
      const LI_CLASS_SMALL =
        "border shadow-xl border-gray-400 rounded-lg p-2 col-span-1";
      if (name === selectedTopic) return `${LI_CLASS_SMALL} ${ACTIVE_LI_CLASS}`;
      else return `${LI_CLASS_SMALL}`;
    },
    [selectedTopic]
  );

  const LargeLi = ({ name, count }: LiComponentProps) => (
    <div className="hidden lg:grid grid-cols-6 place-self-center items-center">
      <span className="col-span-5 text-sm font-bold m-0">
        {addSpaceToTopicName(name)}{" "}
      </span>
      <small className="col-span-1">
        <Tag color="gray">{count}</Tag>
      </small>
    </div>
  );

  const SmallLi = ({ name, count }: LiComponentProps) => {
    const ICON_CLASS =
      "text-4xl border-black border-2 rounded-full p-1 text-black mx-auto";
    const topicIconsSm: Record<PostTopic, any> = {
      [PostTopic.DATA_SCIENCE]: <FaChartBar className={ICON_CLASS} />,
      [PostTopic.WEB_DEVELOPMENT]: <FaCode className={ICON_CLASS} />,
      [PostTopic.PERSONAL]: <FaUser className={ICON_CLASS} />,
      [PostTopic.OTHERS]: <FaTags className={ICON_CLASS} />,
    };

    const topicNameSm: Record<PostTopic, string> = {
      [PostTopic.DATA_SCIENCE]: "DATA",
      [PostTopic.WEB_DEVELOPMENT]: "WEB",
      [PostTopic.PERSONAL]: "ABOUT ME",
      [PostTopic.OTHERS]: "OTHERS",
    };
    return (
      <div className="lg:hidden grid grid-cols-1 justify-self-center gap-1 relative">
        <span className="absolute rounded-full left-[55%] top-[30%] text-[10px] bg-black py-[0.125rem] px-[0.35rem] font-bold text-white">
          {count}
        </span>
        <span className="col-span-1">{topicIconsSm[name]}</span>
        <span className="text-center font-bold text-bases col-span-1">
          {topicNameSm[name]}
        </span>
      </div>
    );
  };

  return (
    <>
      {/* ----* Small screen *---- */}
      <div className="inline lg:hidden">
        <div className="list-none grid grid-cols-4 gap-x-2" role="list">
          {topicList.map(({ name, count, id }) => (
            <li className={setActivatedStyleSmall(id)} key={name} id={id}>
              <SmallLi {...{ name, count }} />
            </li>
          ))}
        </div>
      </div>

      {/* --- Large screen --- */}
      <div className="hidden lg:block w-10/12 mx-auto">
        <h3 className="text-center border border-b-gray border-t-gray border-l-0 border-r-0 py-1 mx-auto">
          MAIN TOPICS
        </h3>
        <div className="list-none" role="list">
          {topicList.map(({ name, count, id }) => {
            return (
              <>
                <li className={setActivatedStyleLg(id)} key={name} id={id}>
                  <LargeLi {...{ name, count }} />
                </li>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
