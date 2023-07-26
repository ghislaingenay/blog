import { NavField } from "@interfaces/nav.interface";
import { FaEnvelope, FaGithub, FaHome, FaLinkedin } from "react-icons/fa";

const ICON_ANIMATION = "hover:animate-wiggle hover:animate-infinite";
export const ICON_CLASS_NAV = "text-2xl hover:opacity-70";
// left section of the navbar
export const mainNavSection: NavField[] = [
  {
    id: "home",
    type: "main",
    children: (
      <span className="my-auto p-0">
        <FaHome className={`${ICON_CLASS_NAV} ${ICON_ANIMATION}`} />
      </span>
    ),
    link: "/",
    label: "HOME",
  },
  {
    id: "contact",
    type: "main",
    children: (
      <span className="my-auto p-0">
        <FaEnvelope className={`${ICON_CLASS_NAV} ${ICON_ANIMATION}`} />
      </span>
    ),
    link: "/contact-me",
    label: "CONTACT",
  },
];

export const pageNavSection: NavField[] = [
  {
    id: "bio",
    type: "page",
    children: (
      <p
        className={`${ICON_ANIMATION} font-bold hover:opacity-70 text-md m-0 p-0`}
      >
        BIO
      </p>
    ),
    link: "/bio",
    label: "BIO",
  },
];

// right section of the navbar
export const socialMediaNavSection: NavField[] = [
  {
    id: "github",
    type: "social",
    children: (
      <FaGithub
        className={`${ICON_CLASS_NAV} text-gray-700`}
        onClick={() =>
          window.open("https://github.com/ghislaingenay", "_blank")
        }
      />
    ),
    link: "https://github.com/ghislaingenay",
    label: "GITHUB",
  },
  {
    id: "linkedin",
    type: "social",
    children: (
      <FaLinkedin
        className={`${ICON_CLASS_NAV} text-blue-600`}
        onClick={() =>
          window.open(
            "https://www.linkedin.com/in/ghislain-genay-b698831b3/",
            "_blank"
          )
        }
      />
    ),
    link: "https://www.linkedin.com/in/ghislain-genay-b698831b3/",
    label: "LINKEDIN",
  },
];
