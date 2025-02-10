import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  User,
  Tag,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectDetail() {
  // Normally, you'd fetch this data from an API or pass it as props
  const project = {
    title: "Developing a Cross-Platform Mobile App for Health Tracking",
    description:
      "We're seeking a skilled mobile app developer to create a comprehensive health tracking application that works seamlessly across iOS and Android platforms. The app will integrate with various wearable devices, provide insightful health analytics, and offer personalized wellness recommendations.",
    longDescription: `Our vision is to revolutionize personal health management through technology. The app will feature:

1. Real-time syncing with popular fitness wearables
2. Customizable dashboard for tracking key health metrics
3. AI-powered insights and recommendations
4. Social features for connecting with friends and joining health challenges
5. Integration with healthcare providers for holistic health management

The successful candidate will be responsible for the entire development lifecycle, from initial architecture to App Store submission. Strong experience with React Native or Flutter is preferred, along with a portfolio demonstrating previous health-tech projects.`,
    budget: 15000,
    deadline: "2023-12-31",
    postedDate: "2023-06-15",
    location: "Remote",
    clientName: "HealthTech Innovations",
    proposals: 8,
    skills: [
      "Mobile Development",
      "React Native",
      "Flutter",
      "iOS",
      "Android",
      "API Integration",
      "UI/UX Design",
    ],
    clientDescription:
      "HealthTech Innovations is a forward-thinking startup dedicated to leveraging technology for better health outcomes. With a team of health professionals and tech enthusiasts, we're on a mission to make personal health management more accessible and engaging for everyone.",
  };

  return (
    <div>
      <header className=" shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="sticky top-0 z-1 flex items-center justify-between border-b-2 border-brandPrimary pb-3  md:mt-2 bg-inherit">
            <Link
              to="/projectlist"
              className="flex items-center text-white hover:text-brandPrimary transition duration-300"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Projects
            </Link>
            <button className="font-semibold px-4 py-2 rounded-md bg-brandPrimary text-black hover:bg-black hover:text-brandPrimary hover:border hover:border-brandPrimary transition duration-300">
              Apply Now
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto sm:px-6 lg:px-8">
        <article className=" shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-brandPrimary mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center text-sm text-white mb-6">
              <div className="flex items-center mr-4 mb-2">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Posted on {project.postedDate}</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <User className="h-5 w-5 mr-2" />
                <span>{project.proposals} proposals</span>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <DollarSign className="h-5 w-5 mr-2" />
                <span>Budget: ${project.budget}</span>
              </div>
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 mr-2" />
                <span>Deadline: {project.deadline}</span>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-semibold text-brandPrimary mb-4">
                Project Overview
              </h2>
              <p className="text-white mb-4">{project.description}</p>
              <h2 className="text-2xl font-semibold text-brandPrimary mb-4">
                Detailed Requirements
              </h2>
              <div className="whitespace-pre-wrap text-white">
                {project.longDescription}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-brandPrimary mb-4">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    <Tag className="h-4 w-4 mr-1" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                About the Client
              </h2>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {project.clientName}
              </h3>
              <p className="text-gray-700">{project.clientDescription}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center">
              <button className="w-full sm:w-auto bg-brandPrimary text-black hover:bg-black hover:text-brandPrimary hover:border hover:border-brandPrimary font-bold py-3 px-6 rounded-lg mb-3 sm:mb-0 transition duration-300">
                Submit Proposal
              </button>
              <button className="w-full sm:w-auto border border-gray-300 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-100 hover:text-black transition duration-300">
                Save Project
              </button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
