import { Dictionary, Language } from "@interfaces/global.interface";
import { NavField } from "@interfaces/nav.interface";
import {
  FaEnvelope,
  FaGithub,
  FaHome,
  FaLinkedin,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const ICON_ANIMATION = "hover:animate-wiggle hover:animate-infinite";
export const ICON_CLASS_NAV = "text-2xl hover:opacity-70";
type NavMenuDict = Dictionary["navMenu"];
// left section of the navbar
export const mainNavSection = (
  navDict: NavMenuDict,
  lang: Language
): NavField[] => {
  const { home, contact } = navDict;
  return [
    {
      id: "home",
      type: "main",
      children: (
        <span className="my-auto p-0">
          <FaHome className={`${ICON_CLASS_NAV} ${ICON_ANIMATION}`} />
        </span>
      ),
      link: `/${lang}`,
      label: home?.toUpperCase(),
    },
    {
      id: "contact",
      type: "main",
      children: (
        <span className="my-auto p-0">
          <FaEnvelope className={`${ICON_CLASS_NAV} ${ICON_ANIMATION}`} />
        </span>
      ),
      link: `/${lang}/contact-me`,
      label: contact?.toUpperCase(),
    },
  ];
};

export const pageNavSection = (
  navDict: NavMenuDict,
  lang: Language
): NavField[] => [
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
    link: `/${lang}/bio`,
    label: navDict.bio?.toUpperCase(),
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

export const authNavSection = (
  user: unknown,
  navMenu: Dictionary["navMenu"]
): NavField[] => {
  const authIcon = user ? (
    <FaSignOutAlt
      className={`${ICON_CLASS_NAV} ${ICON_ANIMATION} rotate-180`}
    />
  ) : (
    <FaSignInAlt
      className={`${ICON_CLASS_NAV} ${ICON_ANIMATION} text-green-300`}
    />
  );
  const authTitle = user
    ? navMenu.logout.toUpperCase()
    : navMenu.login.toUpperCase();
  const authRedirection = user ? "api/auth/logout" : "api/auth/login";
  return [
    {
      id: "auth",
      label: authTitle,
      link: authRedirection,
      type: "main",
      children: authIcon,
    },
  ];
};
