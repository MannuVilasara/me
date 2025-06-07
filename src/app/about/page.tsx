import React from 'react';

export default function page() {
  return (
    <div className="flex flex-col">
      <main className="flex-grow px-4 max-w-3xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          I am a Full Stack Developer with a passion for building scalable and efficient web
          applications. My expertise lies in both frontend and backend development, allowing me to
          create seamless user experiences and robust systems.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          I enjoy working with the latest technologies and am always eager to learn new skills. I
          believe in the power of collaboration and strive to contribute positively to any team I am
          part of.
        </p>
      </main>
      <section className="mt-16 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>JavaScript, TypeScript</li>
          <li>React, Next.js</li>
          <li>Node.js, Express</li>
          <li>MongoDB, PostgreSQL</li>
          <li>HTML, CSS, Tailwind CSS</li>
          <li>Git, GitHub</li>
          <li>Docker, CI/CD</li>
          <li>RESTful APIs, GraphQL</li>
          <li>Cloud Services (AWS, Azure), Linux</li>
          <li>WebSockets, Kafka + zookeeper</li>
        </ul>
      </section>
      <section className="mt-8 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">Interests</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          In my free time, I enjoy exploring new technologies, contributing to open-source projects,
          and staying updated with the latest trends in web development. I also love to share my
          knowledge through blogging and mentoring aspiring developers.
        </p>
      </section>
    </div>
  );
}
