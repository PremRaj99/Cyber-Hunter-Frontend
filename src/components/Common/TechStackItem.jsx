import StackIcon from "tech-stack-icons";

export default function TechStack({ techstack }) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center p-2">
      {
        techstack.map((tech, index) => (
          <div key={index} className="aspect-square bg-gray-800/60 rounded-xl border border-gray-700/50 backdrop-blur-sm flex flex-row items-center justify-center p-2"
            style={{
              width: 'clamp(60px, 10vw, 80px)',
              height: 'clamp(60px, 10vw, 80px)'
            }}>
            <StackIcon
              name={tech.toLowerCase()}
            />
          </div>
        ))
      }
    </div>
  );
}