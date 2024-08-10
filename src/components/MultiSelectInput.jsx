import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function MultiSelectInput({
  fieldName = "Tag",
  apiEndpoint = "/api/tag",
  onTagsChange,
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
          const response = await fetch(`${apiEndpoint}/?q=${query}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
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
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: inputValue }),
      });

      const newTag = await response.json();

      if (!newTag.ok) {
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
    <div className="relative w-full max-w-lg mx-auto mt-4">
      <div className="flex flex-wrap items-center border border-gray-300 rounded p-2">
        {selectedTags.map((tag) => (
          <div
            key={tag.tagId}
            className="flex items-center bg-blue-100 text-blue-700 rounded px-2 py-1 m-1"
          >
            {tag.content}
            <button
              type="button"
              onClick={() => handleTagRemove(tag.tagId)}
              className="ml-2 text-blue-700 hover:text-blue-900 focus:outline-none"
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
          className="flex-grow p-1 border-none outline-none"
        />
      </div>
      {showDropdown && tags.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto">
          {tags.map((tag) => (
            <div
              key={tag.tagId}
              onClick={() => handleTagSelect(tag)}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {tag.content}
            </div>
          ))}
        </div>
      )}
      {showDropdown && tags.length === 0 && query && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 p-2">
          <span>No {fieldName.toLowerCase()} found</span>
          <button
            type="button"
            onClick={() => handleCreateTag(query)}
            className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
          >
            Create {fieldName}
          </button>
        </div>
      )}
    </div>
  );
}
