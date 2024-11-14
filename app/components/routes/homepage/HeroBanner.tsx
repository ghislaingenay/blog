import { Tag } from "@components/Tag";
import MyPicture from "@public/ghislain.jpg";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="flex gap-4">
      <span className="hidden md:block">
        <Image
          src={MyPicture}
          width={200}
          height={200}
          className="rounded-full w-[300px]"
          alt={`Ghislain Genay's profile picture`}
        />
      </span>
      <div className="flex-grow">
        <h1>Ghislain Genay</h1>
        <h2>Software Engineer</h2>
        <p>
          Full Stack Engineer specializing in scalable web applications, ready
          to transform your ideas into innovative solutions.
        </p>

        <div className="flex gap-2 flex-wrap">
          <Tag className="h-[40px]" color="blue">
            React
          </Tag>
          <Tag className="h-[40px]" color="blue">
            React
          </Tag>
          <Tag className="h-[40px]" color="blue">
            React
          </Tag>
          <Tag className="h-[40px]" color="blue">
            React
          </Tag>
          <Tag className="h-[40px]" color="blue">
            React
          </Tag>
          <Tag className="h-[40px]" color="blue">
            React
          </Tag>
          <Tag className="h-[40px]" color="blue">
            React
          </Tag>
          <Tag className="h-[40px]" color="blue">
            React
          </Tag>

          <Tag className="h-[40px]" color="blue">
            React
          </Tag>
          <Tag className="h-[40px]" color="blue">
            React
          </Tag>
          <Tag className="h-[40px]" color="blue">
            React
          </Tag>
          <Tag className="h-[40px]" color="blue">
            React
          </Tag>
        </div>
      </div>
    </section>
  );
}
