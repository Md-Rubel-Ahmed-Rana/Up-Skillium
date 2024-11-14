import { useGetAllLessonsQuery } from "@/features/lesson";
import { ILesson } from "@/types/lesson.type";
import { Button, Input, Dropdown, MenuProps } from "antd/lib";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { IoSearch } from "react-icons/io5";

const stripHtmlTags = (html: string) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const LessonSearchContainer = () => {
  const { data } = useGetAllLessonsQuery({});
  const router = useRouter();
  const lessons = data?.data as ILesson[];
  const [searchText, setSearchText] = useState("");
  const [filteredLessons, setFilteredLessons] = useState(lessons);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSearchValue = useCallback(
    (text: string) => {
      setSearchText(text);
      if (text) {
        setFilteredLessons(
          lessons?.filter((lesson) => {
            const sanitizedContent = stripHtmlTags(lesson?.content || "");
            return (
              lesson?.title.toLowerCase().includes(text.toLowerCase()) ||
              lesson?.type.toLowerCase().includes(text.toLowerCase()) ||
              sanitizedContent.toLowerCase().includes(text.toLowerCase())
            );
          })
        );
      } else {
        setFilteredLessons(lessons);
      }
    },
    [lessons]
  );

  const handleSelectLesson = (lesson: ILesson) => {
    const path = `/dashboard/lesson/update/${lesson?.id}?id=${lesson?.id}&&lessonType=${lesson?.type}&lessonTitle=${lesson?.title}`;
    router.push(path);
    setDropdownVisible(false);
  };

  const items: MenuProps["items"] =
    filteredLessons?.length > 0
      ? filteredLessons.map((lesson) => ({
          key: lesson?.id,
          label: (
            <Button
              onMouseDown={() => handleSelectLesson(lesson)}
              className="w-full flex justify-start items-start"
              type="default"
              size="small"
            >
              {lesson?.title}
            </Button>
          ),
        }))
      : [
          {
            key: "no-results",
            label: (
              <div className="px-4 py-2 text-gray-500">No lessons found</div>
            ),
            disabled: true,
          },
        ];

  return (
    <div className="w-full flex justify-center">
      <Dropdown
        open={isDropdownVisible}
        onOpenChange={setDropdownVisible}
        menu={{ items }}
        overlayClassName="w-full max-w-md mb-3"
        placement="topRight"
      >
        <Input
          type="search"
          placeholder="Search lesson..."
          prefix={<IoSearch className="text-gray-400" />}
          className="w-full p-3"
          allowClear
          size="large"
          value={searchText}
          onClick={() => setDropdownVisible(true)}
          onBlur={() => setDropdownVisible(false)}
          onChange={(e) => handleSearchValue(e.target.value)}
        />
      </Dropdown>
    </div>
  );
};

export default LessonSearchContainer;
