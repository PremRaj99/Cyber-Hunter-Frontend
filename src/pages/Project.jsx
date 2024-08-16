import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export default function Project() {
  const skill = [
    "Frontend",
    "Backend",
    "DBMS",
    "Security",
    "DevOps",
    "Frontend",
    "Backend",
    "DBMS",
    "Security",
    "DevOps",
  ];

  return (
    <div className="text-gray-400 p-10 m-2 rounded-md">
      <div className="flex gap-8">
        <img
          src="https://plus.unsplash.com/premium_photo-1683288662019-c92caea8276d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-[50%] aspect-[16/9] object-cover rounded-md"
          alt="Thumbnail"
        />
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="text-3xl font-semibold text-[#00D8FF]">
            Project Name
          </h3>
          <p className="my-2">
            Points: <span className="text-green-500">69</span>
          </p>
          <div className="flex hover:text-white cursor-pointer items-center mt-4 mb-2 gap-2">
            <FaGithub className="text-white text-lg" />
            <p>GitHub</p>
          </div>
          <div className="flex hover:text-white cursor-pointer items-center mb-2 gap-2">
            <FaExternalLinkAlt className="text-red-600" />
            <p>Live</p>
          </div>
          <div className="bg-gray-900 w-full rounded-md flex p-4 gap-4">
            <img
              src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-20 h-20 object-cover rounded-full shadow-md shadow-gray-600 border border-gray-700"
              alt=""
            />
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl text-[#00D8FF] font-semibold">
                Prem Raj
              </h2>
              <p className="italic hover:underline hover:text-blue-500 cursor-pointer">
                PremRaj_2004
              </p>
              <p>B.Tech CSE 2022-26</p>
              <p>
                Q.Id- <span>22030404</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex justify-between gap-10 p-2 my-4">
        <dangerouslySetInnerHTML className="w-[100ch] text-gray-400">
          Introduction There may be an instance where you would want to display
          HTML inside a React Component. The HTML could be from an external
          source or a file that you want to display to the user. By default,
          React does not permit you to inject HTML in a component, for various
          reasons including cross-site scripting. However, for some cases like a
          CMS or WYSIWYG editor, you have to deal with raw HTML. In this guide,
          you will learn how you can embed raw HTML inside a component.
          dangerouslySetInnerHTML Prop If you try to render an HTML string
          inside a component directly, React will automatically sanitize it and
          render it as a plain string. const myHTML = `<h1>John Doe</h1>`;
          Please set an alt value for this image... To render the string as
          HTML, you need to use the dangerouslySetInnerHTML prop. const myHTML =
          `<h1>John Doe</h1>`; The dangerouslySetInnerHTML prop was built to
          present and inject DOM formatted content into the frontend. The use of
          this prop is considered a bad practice, especially when dealing with
          user inputs. You should consider any user input as unsafe and sanitize
          it before injecting it into the frontend. The dangerouslySetInnerHTML
          prop must be an object with a key __html and value of an HTML string.
          Misusing the dangerouslySetInnerHTML prop might open up your app to
          cross-site scripting attacks. Hence, before using this prop, you need
          to ensure that the HTML string is sanitized properly and coming from a
          reliable source. You should avoid passing any user-accepted input into
          the dangerouslySetInnerHTML prop. Cross-Site Scripting (XSS)
          Cross-Site Scripting (XSS) attacks allow a malicious user or hacker to
          inject unsafe HTML code into a website for other end users. This
          allows the hacker to access personal data like cookies, local storage,
          etc. Safer Alternative to dangerouslySetInnerHTML If XSS is a primary
          concern, you can use an external library like DOMPurify to sanitize
          the HTML string before injecting it into the DOM using the
          dangerouslySetInnerHTML prop. To install the DOMPurify library, run
          the following command. npm i dompurify You can see the example usage
          below. import DOMPurify from "dompurify"; const myHTML = `
          <h1>John Doe</h1>`; const mySafeHTML = DOMPurify.sanitize(myHTML);
          Conclusion Security is the primary concern when dealing with HTML
          content from the user. You cannot trust any input from users, even
          admin users who are maintaining or writing content for the app. Hence
          you should always sanitize the HTML content using DOMPurify or any
          other library before injecting it into the DOM. Keep in mind that
          sanitizing large HTML strings on the client side might degrade the app
          performance; fortunately, DOMPurify can also be used on a NodeJS
          server, and therefore you should consider sanitizing the content in
          the backend.
        </dangerouslySetInnerHTML>
        <div className="w-96 flex-wrap flex h-fit justify-center gap-4 items-start text-[#00D8FF]">
          {skill &&
            skill.map((skill, index) => (
              <div key={index} className="p-1 cursor-pointer ">
                #{skill}
              </div>
            ))}
        </div>
      </div>
      {/* scroll */}
      <div className="border border-[#00D8FF] w-full h-0"></div>
      <h2 className="text-xl text-[#00D8FF] font-semibold mt-8">Project ScreenShot</h2>
      
    </div>
  );
}
