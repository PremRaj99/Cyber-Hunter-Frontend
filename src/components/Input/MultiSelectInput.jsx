import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/Axios";

export default function MultiSelectInput({
  fieldName = "Tag",
  apiEndpoint = "/api/tag",
  onTagsChange,
  className = ""
}) {
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchTags = async () => {
      if (query) {
        try {
          const {data} = await axios.get(`${apiEndpoint}/?q=${query}`);
          setTags(data);
          setShowDropdown(true);
        } catch (error) {
          toast.error(error.message);
          console.error("Error fetching tags", error);
        }
      } else {
        setTags([]);
        setShowDropdown(false);
      }
    };
    const debounceTimer = setTimeout(() => {
      fetchTags();
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [query, apiEndpoint]);

  const handleCreateTag = async (inputValue) => {
    try {

      const { data: newTag } = await axios.post(apiEndpoint, { content: inputValue });


      if (!newTag) {
        return toast.error(newTag.message);
      }
      const updatedSelectedTags = [
        ...selectedTags,
        { tagId: newTag.tagId, content: newTag.content },
      ];
      setSelectedTags(updatedSelectedTags);
      onTagsChange(updatedSelectedTags);
      setQuery("");
    } catch (error) {
      toast.error(error.message);
      console.error("Error creating tag", error);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleTagSelect = (tag) => {
    if (!selectedTags.some((selectedTag) => selectedTag.tagId === tag.tagId)) {
      const updatedSelectedTags = [...selectedTags, tag];
      setSelectedTags(updatedSelectedTags);
      onTagsChange(updatedSelectedTags);
    }
    setQuery("");
    setShowDropdown(false);
  };

  const handleTagRemove = (tagId) => {
    const updatedSelectedTags = selectedTags.filter(
      (tag) => tag.tagId !== tagId
    );
    setSelectedTags(updatedSelectedTags);
    onTagsChange(updatedSelectedTags);
  };

  const handleKeyDown = (e) => {
    // Select top suggestion when Enter is pressed
    if (e.key === "Enter" && showDropdown && tags.length > 0) {
      e.preventDefault();
      handleTagSelect(tags[0]); // Select the first suggestion
    }
    // Create new tag when ',' is pressed
    else if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (query.trim()) {
        handleCreateTag(query.trim());
      }
    }
  };

  return (
    <div className="relative w-full">
      <div className={`${className} flex flex-wrap items-center rounded-md border border-cyan-400/50 bg-black/50 px-4 py-2 text-white shadow-sm focus:border-none transition duration-300 hover:border-cyan-300`}>
        {selectedTags.map((tag) => (
          <div
            key={tag.tagId}
            className="flex items-center bg-cyan-400/20 text-cyan-300 rounded px-2 py-1 m-1"
          >
            {tag.content}
            <button
              type="button"
              onClick={() => handleTagRemove(tag.tagId)}
              className="ml-2 text-cyan-300 hover:text-cyan-100 focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={`Search and select ${fieldName}`}
          className="flex-grow bg-transparent p-1 text-white placeholder-cyan-400/50 border-none outline-none focus:outline-none focus:ring-0"
        />
      </div>
      {showDropdown && tags.length > 0 && (
        <div className="absolute z-10 w-full bg-black/80 border border-cyan-400/50 rounded mt-1 max-h-40 overflow-y-auto">
          {tags.map((tag) => (
            <div
              key={tag.tagId}
              onClick={() => handleTagSelect(tag)}
              className="cursor-pointer p-2 text-white hover:bg-cyan-400/10 transition"
            >
              {tag.content}
            </div>
          ))}
        </div>
      )}
      {showDropdown && tags.length === 0 && query && (
        <div className="absolute z-10 w-full bg-black/80 border border-cyan-400/50 rounded mt-1 p-2 text-white">
          <span>No {fieldName.toLowerCase()} found</span>
          <button
            type="button"
            onClick={() => handleCreateTag(query)}
            className="ml-2 bg-cyan-400 text-black px-2 py-1 rounded hover:bg-cyan-300 transition"
          >
            Create {fieldName}
          </button>
        </div>
      )}
    </div>
  );
}
